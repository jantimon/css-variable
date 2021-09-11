# css-variable

Tiny ( ~0.3 kb ) treeshakable library to define CSS custom properties (variables) in JS.  
Compatible with 👩‍🎤 Emotion / 💅 StyledComponents / Linaria and similar CSS-in-JS solutions.

## Install

```bash
npm i css-variable
```

## Usage

### `CssVariable`

The `CssVariable` constructor creates a new typed Token

The constructor has an optional name property.
If omitted a unique css variable will be auto generated:

```jsx
import { CssVariable } from 'css-variable';
export const baseSize = new CssVariable();
```

Should you prefer a specific name just use it instead:

```jsx
import { CssVariable } from 'css-variable';
export const baseSize = new CssVariable("base-size");
```

Once defined the CssVariable can be used in your css-in-js code.  
It works for styled-components / emotion / linaria and similar solutions.

```jsx
const Headline = styled.h1`
  font-size: ${baseSize};
`
```

The `createStyle` method allows to modify a Css Variables inside a block:

```jsx
const Section = styled.section`
  ${baseSize.createStyle("12px")}
`
```

Additionally the he `createStyle` method allows to set a css variable dynamically inline:

```jsx
const Wrapper = ({children, large}) => (
    <div style={baseSize.createStyle(large ? "24px" : "12px")}>
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

  - `new CssVariable()` -> `CssVariable("1isaui4-0")`
  - `new CssVariable({value: '10px'})` -> `CssVariable("1isaui4-0", {value: '10px'})`

### Theming with `serializeThemeValues`

The optional `serializeThemeValues` helper allows to combine multiple CssVariables into a theme.

The following example is using styled components however the approach is compatible with most Css-in-JS libraries:

```js
import styled, { createGlobalStyle } from 'styled-components';
import { CssVariable, serializeThemeValues } from 'css-variable';

// Define a theme structure
const theme = {
  colors: {
   primary: new CssVariable(),
   secondary: new CssVariable(),
 }
}

// Set theme values
const themeCss = serializeThemeValues(theme, {
  colors: {
    primary: "#6290C3",
    secondary: "#C2E7DA",
}});

// Render theme
// (this step depends on your css solution)
const BrightTheme = createGlobalStyle`:root { ${themeCss} }`;

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