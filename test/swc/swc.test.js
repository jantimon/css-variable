import {createVar} from "css-variable";

describe("createVar", () => {
    it("generates a variable name with swc plugin", () => {
      const foo = createVar();
      const bar = createVar();
      const baz = createVar();
      expect(foo.name).toMatchInlineSnapshot(`"--foo--_llxb0"`);
      expect(bar.name).toMatchInlineSnapshot( `"--bar--_llxb1"`);
      expect(baz.name).toMatchInlineSnapshot( `"--baz--_llxb2"`);
    });

  });
