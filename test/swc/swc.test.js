import {createVar} from "css-variable";

describe("createVar", () => {
    it("generates a variable name with swc plugin", () => {
      const foo = createVar();
      const bar = createVar();
      const baz = createVar();
      expect(foo.name).toMatchInlineSnapshot(`"--foo--2hzhhy0"`);
      expect(bar.name).toMatchInlineSnapshot( `"--bar--2hzhhy1"`);
      expect(baz.name).toMatchInlineSnapshot( `"--baz--2hzhhy2"`);
    });
  });
