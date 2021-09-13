/// @ts-check
import { css } from "linaria";
import { styled } from "linaria/react";
import classnames from "classnames";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import dark from "react-syntax-highlighter/dist/cjs/styles/hljs/a11y-dark";

const codeExampleStyles = css`
  margin: 0 auto;
  width: 600px;
  min-height: 50px;
  box-shadow: rgb(20 20 20 / 27%) 0.555556px 0.555556px 11.1111px;
  // Overrule react-syntax-highlighter style
  padding: 10px 20px !important;
`;

export const CodeExample = ({ children, className }) => (
  <SyntaxHighlighter
    className={classnames(codeExampleStyles, className)}
    language="typescript"
    style={dark}
  >
    {children}
  </SyntaxHighlighter>
);


const CodeExampleWithPreviewWrapper = styled.div`
  display: grid;
`;
const CodeSwitchButton = styled.button`
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 1;
  grid-row-end: 1;
  justify-self: end;
  background: #2b2b2b;
  color: #eee;
  &:hover {
    color: #fff;
  }
  position: relative;
  top: 5px;
  border: 0;
  padding: 5px 20px;
  cursor: pointer;
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
export const CodeExampleWithPreview = ({children, preview}) => {
  const [isPreviewVisible, setPrviewVisible] = useState(false);
  return <CodeExampleWithPreviewWrapper>
    <CodeSwitchButton onClick={() => setPrviewVisible(!isPreviewVisible)}>{isPreviewVisible ? 'hide' : 'show'}{" css variables"}</CodeSwitchButton>
    <CodeExample className={classnames(gridOverlay, isPreviewVisible && invisble)}>{children}</CodeExample>
    <CodeExample className={classnames(gridOverlay, !isPreviewVisible && invisble)}>{preview}</CodeExample>
  </CodeExampleWithPreviewWrapper>
}