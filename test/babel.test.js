const transformFileSync = require("@babel/core").transformFileSync;
const path = require("path");
const plugin = require("../babel");

describe("production transform", () => {
    it("CSSVariable", () => {
      const { code } = transformFileSync(
        path.join(__dirname, "fixtures/CSSVariable.js"),
        {
          plugins: [[plugin, test.options]],
          babelrc: false,
        }
      );
      expect(code).toMatchSnapshot();
    });
    it("createVar", () => {
      const { code } = transformFileSync(
        path.join(__dirname, "fixtures/createVar.js"),
        {
          plugins: [[plugin, test.options]],
          babelrc: false,
        }
      );
      expect(code).toMatchSnapshot();
    });
    it("renamed", () => {
      const { code } = transformFileSync(
        path.join(__dirname, "fixtures/renamed.js"),
        {
          plugins: [[plugin, test.options]],
          babelrc: false,
        }
      );
      expect(code).toMatchSnapshot();
    });
  });

  describe("development transform", () => {
    it("CSSVariable", () => {
      const { code } = transformFileSync(
        path.join(__dirname, "fixtures/CSSVariable.js"),
        {
          plugins: [[plugin, test.options]],
          babelrc: false,
          envName: "development"
        }
      );
      expect(code).toMatchSnapshot();
    });
    it("createVar", () => {
      const { code } = transformFileSync(
        path.join(__dirname, "fixtures/createVar.js"),
        {
          plugins: [[plugin, test.options]],
          babelrc: false,
          envName: "development"
        }
      );
      expect(code).toMatchSnapshot();
    });
    it("renamed", () => {
      const { code } = transformFileSync(
        path.join(__dirname, "fixtures/renamed.js"),
        {
          plugins: [[plugin, test.options]],
          babelrc: false,
          envName: "development"
        }
      );
      expect(code).toMatchSnapshot();
    });
  });
