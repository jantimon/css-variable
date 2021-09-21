const {createVar} = require("../");

describe("createVar", () => {
    it("generates a variable name automatically", () => {
      const foo = createVar();
      const bar = createVar();
      const baz = createVar();
      expect(foo.name).toMatch("--17179149");
      expect(bar.name).toMatch("--1717914a");
      expect(baz.name).toMatch("--1717914b");
    });

    it("allows to define a fallback variable", () => {
      const foo = createVar({value: "red"});
      expect(foo.val).toMatch("var(--1717914c, red)");
    });

  });
