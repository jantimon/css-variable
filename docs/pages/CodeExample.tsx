import { css } from "linaria";
import { styled } from "linaria/react";
import classnames from "classnames";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import dark from "react-syntax-highlighter/dist/cjs/styles/hljs/a11y-dark";

const codeExampleStyles = css`
  margin: 0 auto;
  width: 100%;
  max-width: 600px;
  min-height: 50px;
  box-shadow: rgb(20 20 20 / 27%) 0.555556px 0.555556px 11.1111px;
  // Overrule react-syntax-highlighter style
  padding: 10px 20px !important;
`;

/** @param {{children, className?: string}} props */
export const CodeExample = ({ children, className }) => (
  <SyntaxHighlighter
    className={classnames(codeExampleStyles, className)}
    language="typescript"
    style={dark}
  >
    {children}
  </SyntaxHighlighter>
);

const CodeExampleWrapper = styled.div`
  display: grid;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
`;

const gridOverlay = css`
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 2;
  grid-row-end: 2;
`;
const invisble = css`
  opacity: 0;
  pointer-events: none;
`

const CodeButtonWrapper = styled.div`
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 1;
  grid-row-end: 1;
  justify-self: end;
  white-space: nowrap;
  margin-top: -5px;
`;

const MultiCodeButton = styled.button<{active?: boolean}>`
  background: #2b2b2b;
  transition: color 300ms;
  color: ${(props) => props.active ? 'rgba(230,230,230, 1)' : 'rgba(230,230,230, 0.7)'};
  &:hover {
    color: rgba(230,230,230, 1);
  }
  position: relative;
  top: 5px;
  border: 0;
  margin: 0;
  padding: 5px 20px;
  cursor: pointer;
  & + & {
    box-shadow: -8px 0px 1px -7px white;
  }
`

export const CodeExamples = ({ children }) => {
  const keys = Object.keys(children);
  const [activeKey, setActiveKeys] = useState(keys[0]);
  return <CodeExampleWrapper>
    <CodeButtonWrapper>
      {keys.length > 1 && keys.map((key) => (
        <MultiCodeButton key={key} active={activeKey === key} onClick={() => setActiveKeys(key)}>{key}</MultiCodeButton>
      ))}
    </CodeButtonWrapper>
    {
      keys.map((key) => (
        <CodeExample key={key} className={classnames(gridOverlay, activeKey !== key && invisble)}>{children[key]}</CodeExample>
      ))
    }
  </CodeExampleWrapper>
}