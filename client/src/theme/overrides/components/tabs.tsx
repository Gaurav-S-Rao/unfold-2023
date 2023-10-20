import { Theme } from '@mui/material/styles';
import { tabClasses } from '@mui/material/Tab';

export function tabs(theme: Theme) {
  return {
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: theme.palette.text.primary,
        },
        scrollButtons: {
          width: 46,
          borderRadius: '50%',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          padding: 0,
          opacity: 1,
          minWidth: 46,
          minHeight: 46,
          fontWeight: theme.typography.fontWeightSemiBold,
          '&:not(:last-of-type)': {
            marginRight: theme.spacing(3.2),
            [theme.breakpoints.up('sm')]: {
              marginRight: theme.spacing(5.4),
            },
          },
          [`&:not(.${tabClasses.selected})`]: {
            color: theme.palette.text.secondary,
          },
        },
      },
    },
  };
}
