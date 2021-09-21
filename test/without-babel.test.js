const {createVar} = require("../");

describe("createVar", () => {
    it("generates a variable name automatically", () => {
      const foo = createVar();
      const bar = createVar();
      const baz = createVar();
      expect(foo.name).toMatch("--fffffffe");
      expect(bar.name).toMatch("--ffffffff");
      expect(baz.name).toMatch("--100000000");
    });

    it("allows to define a fallback variable", () => {
      const foo = createVar({value: "red"});
      expect(foo.val).toMatch("var(--100000001, red)");
    });

  });
