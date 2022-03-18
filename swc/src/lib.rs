use serde::{Deserialize, Serialize};
use std::{collections::HashSet, fmt::Write};
use swc_plugin::{ast::*, plugin_transform, syntax_pos::DUMMY_SP};

mod hash;

use hash::hash;

/// Static plugin configuration.
#[derive(Default, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
#[serde(deny_unknown_fields)]
pub struct Config {
    /// Prefix variables with a readable name, e.g. `primary--1isauia0`.
    #[serde(default = "bool::default")]
    pub display_name: bool,
}

/// Additional context for the plugin.
#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Context {
    /// The name of the current file.
    #[serde(default)]
    pub filename: Option<String>,
}

struct TransformVisitor {
    config: Config,
    filename_hash: String,
    local_idents: HashSet<String>,
    variable_count: u32,
    current_var_declarator: Option<String>,
    current_object_prop_declarators: Vec<String>,
}

impl TransformVisitor {
    pub fn new(config: Config, filename_hash: String) -> Self {
        Self {
            config,
            filename_hash,
            local_idents: HashSet::new(),
            variable_count: 0,
            current_var_declarator: None,
            current_object_prop_declarators: vec![],
        }
    }
}

impl VisitMut for TransformVisitor {
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

        for specifier in &import_decl.specifiers {
            if let ImportSpecifier::Named(local) = specifier {
                let imported_ident = match &local.imported {
                    Some(ModuleExportName::Ident(module_export)) => &module_export.sym,
                    // import {createVar} from "css-variable";
                    _ => &local.local.sym,
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
        if let PropName::Ident(id) = &key_value.key {
            self.current_object_prop_declarators
                .push(id.sym.to_string());
        }

        key_value.visit_mut_children_with(self);

        self.current_object_prop_declarators.pop();
    }

    fn visit_mut_call_expr(&mut self, call_expr: &mut CallExpr) {
        // Skip entire execution if no import call was found, see visit_mut_import_decl
        if self.local_idents.is_empty() {
            return;
        }

        call_expr.visit_mut_children_with(self);

        if let Callee::Expr(expr) = &call_expr.callee {
            if let Expr::Ident(id) = &**expr {
                if self.local_idents.contains(&*id.sym) {
                    let mut variable_name = String::new();

                    if self.config.display_name {
                        if let Some(var_declarator) = &self.current_var_declarator {
                            write!(&mut variable_name, "{var_declarator}--").unwrap();
                        }

                        for object_prop_declarator in &self.current_object_prop_declarators {
                            write!(&mut variable_name, "{object_prop_declarator}--").unwrap();
                        }
                    }

                    write!(
                        &mut variable_name,
                        "{}{}",
                        self.filename_hash, self.variable_count
                    )
                    .unwrap();
                    self.variable_count += 1;

                    call_expr.args.insert(
                        0,
                        ExprOrSpread {
                            spread: None,
                            expr: Box::new(Expr::Lit(Lit::Str(Str {
                                span: DUMMY_SP,
                                has_escape: false,
                                kind: StrKind::Synthesized,
                                value: variable_name.into(),
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
/// - `config` - [`Config`] as JSON.
/// - `context` - [`Context`] as JSON.
#[plugin_transform]
pub fn process_transform(program: Program, config: String, context: String) -> Program {
    let config: Config = serde_json::from_str(&config).expect("failed to parse plugin config");

    let context: Context = serde_json::from_str(&context).expect("failed to parse plugin context");
    let hashed_filename = hash(context.filename.unwrap_or_else(|| "jantimon".to_owned()), 5);

    program.fold_with(&mut as_folder(TransformVisitor::new(
        config,
        hashed_filename,
    )))
}

#[cfg(test)]
mod tests {
    use swc_ecma_transforms_testing::test;

    use super::*;

    fn transform_visitor(config: Config) -> impl 'static + Fold + VisitMut {
        as_folder(TransformVisitor::new(config, String::from("hashed")))
    }

    test!(
        swc_ecma_parser::Syntax::default(),
        |_| transform_visitor(Default::default()),
        adds_variable_name,
        r#"import {createVar} from "css-variable";
        createVar();"#,
        r#"import {createVar} from "css-variable";
        createVar("hashed0");"#
    );

    test!(
        swc_ecma_parser::Syntax::default(),
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
        swc_ecma_parser::Syntax::default(),
        |_| transform_visitor(Default::default()),
        ignores_unknwon_modules,
        r#"import {createVar} from "unknown";
        createVar();"#,
        r#"import {createVar} from "unknown";
        createVar();"#
    );

    test!(
        swc_ecma_parser::Syntax::default(),
        |_| transform_visitor(Default::default()),
        adds_variable_name_with_value,
        r#"import {createVar} from "css-variable";
        createVar({ value: '0px' });"#,
        r#"import {createVar} from "css-variable";
        createVar("hashed0", { value: '0px' });"#
    );

    test!(
        swc_ecma_parser::Syntax::default(),
        |_| transform_visitor(Default::default()),
        adds_variable_name_for_renamed,
        r#"import {createVar as create} from "css-variable";
        create("hello world");"#,
        r#"import {createVar as create} from "css-variable";
        create("hashed0", "hello world");"#
    );

    test!(
        swc_ecma_parser::Syntax::default(),
        |_| transform_visitor(Config { display_name: true }),
        adds_variable_name_with_display_name,
        r#"import {createVar} from "css-variable";
        const primary = createVar();
        const theme = {
            colors: {
                primary: createVar(),
                secondary: {
                    inner: createVar()
                }
            }
        };"#,
        r#"import {createVar} from "css-variable";
        const primary = createVar("primary--hashed0");
        const theme = {
            colors: {
                primary: createVar("theme--colors--primary--hashed1"),
                secondary: {
                    inner: createVar("theme--colors--secondary--inner--hashed2")
                }
            }
        };"#
    );
}
