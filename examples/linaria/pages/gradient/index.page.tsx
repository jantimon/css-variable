import classnames from "classnames";
import { css } from "linaria";
import { gradientEndColor, gradientHover, gradientStartColor } from './text-gradient';

const baseLink = css`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  ${gradientStartColor.toStyle("orange")};
  ${gradientEndColor.toStyle("purple")};
`

const Link = (props) => <a {...props} className={classnames(props.className, baseLink, gradientHover)} /> 

const Page = () => (
  <Link href="/">Click me</Link>
)

export default Page;
