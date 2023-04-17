import * as React from 'react';
import styled, { useTheme } from 'styled-components';
import { height, width, WidthProps, HeightProps, compose, DisplayProps, } from 'styled-system';
import { AppTheme } from '../../theme';
import { ColorProp,  } from '../../theme/colors';
import { IconNames } from '../../theme/icons';
import iconPaths from '../../theme/icon.path';

const stylesFn = compose(width, height);
type IconSize = {
    width: number;
    height: number;
  };
export type IconBaseProps = {
  name: IconNames;
  size?: IconSize;
  color?: ColorProp | string;
  viewBox?: string;


} & DisplayProps;

export const Svg = styled('svg')`
  flex-shrink: 0;
  backface-visibility: hidden;
  &:not(:root) {
    overflow: hidden;
  }

  ${stylesFn}
`;





export const Icon = React.forwardRef<SVGSVGElement, IconBaseProps & WidthProps & HeightProps>(
  (
    {
      size = {
        width: 16,
        height: 16
      },
      name,
      color = ColorProp.PRIMARY,
      display = 'block',
      ...restProps
    },
    ref
  ) => {
    const theme = useTheme() as AppTheme;
    const path = iconPaths[name]?.path;

    if(!path) return null;
    return React.cloneElement(path, {
      ref,
      width:size.width,
      height:size.height,
      color: (theme.colors as any)[color] || color,
      display: display,
      ...restProps
    });
  }
);

Icon.displayName = 'Icon';
