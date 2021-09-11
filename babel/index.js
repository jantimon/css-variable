// @ts-check
const PACKAGE_NAME = "css-variable";
const VARIABLE_NAME = "CssVariable";
const hash = require("./hash");

/**
 * @param {import('@babel/core')} babel
 * @returns {import('@babel/core').PluginObj<{
 *  varCount: number,
 *  varPrefix: string,
 *  isUsedInCurrentFile: boolean
 * } & babel.PluginPass>}
 */
module.exports = function (babel) {
  const {
    types: { stringLiteral },
  } = babel;

  return {
    name: `${PACKAGE_NAME} unique variable name injector`,
    pre() {
      this.isUsedInCurrentFile = false;
      this.varCount = 0;
      this.varPrefix = hash(this.file.opts.filename || "weruz");
    },
    visitor: {
      ImportDeclaration({ node }) {
        const isLib = node.source.value === PACKAGE_NAME;
        if (!isLib) {
          return;
        }
        this.isUsedInCurrentFile =
          this.isUsedInCurrentFile ||
          node.specifiers.some(
            (specifier) =>
              "imported" in specifier &&
              "name" in specifier.imported &&
              specifier.imported.name === VARIABLE_NAME
          );
      },
      NewExpression(path) {
        if (!this.isUsedInCurrentFile) {
          return;
        }
        const callee = path.node.callee;
        if (!("name" in callee) || callee.name !== VARIABLE_NAME) {
          return;
        }
        const constructorArguments = path.node.arguments;
        const firstArg = constructorArguments[0];
        const secondArg = constructorArguments[1];
        if (!secondArg && (!firstArg || firstArg.type !== "StringLiteral")) {
          constructorArguments.unshift(
            stringLiteral(this.varPrefix + "-" + this.varCount++)
          );
        }
      },
    },
  };
};
