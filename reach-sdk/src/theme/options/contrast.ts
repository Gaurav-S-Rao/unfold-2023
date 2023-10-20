import { customShadows } from '../custom-shadows';
import { palette } from '../palette';

export function contrast(contrastBold: boolean, mode: 'light' | 'dark') {
  const theme = {
    ...(contrastBold &&
      mode === 'light' && {
        palette: {
          background: {
            default: palette(mode).grey[100],
          },
        },
      }),
  };

  const components = {
    ...(contrastBold && {
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: customShadows(mode).z1,
          },
        },
      },
    }),
  };

  return {
    theme,
    components,
  };
}
