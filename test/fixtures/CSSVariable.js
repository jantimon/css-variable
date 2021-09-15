import { CSSVariable } from "css-variable";

const primary = new CSSVariable();
const secondary = new CSSVariable({ value: '#fff' });

const theme = {
    colors: {
        primary: new CSSVariable()
    } 
};

const generated = allColors.map((color) => new CSSVariable(color));

const generatedWithFallback = allColors.map((color) => new CSSVariable(color, { value: '#000' }));
