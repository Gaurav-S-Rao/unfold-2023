import { alpha, Theme } from '@mui/material/styles';
import { ratingClasses } from '@mui/material/Rating';
import { svgIconClasses } from '@mui/material/SvgIcon';

export function rating(theme: Theme) {
  return {
    MuiRating: {
      styleOverrides: {
        root: {
          [`&.${ratingClasses.disabled}`]: {
            opacity: 0.52,
          },
        },
        iconEmpty: {
          color: alpha(theme.palette.grey[500], 0.52),
        },
        sizeSmall: {
          [`& .${svgIconClasses.root}`]: {
            width: 18,
            height: 18,
          },
        },
        sizeMedium: {
          [`& .${svgIconClasses.root}`]: {
            width: 22,
            height: 22,
          },
        },
        sizeLarge: {
          [`& .${svgIconClasses.root}`]: {
            width: 26,
            height: 26,
          },
        },
      },
    },
  };
}
