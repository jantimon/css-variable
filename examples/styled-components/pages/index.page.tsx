import styled from "styled-components";
import { CSSPixelValue, CSSVariable, serializeThemeValues } from "css-variable";

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

const ThemeA = styled.div`
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
`;

const ThemeB = styled.div`
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
`;

const colorVar = new CSSVariable({ value: theme.colors.primary });
const xVar = new CSSVariable<CSSPixelValue>({ value: "0" });

const StyledHeadline = styled.h1`
  font-family: Arial, Helvetica, sans-serif;
  font-size: ${theme.fontSize};
  color: ${colorVar};
  transform: translateX(${xVar});
  width: calc(100% - 1 * ${xVar});
`;

const FancyComponent: React.FunctionComponent<{color?:string}> = ({ color, children }) => {
  return (
    <StyledHeadline style={color && colorVar.toStyle(color)}>
      {children}
    </StyledHeadline>
  );
};

const BigBox = styled.div`
  background: ${theme.colors.secondary};
  padding: ${theme.spacings.m};

  ${colorVar.toStyle("grey")}
  ${xVar.toStyle('20px')}

  @media (min-width: 500px) {
    ${xVar.toStyle('250px')};
  }
`;

const Demo = () => (
  <>
    <FancyComponent color="orange">Demo</FancyComponent>
    <div style={xVar.toStyle(`200px`)}>
      <FancyComponent>xOffset</FancyComponent>
    </div>
    <BigBox>
      <FancyComponent>Inside Box</FancyComponent>
    </BigBox>
  </>
);

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
