import { createVar } from "css-variable";

const primary = createVar();
const secondary = createVar({ value: '#fff' });

const theme = {
    colors: {
        primary: createVar()
    } 
};

const generated = allColors.map((color) => createVar(color));

const generatedWithFallback = allColors.map((color) => createVar(color, { value: '#000' }));
