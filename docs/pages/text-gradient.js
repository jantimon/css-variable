/// @ts-check
import { CssVariable } from "css-variable";
import { css } from "linaria";

export const fontColor = new CssVariable({value: "currentColor"});
/** The linear gradient start color during hover */
export const gradientStartColor = new CssVariable();
/** The linear gradient end color during hover */
export const gradientEndColor = new CssVariable();

export const gradientHover = css`
    color: ${fontColor.val}; 
    background: linear-gradient(to right, ${gradientStartColor.val}, ${gradientEndColor.val});
    background-size: 200% 200%;
    animation: rainbow 2s ease-in-out infinite;
    background-clip: text;
    -webkit-background-clip:text;
    transition: color .2s ease-in-out;
  }
  :focus,
  :hover{
    color:rgba(0,0,0,0);
  }
  @keyframes rainbow { 
    0%{background-position:left}
    50%{background-position:right}
    100%{background-position:left}
  }
`;

