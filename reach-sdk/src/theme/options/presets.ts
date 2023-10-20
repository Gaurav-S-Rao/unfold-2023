// @mui
import { alpha } from '@mui/material/styles';
// theme
import { palette as themePalette } from 'src/theme/palette';

export function presets(presetsColor: string) {
  const primary = primaryPresets.find((i) => i.name === presetsColor);

  const theme = {
    palette: {
      primary,
    },
    customShadows: {
      primary: `0 8px 16px 0 ${alpha(`${primary?.main}`, 0.24)}`,
    },
  };

  return theme;
}

const palette = themePalette('light');

export const primaryPresets = [
  {
    name: 'default',
    ...palette.primary,
  },
  {
    name: 'cyan',
    lighter: '#CCF4FD',
    light: '#68CDF8',
    main: '#078DED',
    dark: '#0351AA',
    darker: '#012973',
    contrastText: '#FAFAFA',
  },
  {
    name: 'purple',
    lighter: '#EBD6FC',
    light: '#B985F3',
    main: '#7635db',
    dark: '#431A9d',
    darker: '#200A68',
    contrastText: '#FAFAFA',
  },
  {
    name: 'blue',
    lighter: '#D1E9FB',
    light: '#76B0F0',
    main: '#2065D0',
    dark: '#103997',
    darker: '#061B65',
    contrastText: '#FAFAFA',
  },
  {
    name: 'orange',
    lighter: '#FEF4D3',
    light: '#FED681',
    main: '#fda92e',
    dark: '#B66817',
    darker: '#793909',
    contrastText: palette.grey[800],
  },
  {
    name: 'red',
    lighter: '#FFE3D6',
    light: '#FFC1AD',
    main: '#FF3031',
    dark: '#B71834',
    darker: '#7A0931',
    contrastText: '#FAFAFA',
  },
];
