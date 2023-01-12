import colors, { ColorProp } from './colors';

const breakpoints =['544px', '768px', '1012px', '1280px'];
export const shadows = {
    none: '0 0 0',
    sm: '0px 1px 2px rgba(33, 163, 116, 0.1)',
    md: '0px 2px 4px rgba(33, 163, 116, 0.1)',
    xmd: '0px 4px 8px rgba(33, 163, 116, 0.1)',
    lg: '0px 6px 16px rgba(33, 163, 116, 0.1)',
    xlg: '0px 8px 24px rgba(33, 163, 116, 0.1)'
  };

/**
 * This theme object contains colors, shadows
 * and other utilites we use in styling out application
 */
const theme = {
    breakpoints,
    colors,
    shadows,
  };

export type AppTheme = typeof theme;

/**
 * 
 * @param c The color to load
 * @param t The current theme in use
 * @returns A color from the theme if found or just the initial color passed
 */
export const getThemeColor = (c: ColorProp, t: AppTheme) => {
  const color = t.colors[c];
  return color || c;
}
export const baseTheme = theme;
