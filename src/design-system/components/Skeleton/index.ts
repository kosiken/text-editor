import styled, { keyframes } from 'styled-components';
import { baseTheme as theme } from '../../theme';
import {
  LayoutProps,
  MarginProps,
  GridProps,
  BorderRadiusProps,
  PositionProps,
  FlexboxProps,
  position,
  layout,
  width,
  height,
  flex,
  grid,
  compose,
  FlexProps,
  flexbox,
  SpaceProps,
  borderRadius,
  margin,
  space

} from 'styled-system';


const properties = compose(
  layout,
  flex,
  flexbox,
  position,
  grid,
  space,
  borderRadius,
  margin,
  width,
  height,
);

const skeletonLoading = keyframes`
  0% { background-color: hsl(200, 20%, 80%); }
  100% { background-color: hsl(200, 20%, 95%) }
 `;

export type SkeletonProps = React.RefAttributes<any> &
  React.HTMLAttributes<any> &
  LayoutProps &
  BorderRadiusProps &
  MarginProps &
  GridProps &
  PositionProps &
  FlexboxProps &
  FlexProps &
  SpaceProps;

/**
 * Skeleton is used to render a placeholder content while we wait 
 * for the actual content to load. It provides a less jarring transition
 */
const SkeletonBase = styled.div`
 animation-name: ${skeletonLoading};
 animation-duration: 1s;
 animation-iteration-count: infinite;
 animation-timing-function: linear;
`;

export const Skeleton = styled(SkeletonBase)<SkeletonProps>(
  {
    boxSizing: 'border-box'
  },
  properties
);

Skeleton.defaultProps = {
  theme
};

export default Skeleton;
