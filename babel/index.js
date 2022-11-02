// @ts-check
const PACKAGE_NAME = "css-variable";
const hash = require("./hash");
const pathRelative = require("path").relative;

/** @typedef {import("@babel/core")} babel */

/** 
 * The context of a babel plugin run
 * @typedef {{
 *  minifyVariables: boolean,
 *  varCount: number,
 *  varPrefix: string,
 *  isImportedInCurrentFile: boolean,
 *  localVarNames: string[],
 *  opts: babel.PluginOptions & { displayName?: boolean }
 * } & babel.PluginPass} PluginPass 
 */

/**
 * @param {babel} babel
 * @returns {babel.PluginObj<PluginPass>}
 */
module.exports = function (babel) {
  const {
    types: { stringLiteral },
  } = babel;

  /**
   * @param {babel.NodePath<babel.types.NewExpression> | babel.NodePath<babel.types.CallExpression>} path;
   * @param {PluginPass} pluginPass
   */
  const injectVariableName = (path, pluginPass) => {
    // Skip if no import statements where found
    if (!pluginPass.localVarNames.length) {
      return;
    }
    const callee = path.node.callee;
    if (!("name" in callee) || !pluginPass.localVarNames.includes(callee.name)) {
      return;
    }
    const readableName = !pluginPass.minifyVariables && dashed(getNameByUsage(path));
    const readablePrefix = readableName ? `${readableName}--` : "";
    //
    // Inject the variable prefix
    //
    // E.g. CSSVariable() -> CSSVariable("1isaui4-0")
    // E.g. CSSVariable({value: "10px"}) -> CSSVariable("1isaui4-0", {value: "10px"})
    //
    const constructorArguments = path.node.arguments;
    const firstArg = constructorArguments[0];
    if (!firstArg || firstArg.type !== "StringLiteral") {
      constructorArguments.unshift(
        stringLiteral(readablePrefix + getUniqueHash(pluginPass) + pluginPass.varCount++)
      );
    }
    //
    // Inject @__PURE__ comment to tell terser that
    // creating s CSSVariable class instance will cause no
    // side effects and is save to be removed
    //
    path.addComment("leading", "@__PURE__");
  }

  return {
    name: `${PACKAGE_NAME} unique variable name injector`,
    pre() {
      this.isImportedInCurrentFile = false;
      this.varCount = 0;
      this.minifyVariables = this.opts.displayName !== undefined ?
        !this.opts.displayName
        : this.file.opts.envName !== "development";
      this.localVarNames = [];
    },
    visitor: {
      ImportDeclaration({ node }) {
        // Search for `import {CSSVariable} from "css-variable";`
        // Search for `import {CSSVariable as CustomName} from "css-variable";`
        const isLib = node.source.value === PACKAGE_NAME;
        if (!isLib) {
          return;
        }
        node.specifiers.forEach((specifier) => {
          const importSpecifier = "imported" in specifier && specifier.imported;
          if (!importSpecifier || !("name" in importSpecifier)) {
            return;
          }
          const localSpecifier =
            ("local" in specifier && specifier.local) || importSpecifier;
          if (
            importSpecifier.name === "CSSVariable" ||
            importSpecifier.name === "createVar"
          ) {
            this.localVarNames.push(localSpecifier.name);
          }
        });
        this.isImportedInCurrentFile = this.localVarNames.length > 0;
      },
      CallExpression(path) {
        return injectVariableName(path, this);
      },
      NewExpression(path) {
        return injectVariableName(path, this);
      },
    },
  };
};


/**
 * Tries to extract the name for readable names in developments
 * e.g.:
 *
 * `const fontSize = createVar()` -> fontSize
 * `const theme = { primary: createVar() }` -> primary
 *
 * @param {babel.NodePath} path
 */
function getNameByUsage(path) {
  const parent = path.parent;
  if (!parent) return;
  if (parent.type === "ObjectProperty") {
    const key = parent.key;
    if (key && key.type === "Identifier" && key.name) {
      return key.name;
    }
  }
  if (parent.type === "VariableDeclarator") {
    const id = parent.id;
    if (id && id.type === "Identifier" && id.name) {
      return id.name;
    }
  }
  return "";
}

/** @param {string} val*/
function dashed(val) {
  /** handle camelCase and CONSTANT_CASE */
  return val
  .replace(/([0-9a-z])([A-Z])/g, "$1-$2")
  .toLowerCase()
  .replace(/_/g, "-");
}

/** @type {WeakMap<babel.PluginPass, string>} */
const prefixCache = new WeakMap();
/**
 * Returns a unique name based on the processed filename
 *
 * @param {babel.PluginPass} pass
 */
function getUniqueHash(pass) {
  const fromCache = prefixCache.get(pass);
  if (fromCache) {
    return fromCache;
  }
  // Variables should keep the same generated name for
  // multiple builds.
  //
  // This is possible by hashing the source filename
  // which includes the CSSVariable.
  //
  // As an absolute file might be different from system to system
  // the relative filename is used instead
  const relativeFileName = pass.file.opts.filename
    ? pathRelative(__dirname, pass.file.opts.filename).replace(/\\/g, "/")
    : "jantimon";
  const prefix = hash(relativeFileName);
  prefixCache.set(pass, prefix);
  return prefix;
}
