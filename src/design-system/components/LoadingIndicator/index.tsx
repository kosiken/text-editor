import styled, { keyframes } from "styled-components";
import { height, width, WidthProps, HeightProps} from "styled-system";
import { AppTheme } from "../../theme";

const ringAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
 `;

export type LoadingIndicatorProps = React.HTMLAttributes<HTMLDivElement> & HeightProps & WidthProps & { theme: AppTheme; };


 const LoadingIndicator = styled.div<LoadingIndicatorProps>`
    display: inline-block;
    ${height}
    ${width}
  &:after {
    content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: ${({ theme }) => `6px solid ${theme.colors.black}`};
  border-color:  ${({ theme }) => `${theme.colors.black} transparent ${theme.colors.black} transparent`};
  animation: ${ringAnimation} 1.2s linear infinite;
  }
 
 `;

LoadingIndicator.defaultProps = {
    height: '80px',
    width: '80px'
 }

export default LoadingIndicator;