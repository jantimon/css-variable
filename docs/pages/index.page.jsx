/// @ts-check
import { styled } from "linaria/lib/react";
import { CodeExample } from "./CodeExample";
import "./Theme";
import { theme } from "./Theme";

const Header = styled.header`
  display: grid;
  grid-template-columns: auto max-content max-content;
  grid-template-rows: 1fr;
  gap: 10px;
  color: ${theme.colors.base.val};
  align-items: end;
  max-width: 1200px;
  margin: 0 auto 120px;
`;

const TextLogo = styled.h1`
  font-size: 18px;
  margin: 0;
  letter-spacing: -1px;
`;

const HeaderLink = styled.a`
  font-size: 14px;
  color: ${theme.colors.base.val};
  text-decoration: none;
`;

const Main = styled.header`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacings.m.val};
`;

const Intro = styled.h2`
  font-size: 20px;
  color: ${theme.colors.base.val};
  text-align: center;
`;

const Headline = styled.h2`
  font-size: 18px;
  color: ${theme.colors.base.val};
  margin: ${theme.spacings.m.val} 0 ${theme.spacings.s.val} 0;
`;

const Text = styled.p`
  font-size: 16px;
  color: ${theme.colors.base.val};
  margin: 0 0 ${theme.spacings.m.val} 0;
`;

const Index = () => (
  <>
    <Header>
      <TextLogo>CSS Variable</TextLogo>
      <HeaderLink href="/documentation">Documentation</HeaderLink>
      <HeaderLink href="https://github.com/jantimon/css-variable">
        Github
      </HeaderLink>
    </Header>
    <Main>
      <Intro>
        Typesafe CSS Variable definitions for your CSS-in-JS solution
      </Intro>

      <CodeExample>
        {`
import { CSSVariable } from 'css-variable';

export const theme = {
  primary: new CSSVariable(),
  secondary: new CSSVariable(),
}
`}
      </CodeExample>

      <CodeExample>
        {`
import { theme } from './theme' 

export const Headline = styled.h1\`
  color: \${theme.primary};
\`;
        `}
      </CodeExample>

      <Headline>Export CSSVariables with your components</Headline>
      <Text>CSSVariables allow you to make a component stylable without css overwrites</Text>

      <CodeExample>
        {`
import { CSSVariable } from 'css-variable';

export const color = new CSSVariable({value: "#3a5779"});
export const hoverColor = new CSSVariable({value: "#23374e"});

export const Button = styled.button\`
  color: \${color};
  :hover { 
    color: \${hoverColor};
  }
\`;
        `}
      </CodeExample>

      <Headline>Modify CSSVariables</Headline>
      <Text>Set values of your CSS Variables in wrapper components</Text>
      <CodeExample>
        {`
import { Button, color, hoverColor } from './Button'

export const Teaser = styled.button\`
  background: #C2E7DA;

  \${color.createStyle("#3a5779")};
  \${hoverColor.createStyle("#23374e")};

  @media (prefers-color-scheme: dark) {
    background: #23374e;
    \${color.createStyle("#5886bb")};
    \${hoverColor.createStyle("#679cda")};
  }
\`

export const TeaserDark = styled.button\`
  background: #23374e;

  \${color.createStyle("#5886bb")};
  \${hoverColor.createStyle("#679cda")};

  @media (prefers-color-scheme: dark) {
    background: #C2E7DA;
    \${color.createStyle("#3a5779")};
    \${hoverColor.createStyle("#23374e")};
  }
\`
        `}
      </CodeExample>

      <Headline>Use CSSVariables for themes</Headline>
      <Text>Set values of your CSS Variables in wrapper components</Text>
      <CodeExample>
        {`
import { CSSVariable, serializeThemeValues } from 'css-variable';

export const theme = {
  primary: new CSSVariable(),
  secondary: new CSSVariable(),
}

const lightThemeCSS = serializeThemeValues(theme, {
  primary: "#3a5779",
  secondary: "#23374e"
});

const darkThemeCSS = serializeThemeValues(theme, {
  primary: "#6191c9",
  secondary: "#4d79aa"
});
`}
      </CodeExample>

      <Headline>Unique and consistent variable names</Headline>
      <Text>The optional babel plugin generates unique variable names during build time</Text>
      <CodeExample>
        {`
{
  "plugins": [
      "css-variable/babel"
  ]
}`}
      </CodeExample>
    </Main>
  </>
);

export default Index;
