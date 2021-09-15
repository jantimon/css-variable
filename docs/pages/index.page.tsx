import { styled } from "linaria/lib/react";
import Head from "next/head";
import { CodeExamples } from "./CodeExample";
import "./Theme";
import { theme, ThemeSwitch } from "./Theme";

const HeaderWrapper = styled.header`
  background: ${theme.colors.backgroundSecondary.val};
  position: fixed;
  top: 0;
  width: 100%;
  padding: 5px 10px;
  z-index: 10;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: auto max-content max-content max-content;
  grid-template-rows: 1fr;
  gap: 10px;
  color: ${theme.colors.base.val};
  align-items: end;
  max-width: 1200px;
  margin: 0 auto;
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

const Main = styled.main`
  padding: 80px 50px 0px;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacings.m.val};

  @media (min-width: 860px) {
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const Section = styled.section<{ reverse?: boolean }>`
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  flex-direction: ${({ reverse }) => (reverse ? "row-reverse" : "row")};
  margin-bottom: 80px;
  @media (min-width: 860px) {
    flex-wrap: nowrap;
    margin-bottom: 120px;
  }
`;

const SectionContent = styled.div`
  display: flex;
  max-width: 600px;
  margin: 0 auto;
  gap: ${theme.spacings.m.val};
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 1;
  width: 100%;
  @media (min-width: 860px) {
    flex-wrap: nowrap;
    margin-bottom: 40px;
  }
`;

const SectionExample = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 0;
  width: 100%;
  @media (min-width: 860px) {
    width: 65%;
  }
`;

const Intro = styled.h2`
  font-size: 20px;
  color: ${theme.colors.base.val};
  text-align: center;
  margin-bottom: 40px;
`;

const Headline = styled.h2`
  font-size: 18px;
  color: ${theme.colors.base.val};
  margin: 0 0 5px 0;
`;

const Text = styled.p`
  font-size: 16px;
  color: ${theme.colors.base.val};
  margin: 0 0 15px 0;
`;

const Footer = styled.footer`
  font-size: 14px;
  background: ${theme.colors.backgroundSecondary.val};
  color: ${theme.colors.base.val};
  padding: 20px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
`;

const Badges = styled.div`
  display: inline-flex;
  gap: 8px;
  margin-right: 8px;
  margin-bottom: 8px;
  line-height: 0;
`

const Index = () => (
  <>
    <Head>
      <link rel="shortcut icon" href="/static/favicon.png" />
    </Head>
    <HeaderWrapper>
      <Header>
        <TextLogo>CSS Variable</TextLogo>
        <HeaderLink href="/documentation">Documentation</HeaderLink>
        <HeaderLink href="https://github.com/jantimon/css-variable">
          Github
        </HeaderLink>
        <ThemeSwitch />
      </Header>
    </HeaderWrapper>
    <Main>
      <Intro>CSS Variables for your CSS-in-JS solution</Intro>

      <Section>
        <SectionContent>
          <Text>Built with high focus on performance</Text>
          <Text>
            ✨ <b>better</b> minification of your css
          </Text>
          <Text>
            ✨ <b>smaller</b> virtual DOM updates
          </Text>
          <Text>
            ✨ <b>less</b> crititcal SSR CSS
          </Text>
        </SectionContent>
        <SectionExample>
          <CodeExamples>
            {{
              base: `
import { createVar } from 'css-variable';

export const tokens = {
  primary: createVar(),
  secondary: createVar(),
}
`,
            }}
          </CodeExamples>

          <CodeExamples>
            {{
              "styled-components": `
import { createGlobalTheme } from 'css-variable';
import { createGlobalStyle } from 'styled-components';
import { tokens } from './tokens' 

export const GlobalStyles = createGlobalStyle\`
  $\{createGlobalTheme(":root", tokens, {
    primary: '#3a5779',
    secondary: '#23374e',
  })}
`,

              emotion: `
import { createGlobalTheme } from 'css-variable';
import { Global, css } from '@emotion/react'
import { tokens } from './tokens' 

export const GlobalStyles = () =>
  <Global styles={css\`
    $\{createGlobalTheme(":root", tokens, {
      primary: '#3a5779',
      secondary: '#23374e',
    })}}\`
  } />
`,

              linaria: `
import { createGlobalTheme } from 'css-variable';
import { css } from 'linaria'
import { tokens } from './tokens' 

export const globalStyles = css\`:global() {
    $\{createGlobalTheme(":root", tokens, {
    primary: '#3a5779',
    secondary: '#23374e',
  })
}\` 
`,
            }}
          </CodeExamples>

          <CodeExamples>
            {{
              'js source': `
import { tokens } from './tokens' 

export const Headline = styled.h1\`
  color: \${tokens.primary};
\`;
`,
        'css result': `
.se7gjt0-headline {
  color: var(--primary--1isauia0);
}
`,
            }}
          </CodeExamples>
        </SectionExample>
      </Section>

      <Section reverse>
        <SectionContent>
          <Headline>Create themable CSS Snippets</Headline>
          <Text>Define which parts of your reusable css are customizable without overwrites</Text>
        </SectionContent>
        <SectionExample>
          <CodeExamples>
            {{
              base: `
export const startColor = createVar({value: '#238f97'});
export const endColor = createVar({value: '#5442bb'});

export const gradientHover = css\`
  background: linear-gradient(to right, 
      \${gradientStartColor.val}, 
      \${gradientEndColor.val});
      
  background-size: 200% 200%;
  animation: rainbow 2s ease-in-out infinite;
  background-clip: text;

  :focus, :hover {
    color:rgba(0,0,0,0);
  }
  @keyframes rainbow { 
    0%{background-position:left}
    50%{background-position:right}
    100%{background-position:left}
  }
\`;
`,
            }}
          </CodeExamples>
          <CodeExamples>
            {{
              base: `
import { startColor, endColor, gradientHover } from './gradient';

export const Button = styled.button\`
  \${startColor.toStyle('#f5ab35');
  \${endColor.toStyle('#8d1d1d')}
  \${gradientHover}
\`;
`,
            }}
          </CodeExamples>
        </SectionExample>
      </Section>

      <Section>
        <SectionContent>
          <Headline>Unique and consistent variable names</Headline>
          <Text>
            The recommended babel plugin generates unique variable names during
            build time
          </Text>
          <Headline>Automatic DX</Headline>
          <Text>
            All babel generated variable names will have human readable names
            during development
          </Text>
        </SectionContent>
        <SectionExample>
          <CodeExamples>
            {{
              base: `
{
  "plugins": [
      "css-variable/babel"
  ]
}
`,
            }}
          </CodeExamples>
          <CodeExamples>
            {{
              original: `
import { createVar } from 'css-variable';

export const theme = {
  primary: createVar(),
  secondary: createVar(),
};
`,
              "transpiled dev": `
import { createVar } from 'css-variable';

export const theme = {
  primary: new /*@__PURE__*/createVar("primary--1isauia0"),
  secondary: new /*@__PURE__*/createVar("secondary--1isauia1"),
};
`,
              "transpiled prod": `
import { createVar } from 'css-variable';

export const theme = {
  primary: new /*@__PURE__*/createVar("1isauia0"),
  secondary: new /*@__PURE__*/createVar("1isauia1"),
};
`,
            }}
          </CodeExamples>
        </SectionExample>
      </Section>

      <Section reverse>
        <SectionContent>
          <Headline>Typed Contracts</Headline>
          <Text>By default any string value is a valid CSSVariable.<br /><br />But it doesn't end here - the generic interface allows to define explicitly which values are assignable</Text>
        </SectionContent>
        <SectionExample>
          <CodeExamples>
            {{
              base: `
import { createVar } from 'css-variable';
import type { CSSHexColor, CSSPixelValue } from 'css-variable';

export const tokens = {
  colors: {
    primary: createVar<CSSHexColor>(),
    secondary: createVar<CSSHexColor>(),
  },
  spacing: {
    large: createVar<CSSPixelValue>()
  }
};
`,
            }}
          </CodeExamples>
        </SectionExample>
      </Section>


    </Main>
    <Footer>
      <FooterContent>
        <Badges>
        <a href="https://www.npmjs.com/package/css-variable" target="_blank">
          <img
            alt="npm"
            src="https://img.shields.io/npm/v/css-variable?style=for-the-badge"
          />
        </a>
        <a href="https://bundlephobia.com/package/css-variable" target="_blank">
          <img
            alt="BundleSize"
            src="https://img.shields.io/bundlephobia/minzip/css-variable?style=for-the-badge"
          />
        </a>
        <a href="https://github.com/jantimon/css-variable/" target="_blank">
          <img
            src="https://img.shields.io/badge/github-OSS-brightgreen?style=for-the-badge&logo=GitHub"
            alt="Github"
          />
        </a>
        </Badges>
        <Badges>
        <a
          href="https://github.com/jantimon/css-variable/actions/workflows/e2e-test.yml"
          target="_blank"
        >
          <img
            alt="GitHub Workflow Status"
            src="https://img.shields.io/github/workflow/status/jantimon/css-variable/e2e%20test/main?style=for-the-badge"
          />
        </a>
        <a
          href="https://github.com/jantimon/css-variable/blob/main/license"
          target="_blank"
        >
          <img
            alt="MIT License"
            src="https://img.shields.io/npm/l/css-variable?style=for-the-badge"
          />
        </a>
        </Badges>
      </FooterContent>
    </Footer>
  </>
);

export default Index;
