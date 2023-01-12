import styled from 'styled-components';
import { baseTheme as theme } from '../../theme';
import {
  LayoutProps,
  ColorProps,
  BackgroundProps,
  BorderProps,
  GridProps,
  PositionProps,
  ShadowProps,
  FlexboxProps,
  OpacityProps,
  OverflowProps,
  background,
  layout,
  color,
  height,
  position,
  opacity,
  overflow,
  flex,
  grid,
  border,
  compose,
  flexBasis,
  FlexProps,
  flexbox,
  SpaceProps,
  space,
  TextAlignProps,
  textAlign,
  shadow
} from 'styled-system';


export type BoxProps = React.RefAttributes<any> &
  React.HTMLAttributes<any> &
  LayoutProps &
  ColorProps &
  BackgroundProps &
  BorderProps &
  GridProps &
  PositionProps &
  ShadowProps &
  FlexboxProps &
  FlexProps &
  OpacityProps &
  SpaceProps &
  OverflowProps &
  TextAlignProps;

// The styled-system library allows you to extend normal react elements and give them props to allow for flexible 
//  styling for exammple the  **opacity**  function allows you to do something like 
// <Box opacity={0.8} >{...children}</Box>. Here the opacity of this element is now readily customizable from inside 
// Jsx code

const properties = compose(
  layout,
  color,
  background,
  flex,
  flexbox,
  flexBasis,
  position,
  opacity,
  overflow,
  grid,
  border,
  space,
  textAlign,
  height,
  shadow
);

export const Box = styled('div')<BoxProps>(
  {
    boxSizing: 'border-box'
  },
  properties
);

Box.defaultProps = {
  theme
};

export default Box;
