const siteBaseColors = {
    green: '#0A7227',
    red:'#B92716',
    darkOrange: '#C7511F',
    yellow: '#FFD814',
    darkGreen: '#168342',
    teal: '#007185',
    darkGrey: '#808080',
    darkerGrey: '#6A6A6A',
    black: '#454545',
    white: '#FFFFFF',
    backgroundColor: '#D1D4CF',
    transparent: 'transparent',
  };


  export enum ColorProp {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    WARNING = 'warning',
    SUCCESS = 'success',
    ERROR = 'error',
    TRANSPARENT = 'transparent',
    BACKGROUND_COLOR = 'backgroundColor',
    ACTIVE = 'active',
    HOVER = 'hover',
    DEFAULT = 'default',
  }

  export const aliases = {
    [ColorProp.PRIMARY]: siteBaseColors.green,
    [ColorProp.SECONDARY]: siteBaseColors.teal,
    [ColorProp.WARNING]: siteBaseColors.darkOrange,
    [ColorProp.SUCCESS]: siteBaseColors.green,
    [ColorProp.ERROR]: siteBaseColors.red,
    [ColorProp.ACTIVE]: siteBaseColors.darkOrange,
    [ColorProp.HOVER]: siteBaseColors.black,
    [ColorProp.DEFAULT]: siteBaseColors.darkGrey,
    [ColorProp.TRANSPARENT]: siteBaseColors.transparent,
    [ColorProp.BACKGROUND_COLOR]: siteBaseColors.backgroundColor
  };


const colors = {
    ...siteBaseColors,
    ...aliases
  };
  
export type Colors = typeof colors;
  
export default colors;
  
