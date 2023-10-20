import { Theme } from '@mui/material/styles';

export function svgIcon(theme: Theme) {
  return {
    MuiSvgIcon: {
      styleOverrides: {
        fontSizeLarge: {
          width: 36,
          height: 36,
          fontSize: 'inherit',
        },
      },
    },
  };
}
