/// @ts-check
import { CSSVariable, serializeThemeValues } from "css-variable";
import { css } from "linaria";
import { styled } from "linaria/react";

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
    backgroundPrimary: new CSSVariable(),
    backgroundSecondary: new CSSVariable(),
  },
};

export const Font = css`
  :global {
    @import url("https://fonts.googleapis.com/css?family=Noto%20Sans&display=swap");
    body {
      font-family: "Noto Sans";
    }
  }
`;

export const Base = css`
  :global {
    body {
      margin: 0;
      padding: 0;
      background: ${theme.colors.backgroundPrimary.val};
    }
  }
`;

const lightTheme = serializeThemeValues(theme, {
  fontSize: "12px",
  spacings: {
    s: "10px",
    m: "20px",
    l: "30px",
  },
  colors: {
    base: "#24292e",
    primary: "#6290C3",
    secondary: "#C2E7DA",
    backgroundPrimary: "#efefef",
    backgroundSecondary: "#e8e8e7",
  },
});
const darkTheme = serializeThemeValues(theme, {
  fontSize: "12px",
  spacings: {
    s: "10px",
    m: "20px",
    l: "30px",
  },
  colors: {
    base: "#efefef",
    primary: "#6290C3",
    secondary: "#C2E7DA",
    backgroundPrimary: "#24292e",
    backgroundSecondary: "#393939",
  },
});

const invertedTheme = css`
  ${darkTheme}
  @media (prefers-color-scheme: dark) {
    ${lightTheme}
  }
`;

const ThemeSwitchButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  :before {
    content: "☀️";
    ${`.${invertedTheme}`} & {
      content: "🌙";
    }
  }
`;

export const ThemeSwitch = () => (
  <ThemeSwitchButton
    onClick={() => document.body.classList.toggle(invertedTheme)}
  />
);

export const DefaultTheme = css`
  :global() {
    :root {
      ${lightTheme}
    }
    @media (prefers-color-scheme: dark) {
      :root {
        ${darkTheme}
      }
    }
  }
`;
