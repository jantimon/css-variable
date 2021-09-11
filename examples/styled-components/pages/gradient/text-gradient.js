/// @ts-check
import { CssVariable } from "css-variable";
import { css } from "styled-components";

export const fontColor = new CssVariable({value: "currentColor"});
export const gradientStartColor = new CssVariable();
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
