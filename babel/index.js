// @ts-check
const PACKAGE_NAME = "css-variable";
const VARIABLE_NAME = "CssVariable";
const hash = require("./hash");
const path = require("path");

/**
 * @param {import('@babel/core')} babel
 * @returns {import('@babel/core').PluginObj<{
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
      // Variables should keep the same generated name for
      // multiple builds.
      //
      // This is possible by hashing the source filename
      // which includes the CssVariable.
      // 
      // As an absolute file might be different from system to system
      // the relative filename is used instead
      const relativeFileName = path.relative(__dirname, this.file.opts.filename).replace(/\\/g, '/')
      this.varPrefix = hash(this.file.opts.filename || "weruz");
    },
    visitor: {
      ImportDeclaration({ node }) {
        // Search for `import {CssVariable} from "css-variable";`
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
        //
        // Inject the variable prefix 
        //
        // E.g. CssVariable() -> CssVariable("1isaui4-0")
        // E.g. CssVariable({value: "10px"}) -> CssVariable("1isaui4-0", {value: "10px"})
        //
        const constructorArguments = path.node.arguments;
        const firstArg = constructorArguments[0];
        const secondArg = constructorArguments[1];
        if (!secondArg && (!firstArg || firstArg.type !== "StringLiteral")) {
          constructorArguments.unshift(
            stringLiteral(this.varPrefix + "-" + this.varCount++)
          );
        }
        //
        // Inject @__PURE__ comment to tell terser that
        // creating s CssVariable class instance will cause no 
        // side effects and is save to be removed
        //
        path.addComment('leading', "@__PURE__");
      },
    },
  };
};
