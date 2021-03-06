import styled from "styled-components";
import {
  gradientEndColor,
  gradientHover,
  gradientStartColor,
} from "./text-gradient";

const Link = styled.a`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  ${gradientStartColor.toStyle("#5610a5")};
  ${gradientEndColor.toStyle("#2286ad")};
  ${gradientHover};
`;

const Page = () => <Link href="/">Click me</Link>;

export default Page;
