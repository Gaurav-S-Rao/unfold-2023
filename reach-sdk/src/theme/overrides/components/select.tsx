import { Theme } from '@mui/material/styles';

export function select(theme: Theme) {
  return {
    MuiSelect: {
      styleOverrides: {
        icon: {
          right: 12,
          width: 20,
          height: 20,
          top: 'calc(50% - 10px)',
        },
      },
    },
    MuiNativeSelect: {
      styleOverrides: {
        icon: {
          right: 12,
          width: 20,
          height: 20,
          top: 'calc(50% - 10px)',
        },
      },
    },
  };
}
