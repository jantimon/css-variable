/// @ts-check
import { CSSVariable, serializeThemeValues } from "css-variable";
import { css } from "linaria";

export const theme = {
  fontSize: new CSSVariable("FontSize"),
  spacings: {
    s: new CSSVariable(),
    m: new CSSVariable(),
    l: new CSSVariable(),
  },
  colors: {
    base: new CSSVariable("base"),
    primary: new CSSVariable("primary"),
    secondary: new CSSVariable("secondary"),
  },
};

export const Font = css`
  :global {
    @import url('https://fonts.googleapis.com/css?family=Noto%20Sans&display=swap');
    body {
      font-family: "Noto Sans";
    }
  }
`;

export const ThemeLightValues = css`
  :global() {
    :root{
      ${serializeThemeValues(theme, {
        fontSize: "12px",
        spacings: {
          s: "10px",
          m: "20px",
          l: "30px",
        },
        colors: {
          base: '#333',
          primary: "#6290C3",
          secondary: "#C2E7DA",
        },
      })}
    }
  }
`;

