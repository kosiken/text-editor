import styled, { keyframes } from "styled-components";
import { height, width, WidthProps, HeightProps} from "styled-system";
import { AppTheme } from "../../theme";

// Just an animation for showing that a task is running
const ringAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
 `;

export type LoadingIndicatorProps = React.HTMLAttributes<HTMLDivElement> & {color?: string} & HeightProps & WidthProps & { theme: AppTheme; };

 const LoadingIndicator = styled.div<LoadingIndicatorProps>`
    display: inline-block;
    ${height}
    ${width}
 
  &:after {
    content: " ";
  display: block;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin: 8px;
  border-radius: 50%;
  border: ${({ theme, color }) => `6px solid ${color || theme.colors.black}`};
  border-color:  ${({ theme, color }) => `${color || theme.colors.black} transparent ${color || theme.colors.black} transparent`};
  animation: ${ringAnimation} 1.2s linear infinite;
  }
 `;

LoadingIndicator.defaultProps = {
    height: '80px',
    width: '80px',
    color: 'black'
 }

export default LoadingIndicator;