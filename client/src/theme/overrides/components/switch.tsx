import { Theme, alpha } from '@mui/material/styles';
import { SwitchProps, switchClasses } from '@mui/material/Switch';

export function switches(theme: Theme) {
  const lightMode = theme.palette.mode === 'light';

  const rootStyles = (ownerState: SwitchProps) => ({
    padding: '10px 12px 10px 12px',
    width: 56,
    height: 36,
    ...(ownerState.size === 'small' && {
      padding: '6px 8px 6px 8px',
      width: 38,
      height: 22,
    }),
    [`& .${switchClasses.thumb}`]: {
      width: 16,
      height: 16,
      boxShadow: 'none',
      color: theme.palette.common.white,
      ...(ownerState.size === 'small' && {
        width: 12,
        height: 12,
      }),
    },
    [`& .${switchClasses.track}`]: {
      opacity: 1,
      borderRadius: 18,
      backgroundColor: alpha(theme.palette.grey[500], 0.52),
    },
    [`& .${switchClasses.switchBase}`]: {
      left: 4,
      padding: 16,
      ...(ownerState.size === 'small' && {
        padding: 8,
      }),
      [`&.${switchClasses.checked}`]: {
        transform: 'translateX(16px)',
        [`&+.${switchClasses.track}`]: {
          opacity: 1,
        },
        ...(ownerState.size === 'small' && {
          transform: 'translateX(10px)',
        }),
      },
      [`&.${switchClasses.disabled}`]: {
        [`& .${switchClasses.thumb}`]: {
          opacity: lightMode ? 1 : 0.52,
        },
        [`&+.${switchClasses.track}`]: {
          opacity: 0.52,
        },
      },
    },
  });

  return {
    MuiSwitch: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: SwitchProps }) => rootStyles(ownerState),
      },
    },
  };
}
