/// @ts-check
import { styled } from "linaria/react";
import {theme} from './Theme';
import {
  gradientEndColor,
  gradientHover,
  gradientStartColor,
} from "./text-gradient";

const StyledLink = styled.a`
  font-family: Arial, Helvetica, sans-serif;
  font-size: ${theme.fontSize.val};
  ${gradientStartColor.toStyle("orange")};
  ${gradientEndColor.toStyle("purple")};
`;

export const Link = (props) => <StyledLink className={gradientHover} {...props} />
