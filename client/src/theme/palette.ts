import { alpha } from '@mui/material/styles';

export type ColorSchema = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    neutral: string;
  }
  interface SimplePaletteColorOptions {
    lighter: string;
    darker: string;
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
  }
}

const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFC',
  200: '#F4F6F9',
  300: '#DFE3E9',
  400: '#C4CDD6',
  500: '#919EAC',
  600: '#637383',
  700: '#454F5C',
  800: '#212B37',
  900: '#161C26',
};

const PRIMARY = {
  lighter: '#EAF7FF',
  light: '#C0E6FF',
  main: '#4CA2FF',
  dark: '#3775B8',
  darker: '#244C78',
  contrastText: '#FFFFFF',
};

const SECONDARY = {
  lighter: '#0692FA',
  light: '#046CB8',
  main: '#034B80',
  dark: '#022D4D',
  darker: '#011829',
  contrastText: '#FFFFFF',
};

const INFO = {
  lighter: '#CAFDF6',
  light: '#61F3F5',
  main: '#00B8D7',
  dark: '#006C9D',
  darker: '#003769',
  contrastText: '#FFFFFF',
};

const SUCCESS = {
  lighter: '#D3FCD3',
  light: '#77ED8C',
  main: '#22C55D',
  dark: '#118D58',
  darker: '#065E47',
  contrastText: '#ffffff',
};

const WARNING = {
  lighter: '#FFF5CD',
  light: '#FFD667',
  main: '#FFAB01',
  dark: '#B76E01',
  darker: '#7A4101',
  contrastText: GREY[800],
};

const ERROR = {
  lighter: '#FFE9D7',
  light: '#FFAC83',
  main: '#FF5631',
  dark: '#B71D19',
  darker: '#7A0917',
  contrastText: '#FFFFFF',
};

const COMMON = {
  common: {
    black: '#000000',
    white: '#FAFAFA',
  },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[500], 0.2),
  action: {
    hover: alpha(GREY[500], 0.1),
    selected: alpha(GREY[500], 0.18),
    disabled: alpha(GREY[500], 0.82),
    disabledBackground: alpha(GREY[500], 0.26),
    focus: alpha(GREY[500], 0.26),
    hoverOpacity: 0.1,
    disabledOpacity: 0.5,
  },
};

export function palette(mode: 'light' | 'dark') {
  const light = {
    ...COMMON,
    mode: 'light',
    text: {
      primary: GREY[800],
      secondary: GREY[600],
      disabled: GREY[500],
    },
    background: {
      paper: '#FFFFFF',
      default: '#FFFFFF',
      neutral: GREY[200],
    },
    action: {
      ...COMMON.action,
      active: GREY[600],
    },
  };

  const dark = {
    ...COMMON,
    mode: 'dark',
    text: {
      primary: '#FFFFFF',
      secondary: GREY[500],
      disabled: GREY[600],
    },
    background: {
      paper: GREY[800],
      default: GREY[900],
      neutral: alpha(GREY[500], 0.16),
    },
    action: {
      ...COMMON.action,
      active: GREY[500],
    },
  };

  return mode === 'light' ? light : dark;
}
