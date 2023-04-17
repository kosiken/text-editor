import styled from 'styled-components';
import { space, textStyle, typography, display, color, textAlign, letterSpacing, compose, margin, fontSize, SpaceProps, FontSizeProps, TextAlignProps, FontWeightProps, LetterSpacingProps, fontWeight } from 'styled-system';
import { baseTheme, ColorProp } from '../../theme';
import { getThemeColor } from '../../theme';

export type TextProps = Omit<React.ButtonHTMLAttributes<HTMLParagraphElement | HTMLSpanElement>, 'style'> & FontSizeProps & SpaceProps & FontWeightProps & TextAlignProps & LetterSpacingProps;

const styledProps = compose(color, space, textStyle, typography, letterSpacing, display, margin, fontWeight, fontSize, textAlign);

export const Text = styled.p<TextProps >`
  color: ${(props) => getThemeColor((props.color || 'black') as ColorProp, props.theme)};
  ${styledProps};
`;

Text.defaultProps = {
  theme: baseTheme,
  fontSize: '16px',
  color: 'inherit',
  margin: 0
};

export default Text;
