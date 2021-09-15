/// @ts-check
import { createVar, createGlobalTheme } from "css-variable";
import { css } from "linaria";
import { styled } from "linaria/react";

export const theme = {
  fontSize: createVar("FontSize"),
  spacings: {
    s: createVar(),
    m: createVar(),
    l: createVar(),
  },
  colors: {
    base: createVar("base"),
    primary: createVar("primary"),
    secondary: createVar("secondary"),
    backgroundPrimary: createVar(),
    backgroundSecondary: createVar(),
  },
};

export const Font = css`
  :global {
    @import url("https://fonts.googleapis.com/css?family=Noto%20Sans");
    body {
      font-family: "Noto Sans";
    }
  }
`;

export const Base = css`
  :global {
    * { box-sizing: inherit }
    body {
      min-width: min-content;
      margin: 0;
      padding: 0;
      background: ${theme.colors.backgroundPrimary.val};
      box-sizing: border-box;
    }
  }
`;

const lightTheme = /*@__PURE__*/createGlobalTheme("", theme, {
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
const darkTheme = /*@__PURE__*/createGlobalTheme("", theme, {
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
  position: relative;
  overflow: hidden;
  :before {
    transition: transform 300ms ease-in-out;
    content: "🌙";
    display: block;
    ${`.${invertedTheme}`} & {
      transform: translateY(-120%);
    }
  }
  :after {
    transition: transform 300ms ease-in-out;
    position: absolute;
    left: 0;
    top: 0;
    content: "☀️";
    transform: translateY(240%);
    ${`.${invertedTheme}`} & {
      transform: translateY(0);
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
