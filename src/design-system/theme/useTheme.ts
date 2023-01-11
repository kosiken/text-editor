import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { AppTheme } from './base';

export const useTheme = (): AppTheme => {
  return useContext(ThemeContext);
};
