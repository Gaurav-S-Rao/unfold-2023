import { alpha, Theme } from '@mui/material/styles';

export function backdrop(theme: Theme) {
  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(theme.palette.grey[900], 0.6),
        },
        invisible: {
          background: 'transparent',
        },
      },
    },
  };
}
