import { alpha, Theme } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import { svgIconClasses } from '@mui/material/SvgIcon';
import { paper, menuItem } from '../../css';

export function autocomplete(theme: Theme) {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          [`& span.${autocompleteClasses.tag}`]: {
            ...theme.typography.subtitle2,
            height: 28,
            minWidth: 28,
            lineHeight: '28px',
            textAlign: 'center',
            padding: theme.spacing(0, 0.8),
            color: theme.palette.text.secondary,
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.grey[500], 0.18),
          },
        },
        paper: {
          ...paper({ theme, dropdown: true }),
        },
        listbox: {
          padding: 0,
          [`& .${autocompleteClasses.option}`]: {
            ...menuItem(theme),
          },
        },
        endAdornment: {
          [`& .${svgIconClasses.root}`]: {
            width: 20,
            height: 20,
          },
        },
      },
    },
  };
}
