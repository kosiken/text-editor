import styled from 'styled-components';
import { space, textStyle, typography, display, color, textAlign, compose, margin, fontSize, SpaceProps, FontSizeProps, TextAlignProps, FontWeightProps, fontWeight } from 'styled-system';
import { baseTheme, ColorProp } from '../../theme';
import { getThemeColor } from '../../theme';

export type TextProps = React.ButtonHTMLAttributes<HTMLParagraphElement | HTMLSpanElement> & FontSizeProps & SpaceProps & FontWeightProps & TextAlignProps;

const styledProps = compose(color, space, textStyle, typography, display, margin, fontWeight, fontSize, textAlign);

export const Text = styled.p<TextProps >`
  color: ${(props) => getThemeColor((props.color || 'black') as ColorProp, props.theme)};
  ${styledProps};
`;

Text.defaultProps = {
  theme: baseTheme,
  fontSize: '16px',
  color: 'inherit',
};

export default Text;
