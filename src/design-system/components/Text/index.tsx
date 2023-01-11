import styled from 'styled-components';
import { space, textStyle, typography, display, color, compose, margin, fontSize, SpaceProps, FontSizeProps, FontWeightProps, fontWeight } from 'styled-system';
import { baseTheme, ColorProp } from '../../theme';
import { getThemeColor } from '../../theme';

export type TextProps = React.ButtonHTMLAttributes<HTMLParagraphElement | HTMLSpanElement> & FontSizeProps & SpaceProps & FontWeightProps;

const styledProps = compose(color, space, textStyle, typography, display, margin, fontWeight, fontSize);



export const Text = styled.p<TextProps >`
  color: ${(props) => getThemeColor((props.color || 'black') as ColorProp, props.theme)};
 
  ${styledProps};
`;

Text.defaultProps = {
  theme: baseTheme,
  fontSize: "16px"
 
};

export default Text;
