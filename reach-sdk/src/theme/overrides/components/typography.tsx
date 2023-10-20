import { Theme } from '@mui/material/styles';

export function typography(theme: Theme) {
  return {
    MuiTypography: {
      styleOverrides: {
        paragraph: {
          marginBottom: theme.spacing(1.8),
        },
        gutterBottom: {
          marginBottom: theme.spacing(1.2),
        },
      },
    },
  };
}
