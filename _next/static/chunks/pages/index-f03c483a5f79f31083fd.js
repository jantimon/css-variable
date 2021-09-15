(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5634:function(e,n,r){"use strict";r.r(n),r.d(n,{default:function(){return E}});var s=r(4679),t=r(9008),a=r(2958),i=r(4184),o=r.n(i),l=r(7294),c=r(7825),h=r(8281),d=r(5893),m=function(e){var n=e.children,r=e.className;return(0,d.jsx)(c.Z,{className:o()("csxnfvq",r),language:"typescript",style:h.Z,children:n})},b=(0,a.z)("div")({name:"CodeExampleWrapper",class:"c11j6auv"}),u=(0,a.z)("div")({name:"CodeButtonWrapper",class:"c8d2l7j"}),x=(0,a.z)("button")({name:"MultiCodeButton",class:"mk7fc6w",vars:{"mk7fc6w-0":[function(e){return e.active?"rgba(230,230,230, 1)":"rgba(230,230,230, 0.7)"}]}}),p=function(e){var n=e.children,r=Object.keys(n),s=(0,l.useState)(r[0]),t=s[0],a=s[1];return(0,d.jsxs)(b,{children:[(0,d.jsx)(u,{children:r.length>1&&r.map((function(e){return(0,d.jsx)(x,{active:t===e,onClick:function(){return a(e)},children:e},e)}))}),r.map((function(e){return(0,d.jsx)(m,{className:o()("gxqllfb",t!==e&&"i1f7r3mv"),children:n[e]},e)}))]})};r(1371);var f=(0,a.z)("button")({name:"ThemeSwitchButton",class:"t1cxdcy7"}),g=function(){return(0,d.jsx)(f,{onClick:function(){return document.body.classList.toggle("it22hdj")},title:"Toggle Light/Dark Mode"})};r(6953);var j=(0,s.z)("header")({name:"HeaderWrapper",class:"h1ywabb7"}),v=(0,s.z)("div")({name:"Header",class:"h5zb0wt"}),y=(0,s.z)("h1")({name:"TextLogo",class:"t187y57f"}),k=(0,s.z)("a")({name:"HeaderLink",class:"h1b9cx9b"}),w=(0,s.z)("main")({name:"Main",class:"mh5o2k"}),S=(0,s.z)("section")({name:"Section",class:"s1hg68lr",vars:{"s1hg68lr-0":[function(e){return e.reverse?"row-reverse":"row"}]}}),C=(0,s.z)("div")({name:"SectionContent",class:"se7gjt0"}),_=(0,s.z)("div")({name:"SectionExample",class:"s13st4mt"}),z=(0,s.z)("h2")({name:"Intro",class:"i16qg7zl"}),V=(0,s.z)("h2")({name:"Headline",class:"h18tujcu"}),G=(0,s.z)("p")({name:"Text",class:"t1nh5uu8"}),T=(0,s.z)("footer")({name:"Footer",class:"f1uswb16"}),q=(0,s.z)("div")({name:"FooterContent",class:"fgs1r5i"}),H=(0,s.z)("div")({name:"Badges",class:"b1ufieqg"}),E=function(){return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(t.default,{children:(0,d.jsx)("link",{rel:"shortcut icon",href:"/static/favicon.png"})}),(0,d.jsx)(j,{children:(0,d.jsxs)(v,{children:[(0,d.jsx)(y,{children:"CSS Variable"}),(0,d.jsx)(k,{href:"/documentation",children:"Documentation"}),(0,d.jsx)(k,{href:"https://github.com/jantimon/css-variable",children:"Github"}),(0,d.jsx)(g,{})]})}),(0,d.jsxs)(w,{children:[(0,d.jsx)(z,{children:"CSS Variables for your CSS-in-JS solution"}),(0,d.jsxs)(S,{children:[(0,d.jsxs)(C,{children:[(0,d.jsx)(G,{children:"Built with high focus on performance"}),(0,d.jsxs)(G,{children:["\u2728 ",(0,d.jsx)("b",{children:"better"})," minification of your css"]}),(0,d.jsxs)(G,{children:["\u2728 ",(0,d.jsx)("b",{children:"smaller"})," virtual DOM updates"]}),(0,d.jsxs)(G,{children:["\u2728 ",(0,d.jsx)("b",{children:"less"})," crititcal SSR CSS"]})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(p,{children:{base:"\nimport { createVar } from 'css-variable';\n\nexport const tokens = {\n  primary: createVar(),\n  secondary: createVar(),\n}\n"}}),(0,d.jsx)(p,{children:{"styled-components":"\nimport { createGlobalTheme } from 'css-variable';\nimport { createGlobalStyle } from 'styled-components';\nimport { tokens } from './tokens' \n\nexport const GlobalStyles = createGlobalStyle`\n  ${createGlobalTheme(\":root\", tokens, {\n    primary: '#3a5779',\n    secondary: '#23374e',\n  })}\n",emotion:"\nimport { createGlobalTheme } from 'css-variable';\nimport { Global, css } from '@emotion/react'\nimport { tokens } from './tokens' \n\nexport const GlobalStyles = () =>\n  <Global styles={css`\n    ${createGlobalTheme(\":root\", tokens, {\n      primary: '#3a5779',\n      secondary: '#23374e',\n    })}}`\n  } />\n",linaria:"\nimport { createGlobalTheme } from 'css-variable';\nimport { css } from 'linaria'\nimport { tokens } from './tokens' \n\nexport const globalStyles = css`:global() {\n    ${createGlobalTheme(\":root\", tokens, {\n    primary: '#3a5779',\n    secondary: '#23374e',\n  })\n}` \n"}}),(0,d.jsx)(p,{children:{"js source":"\nimport { tokens } from './tokens' \n\nexport const Headline = styled.h1`\n  color: ${tokens.primary};\n`;\n","css result":"\n.se7gjt0-headline {\n  color: var(--primary--1isauia0);\n}\n"}})]})]}),(0,d.jsxs)(S,{reverse:!0,children:[(0,d.jsxs)(C,{children:[(0,d.jsx)(V,{children:"Create themable CSS Snippets"}),(0,d.jsx)(G,{children:"Define which parts of your reusable css are customizable without overwrites"})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(p,{children:{base:"\nexport const startColor = createVar({value: '#238f97'});\nexport const endColor = createVar({value: '#5442bb'});\n\nexport const gradientHover = css`\n  background: linear-gradient(to right, \n      ${gradientStartColor.val}, \n      ${gradientEndColor.val});\n      \n  background-size: 200% 200%;\n  animation: rainbow 2s ease-in-out infinite;\n  background-clip: text;\n\n  :focus, :hover {\n    color:rgba(0,0,0,0);\n  }\n  @keyframes rainbow { \n    0%{background-position:left}\n    50%{background-position:right}\n    100%{background-position:left}\n  }\n`;\n"}}),(0,d.jsx)(p,{children:{base:"\nimport { startColor, endColor, gradientHover } from './gradient';\n\nexport const Button = styled.button`\n  ${startColor.toStyle('#f5ab35');\n  ${endColor.toStyle('#8d1d1d')}\n  ${gradientHover}\n`;\n"}})]})]}),(0,d.jsxs)(S,{children:[(0,d.jsxs)(C,{children:[(0,d.jsx)(V,{children:"Unique and consistent variable names"}),(0,d.jsx)(G,{children:"The recommended babel plugin generates unique variable names during build time"}),(0,d.jsx)(V,{children:"Automatic DX"}),(0,d.jsx)(G,{children:"All babel generated variable names will have human readable names during development"})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(p,{children:{base:'\n{\n  "plugins": [\n      "css-variable/babel"\n  ]\n}\n'}}),(0,d.jsx)(p,{children:{original:"\nimport { createVar } from 'css-variable';\n\nexport const theme = {\n  primary: createVar(),\n  secondary: createVar(),\n};\n","transpiled dev":'\nimport { createVar } from \'css-variable\';\n\nexport const theme = {\n  primary: new /*@__PURE__*/createVar("primary--1isauia0"),\n  secondary: new /*@__PURE__*/createVar("secondary--1isauia1"),\n};\n',"transpiled prod":'\nimport { createVar } from \'css-variable\';\n\nexport const theme = {\n  primary: new /*@__PURE__*/createVar("1isauia0"),\n  secondary: new /*@__PURE__*/createVar("1isauia1"),\n};\n'}})]})]}),(0,d.jsxs)(S,{reverse:!0,children:[(0,d.jsxs)(C,{children:[(0,d.jsx)(V,{children:"Typed Contracts"}),(0,d.jsxs)(G,{children:["By default any string value is a valid CSSVariable.",(0,d.jsx)("br",{}),(0,d.jsx)("br",{}),"But it doesn't end here - the generic interface allows to define explicitly which values are assignable"]})]}),(0,d.jsx)(_,{children:(0,d.jsx)(p,{children:{base:"\nimport { createVar } from 'css-variable';\nimport type { CSSHexColor, CSSPixelValue } from 'css-variable';\n\nexport const tokens = {\n  colors: {\n    primary: createVar<CSSHexColor>(),\n    secondary: createVar<CSSHexColor>(),\n  },\n  spacing: {\n    large: createVar<CSSPixelValue>()\n  }\n};\n"}})})]})]}),(0,d.jsx)(T,{children:(0,d.jsxs)(q,{children:[(0,d.jsxs)(H,{children:[(0,d.jsx)("a",{href:"https://www.npmjs.com/package/css-variable",target:"_blank",children:(0,d.jsx)("img",{alt:"npm",src:"https://img.shields.io/npm/v/css-variable?style=for-the-badge"})}),(0,d.jsx)("a",{href:"https://bundlephobia.com/package/css-variable",target:"_blank",children:(0,d.jsx)("img",{alt:"BundleSize",src:"https://img.shields.io/bundlephobia/minzip/css-variable?style=for-the-badge"})}),(0,d.jsx)("a",{href:"https://github.com/jantimon/css-variable/",target:"_blank",children:(0,d.jsx)("img",{src:"https://img.shields.io/badge/github-OSS-brightgreen?style=for-the-badge&logo=GitHub",alt:"Github"})})]}),(0,d.jsxs)(H,{children:[(0,d.jsx)("a",{href:"https://github.com/jantimon/css-variable/actions/workflows/e2e-test.yml",target:"_blank",children:(0,d.jsx)("img",{alt:"GitHub Workflow Status",src:"https://img.shields.io/github/workflow/status/jantimon/css-variable/e2e%20test/main?style=for-the-badge"})}),(0,d.jsx)("a",{href:"https://github.com/jantimon/css-variable/blob/main/license",target:"_blank",children:(0,d.jsx)("img",{alt:"MIT License",src:"https://img.shields.io/npm/l/css-variable?style=for-the-badge"})})]})]})})]})};r(6706)},6057:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r(5634)}])},1371:function(e){e.exports={csxnfvq:"csxnfvq",c11j6auv:"c11j6auv",gxqllfb:"gxqllfb",i1f7r3mv:"i1f7r3mv",c8d2l7j:"c8d2l7j",mk7fc6w:"mk7fc6w"}},6953:function(e){e.exports={it22hdj:"it22hdj",t1cxdcy7:"t1cxdcy7"}},6706:function(e){e.exports={h1ywabb7:"h1ywabb7",h5zb0wt:"h5zb0wt",t187y57f:"t187y57f",h1b9cx9b:"h1b9cx9b",mh5o2k:"mh5o2k",s1hg68lr:"s1hg68lr",se7gjt0:"se7gjt0",s13st4mt:"s13st4mt",i16qg7zl:"i16qg7zl",h18tujcu:"h18tujcu",t1nh5uu8:"t1nh5uu8",f1uswb16:"f1uswb16",fgs1r5i:"fgs1r5i",b1ufieqg:"b1ufieqg"}}},function(e){e.O(0,[774,120,888,179],(function(){return n=6057,e(e.s=n);var n}));var n=e.O();_N_E=n}]);