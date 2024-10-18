import { createVar } from "css-variable";
describe("createVar", ()=>{
    it("generates a variable name with swc plugin", ()=>{
        const foo = createVar("foo--3ZNfWd0");
        const bar = createVar("bar--3ZNfWd1");
        const baz = createVar("baz--3ZNfWd2");
        expect(foo.name).toMatchInlineSnapshot(`"--foo--3znfwd0"`);
        expect(bar.name).toMatchInlineSnapshot(`"--bar--3znfwd1"`);
        expect(baz.name).toMatchInlineSnapshot(`"--baz--3znfwd2"`);
    });
});

