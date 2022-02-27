use anyhow::Context as _;
use serde::{Deserialize, Serialize};
use std::collections::HashSet;
use swc_plugin::{ast::*, plugin_transform, syntax_pos::DUMMY_SP};

mod hash;

use hash::hash;

/// Static plugin configuration.
#[derive(Default, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
#[serde(deny_unknown_fields)]
pub struct PluginConfig {
    /// Prefix variables with a readable name, e.g. `primary--1isauia0`.
    #[serde(default = "bool::default")]
    pub display_name: bool,
}

/// Additional context for the plugin.
#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
#[serde(deny_unknown_fields)]
pub struct Context {
    /// The name of the current file.
    #[serde(default)]
    pub filename: Option<String>,
}

struct TransformVisitor {
    plugin_config: PluginConfig,
    hash: String,
    local_idents: HashSet<String>,
    variable_count: u32,
    current_var_declarator: Option<String>,
    current_object_prop_declarator: Option<String>,
}

impl TransformVisitor {
    pub fn new(plugin_config: PluginConfig, hash: String) -> Self {
        Self {
            plugin_config,
            hash,
            local_idents: HashSet::new(),
            variable_count: 0,
            current_var_declarator: None,
            current_object_prop_declarator: None,
        }
    }
}

impl VisitMut for TransformVisitor {
    noop_visit_mut_type!();

    /// Searches all local names for `createVar`.
    ///
    /// For example:
    /// ```javascript
    ///  import { createVar } from "css-variable";
    ///  import { createVar as x} from "css-variable";
    ///  import { foo as x, createVar as y } from "css-variable";
    /// ```
    fn visit_mut_import_decl(&mut self, import_decl: &mut ImportDecl) {
        if &import_decl.src.value != "css-variable" {
            return;
        }
        let specifiers = &import_decl.specifiers;
        for specifier in specifiers {
            if let ImportSpecifier::Named(local) = &specifier {
                let imported_ident = match &local.imported {
                    // import {createVar} from "css-variable";
                    None => &local.local.sym,
                    Some(ref module_exports) => {
                        // import {createVar as x} from "css-variable";
                        if let ModuleExportName::Ident(module_export) = module_exports {
                            &module_export.sym
                        } else {
                            &local.local.sym
                        }
                    }
                };
                if imported_ident == "createVar" {
                    self.local_idents.insert(String::from(&*local.local.sym));
                }
            }
        }
    }

    fn visit_mut_var_declarator(&mut self, var_declarator: &mut VarDeclarator) {
        self.current_var_declarator =
            if let Pat::Ident(BindingIdent { id, .. }) = &var_declarator.name {
                Some(id.sym.to_string())
            } else {
                None
            };
        var_declarator.visit_mut_children_with(self);
        self.current_var_declarator = None;
    }

    fn visit_mut_key_value_prop(&mut self, key_value: &mut KeyValueProp) {
        self.current_object_prop_declarator = if let PropName::Ident(id) = &key_value.key {
            Some(id.sym.to_string())
        } else {
            None
        };
        key_value.visit_mut_children_with(self);
        self.current_object_prop_declarator = None;
    }

    fn visit_mut_call_expr(&mut self, call_expr: &mut CallExpr) {
        // Skip entire execution if no import call was found
        // @see visit_mut_import_decl
        if self.local_idents.is_empty() {
            return;
        }
        call_expr.visit_mut_children_with(self);
        if let Callee::Expr(expr) = &call_expr.callee {
            if let Expr::Ident(e) = &**expr {
                if self.local_idents.contains(&String::from(&*e.sym)) {
                    let variable_hash_name = {
                        let variable_count = self.variable_count;
                        let mut variable_hash_name = self.hash.to_owned();
                        variable_hash_name.push_str(&variable_count.to_owned().to_string());
                        self.variable_count = variable_count + 1;
                        variable_hash_name
                    };

                    let mut variable_name = variable_hash_name;

                    if self.plugin_config.display_name {
                        if self.current_var_declarator.is_some() {
                            variable_name.insert_str(
                                0,
                                &format!("{}--", self.current_var_declarator.clone().unwrap()),
                            );
                        }
                        if self.current_object_prop_declarator.is_some() {
                            variable_name.insert_str(
                                0,
                                &format!(
                                    "{}--",
                                    self.current_object_prop_declarator.clone().unwrap()
                                ),
                            );
                        }
                    }

                    call_expr.args.insert(
                        0,
                        ExprOrSpread {
                            spread: None,
                            expr: Box::new(Expr::Lit(Lit::Str(Str {
                                span: DUMMY_SP,
                                has_escape: false,
                                kind: StrKind::Synthesized,
                                value: JsWord::from(variable_name),
                            }))),
                        },
                    );
                }
            }
        }
    }
}

/// Transforms a [`Program`].
///
/// # Arguments
///
/// - `program` - The SWC [`Program`] to transform.
/// - `plugin_config` - [`PluginConfig`] as JSON.
/// - `context` - [`Context`] as JSON.
#[plugin_transform]
pub fn process_transform(program: Program, plugin_config: String, context: String) -> Program {
    let config: PluginConfig = serde_json::from_str(&plugin_config)
        .context("failed to parse plugin config")
        .unwrap();

    let context: Context = serde_json::from_str(&context)
        .context("failed to parse plugin context")
        .unwrap();

    let hashed_filename = hash(context.filename.unwrap_or_else(|| "jantimon".to_owned()), 5);

    program.fold_with(&mut as_folder(TransformVisitor::new(
        config,
        hashed_filename,
    )))
}

#[cfg(test)]
mod transform_visitor_tests {
    use swc_ecma_transforms_testing::test;

    use super::*;

    fn transform_visitor(config: PluginConfig) -> impl 'static + Fold + VisitMut {
        as_folder(TransformVisitor::new(config, String::from("hashed")))
    }

    test!(
        ::swc_ecma_parser::Syntax::default(),
        |_| transform_visitor(Default::default()),
        adds_variable_name,
        r#"import {createVar} from "css-variable";
        createVar();"#,
        r#"import {createVar} from "css-variable";
        createVar("hashed0");"#
    );

    test!(
        ::swc_ecma_parser::Syntax::default(),
        |_| transform_visitor(Default::default()),
        adds_multiple_variable_names,
        r#"import {createVar} from "css-variable";
        createVar();
        createVar();
        createVar();"#,
        r#"import {createVar} from "css-variable";
        createVar("hashed0");
        createVar("hashed1");
        createVar("hashed2");"#
    );

    test!(
        ::swc_ecma_parser::Syntax::default(),
        |_| transform_visitor(Default::default()),
        ignores_unknwon_modules,
        r#"import {createVar} from "unknown";
        createVar();"#,
        r#"import {createVar} from "unknown";
        createVar();"#
    );

    test!(
        ::swc_ecma_parser::Syntax::default(),
        |_| transform_visitor(Default::default()),
        adds_variable_name_with_value,
        r#"import {createVar} from "css-variable";
        createVar({ value: '0px' });"#,
        r#"import {createVar} from "css-variable";
        createVar("hashed0", { value: '0px' });"#
    );

    test!(
        ::swc_ecma_parser::Syntax::default(),
        |_| transform_visitor(Default::default()),
        adds_variable_name_for_renamed,
        r#"import {createVar as create} from "css-variable";
        create("hello world");"#,
        r#"import {createVar as create} from "css-variable";
        create("hashed0", "hello world");"#
    );
}
