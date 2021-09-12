/// @ts-check
import { css } from "linaria";
import { styled } from "linaria/react";
import { CSSVariable, serializeThemeValues } from "css-variable";

const theme = {
  fontSize: new CSSVariable("FontSize"),
  spacings: {
    s: new CSSVariable(),
    m: new CSSVariable(),
    l: new CSSVariable(),
  },
  colors: {
    primary: new CSSVariable("primary"),
    secondary: new CSSVariable("secondary"),
  },
};

const colorVar = new CSSVariable({ value: theme.colors.primary });
const xVar = new CSSVariable({ value: 0, unit: "px" });

const StyledHeadline = styled.h1`
  font-family: Arial, Helvetica, sans-serif;
  font-size: ${theme.fontSize.val};
  color: ${colorVar.val};
  transform: translateX(${xVar.val});
  width: calc(100% - 1 * ${xVar.val});
`;

/** @param {{color?:string, children: string}} props */
const FancyComponent = ({ color, children }) => {
  return (
    <StyledHeadline style={color && colorVar.createStyle(color)}>
      {children}
    </StyledHeadline>
  );
};

const BigBox = styled.div`
  background: ${theme.colors.secondary.val};
  padding: ${theme.spacings.m.val};

  ${colorVar.createStyle("grey")}
  ${xVar.createStyle(20)}

  @media (min-width: 500px) {
    ${xVar.createStyle(250)};
  }
`;

const Demo = () => (
  <>
    <FancyComponent color="orange">Demo</FancyComponent>
    <div>
      <FancyComponent>xOffset</FancyComponent>
    </div>
    <BigBox>
      <FancyComponent>Inside Box</FancyComponent>
    </BigBox>
  </>
);

const ThemeA = (props) => <div {...props} className={css`
  ${serializeThemeValues(theme, {
    fontSize: "12px",
    spacings: {
      s: "10px",
      m: "20px",
      l: "30px",
    },
    colors: {
      primary: "#6290C3",
      secondary: "#C2E7DA",
    },
  })}
`} />;

const ThemeB = (props) => <div {...props} className={css`
  ${serializeThemeValues(theme, {
    fontSize: "24px",
    spacings: {
      s: "20px",
      m: "40px",
      l: "60px",
    },
    colors: {
      primary: "#7C9EB2",
      secondary: "#52528C",
    },
  })}
`} />;

const Index = () => (
  <>
    <ThemeA>
      <Demo />
    </ThemeA>
    <br />
    <br />
    <ThemeB>
      <Demo />
    </ThemeB>
  </>
);

export default Index;
