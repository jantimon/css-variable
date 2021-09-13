// @ts-check
const PACKAGE_NAME = "css-variable";
const VARIABLE_NAME = "CSSVariable";
const hash = require("./hash");
const pathRelative = require("path").relative;

/**
 * @param {import('@babel/core')} babel
 * @returns {import('@babel/core').PluginObj<{
 *  isDev: boolean,
 *  varCount: number,
 *  varPrefix: string,
 *  isImportedInCurrentFile: boolean
 * } & babel.PluginPass>}
 */
module.exports = function (babel) {
  const {
    types: { stringLiteral },
  } = babel;

  return {
    name: `${PACKAGE_NAME} unique variable name injector`,
    pre() {
      this.isImportedInCurrentFile = false;
      this.varCount = 0;
      this.isDev = this.file.opts.envName === "development";
    },
    visitor: {
      ImportDeclaration({ node }) {
        // Search for `import {CSSVariable} from "css-variable";`
        const isLib = node.source.value === PACKAGE_NAME;
        if (!isLib) {
          return;
        }
        this.isImportedInCurrentFile =
          this.isImportedInCurrentFile ||
          node.specifiers.some(
            (specifier) =>
              "imported" in specifier &&
              "name" in specifier.imported &&
              specifier.imported.name === VARIABLE_NAME
          );
      },
      NewExpression(path) {
        if (!this.isImportedInCurrentFile) {
          return;
        }
        const callee = path.node.callee;
        if (!("name" in callee) || callee.name !== VARIABLE_NAME) {
          return;
        }
        const devName = this.isDev && getNameByUsage(path);
        const devPrefix = devName ? `${devName}--` : "";
        //
        // Inject the variable prefix
        //
        // E.g. CSSVariable() -> CSSVariable("1isaui4-0")
        // E.g. CSSVariable({value: "10px"}) -> CSSVariable("1isaui4-0", {value: "10px"})
        //
        const constructorArguments = path.node.arguments;
        const firstArg = constructorArguments[0];
        const secondArg = constructorArguments[1];
        if (!secondArg && (!firstArg || firstArg.type !== "StringLiteral")) {
          constructorArguments.unshift(
            stringLiteral(devPrefix + getVarPrefix(this) + this.varCount++)
          );
        }
        //
        // Inject @__PURE__ comment to tell terser that
        // creating s CSSVariable class instance will cause no
        // side effects and is save to be removed
        //
        path.addComment("leading", "@__PURE__");
      },
    },
  };
};

/**
 * Tries to extract the name for readable names in developments
 * e.g.:
 *
 * `const fontSize = new CSSVariable()` -> fontSize
 * `const theme = { primary: new CSSVariable() }` -> primary
 *
 * @param {import('@babel/core').NodePath} path
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

/** @type {WeakMap<import('@babel/core').PluginPass, string>} */
const prefixCache = new WeakMap();
/**
 * Returns a unique name based on the processed filename
 * 
 * @param {import('@babel/core').PluginPass} pass
 */
function getVarPrefix(pass) {
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