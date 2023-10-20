import { Theme } from '@mui/material/styles';

export function breadcrumbs(theme: Theme) {
  return {
    MuiBreadcrumbs: {
      styleOverrides: {
        separator: {
          marginLeft: theme.spacing(1.8),
          marginRight: theme.spacing(1.8),
        },
        li: {
          display: 'inline-flex',
          margin: theme.spacing(0.24, 0),
          '& > *': {
            ...theme.typography.body2,
          },
        },
      },
    },
  };
}
