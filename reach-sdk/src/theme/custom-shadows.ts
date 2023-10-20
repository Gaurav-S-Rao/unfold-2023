import { alpha } from '@mui/material/styles';
import { palette as themePalette } from './palette';

interface CustomShadowOptions {
  z1: string;
  z4: string;
  z8: string;
  z12: string;
  z16: string;
  z20: string;
  z24: string;
  primary: string;
  secondary: string;
  info: string;
  success: string;
  warning: string;
  error: string;
  card: string;
  dialog: string;
  dropdown: string;
}

declare module '@mui/material/styles' {
  interface Theme {
    customShadows: CustomShadowOptions;
  }
  interface ThemeOptions {
    customShadows?: CustomShadowOptions;
  }
}

const palette = themePalette('light');

const LIGHT_MODE = palette.grey[500];

const DARK_MODE = palette.common.black;

function createShadow(color: string) {
  const transparent = alpha(color, 0.16);
  return {
    z1: `0 1px 2px 0 ${transparent}`,
    z4: `0 6px 10px 0 ${transparent}`,
    z8: `0 8px 16px 0 ${transparent}`,
    z12: `0 14px 26px -6px ${transparent}`,
    z16: `0 18px 34px -6px ${transparent}`,
    z20: `0 21px 42px -6px ${transparent}`,
    z24: `0 26px 52px 0 ${transparent}`,
    //
    card: `0 0 2px 0 ${alpha(color, 0.2)}, 0 11px 22px -6px ${alpha(color, 0.14)}`,
    dropdown: `0 0 2px 0 ${alpha(color, 0.26)}, -21px 21px 42px -6px ${alpha(color, 0.26)}`,
    dialog: `-42px 42px 84px -10px ${alpha(palette.common.black, 0.26)}`,
    //
    primary: `0 10px 18px 0 ${alpha(palette.primary.main, 0.26)}`,
    info: `0 10px 18px 0 ${alpha(palette.info.main, 0.26)}`,
    secondary: `0 10px 18px 0 ${alpha(palette.secondary.main, 0.26)}`,
    success: `0 10px 18px 0 ${alpha(palette.success.main, 0.26)}`,
    warning: `0 10px 18px 0 ${alpha(palette.warning.main, 0.26)}`,
    error: `0 10px 18px 0 ${alpha(palette.error.main, 0.26)}`,
  };
}

export function customShadows(mode: 'light' | 'dark') {
  return mode === 'light' ? createShadow(LIGHT_MODE) : createShadow(DARK_MODE);
}
