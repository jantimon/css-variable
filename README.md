# css-variable

[![npm](https://img.shields.io/npm/v/css-variable)](npmjs.com/package/css-variable) [![e2e test](https://github.com/jantimon/css-variable/actions/workflows/e2e-test.yml/badge.svg)](https://github.com/jantimon/css-variable/actions/workflows/e2e-test.yml) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/css-variable) ![npm type definitions](https://img.shields.io/npm/types/css-variable) ![NPM](https://img.shields.io/npm/l/css-variable)

Tiny ( ~0.3 kb ) treeshakable library to define CSS custom properties (variables) in JS.  
Compatible with 👩‍🎤 Emotion / 💅 StyledComponents / Linaria and similar CSS-in-JS solutions.

## Install

```bash
npm i css-variable
```

## Usage

### `CSSVariable`

The `CSSVariable` constructor creates a new typed Token

The constructor has an optional name property.
If omitted a unique css variable will be auto generated:

```jsx
import { createVar } from 'css-variable';
export const baseSize = createVar();
```

Should you prefer a specific name just use it instead:

```jsx
import { createVar } from 'css-variable';
export const baseSize = createVar("base-size");
```

Once defined the CSSVariable can be used in your css-in-js code.  
It works for styled-components / emotion / linaria and similar solutions.

```jsx
const Headline = styled.h1`
  font-size: ${baseSize};
`
```

The `toStyle` method allows to modify a CSS Variables inside a block:

```jsx
const Section = styled.section`
  ${baseSize.toStyle("12px")}
`
```

Additionally the he `toStyle` method allows to set a css variable dynamically inline:

```jsx
const Wrapper = ({children, large}) => (
    <div style={baseSize.toStyle(large ? "24px" : "12px")}>
        {children}
    </div>
)
```


### Babel Plugin

The optional recommended babel plugin guarantees consistent variable names on SSR and client side.

.babelrc
```json
{
    "plugins": [
        "css-variable/babel"
    ]
}
```

With the plugin in place babel will inject the variable name during build time:

  - `createVar()` -> `/*@__PURE__ */ createVar("1isaui4-0")`
  - `createVar({value: '10px'})` -> `/*@__PURE__ */ createVar("1isaui4-0", {value: '10px'})`

### Theming with `createGlobalTheme` and `assignVars`

The optional `createGlobalTheme` helper allows to combine multiple CSSVariables into a theme.

The following example is using styled components however the approach is compatible with most CSS-in-JS libraries:

```js
import styled, { createGlobalStyle } from 'styled-components';
import { CSSVariable, createGlobalTheme, assignVars } from 'css-variable';

// Define a theme structure
const theme = {
  colors: {
   primary: createVar(),
   secondary: createVar(),
 }
}

// Set theme values
const themeCSS = createGlobalTheme(":root", theme, {
  colors: {
    primary: "#6290C3",
    secondary: "#C2E7DA",
}});

// Render theme
// (this step depends on your css solution)
const BrightTheme = createGlobalStyle`${themeCSS}`;

// Overwrite parts of the theme for a certain scope
const themeOverwrites = css`${assignVars(theme, { colors: { primary: '#C2E7DA' }})}`;

// Use the theme in your components
const Button = styled.button`
  color: ${theme.colors.primary};
`

const App = () => <>
  <BrightTheme />
  <Button>click me</Button>
</>
```

## License

Licensed under MIT  
Crafted with <3 [@jantimon](https://twitter.com/jantimon)

Special thanks to [@4alpine](https://twitter.com/4lpine) for donating the package name.