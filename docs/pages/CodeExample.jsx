/// @ts-check
import { css } from "linaria";
import SyntaxHighlighter from "react-syntax-highlighter";
import dark from 'react-syntax-highlighter/dist/cjs/styles/hljs/a11y-dark';

const codeExampleStyles = css`
    margin: 0 auto;
    width: 600px;
    min-height: 50px;
    box-shadow: rgb(20 20 20 / 27%) 0.555556px 0.555556px 11.1111px;
    // Overrule react-syntax-highlighter style
    padding: 10px 20px !important;
`;

export const CodeExample = ({ children }) => (
    <SyntaxHighlighter className={codeExampleStyles} language="typescript" style={dark}>
      {children}
    </SyntaxHighlighter>
);
