import { createVar } from "css-variable";

describe("createVar", () => {
  it("generates a variable name with swc plugin", () => {
    const foo = createVar();
    const bar = createVar();
    const baz = createVar();
    expect(foo.name).toMatchInlineSnapshot(`"--foo--3znfwd0"`);
    expect(bar.name).toMatchInlineSnapshot(`"--bar--3znfwd1"`);
    expect(baz.name).toMatchInlineSnapshot(`"--baz--3znfwd2"`);
  });
});
