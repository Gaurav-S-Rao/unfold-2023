import { Theme, alpha } from '@mui/material/styles';
import { LinearProgressProps, linearProgressClasses } from '@mui/material/LinearProgress';

const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'] as const;

export function progress(theme: Theme) {
  const rootStyles = (ownerState: LinearProgressProps) => {
    const bufferVariant = ownerState.variant === 'buffer';

    const defaultStyle = {
      borderRadius: 8,
      [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 8,
      },
      ...(bufferVariant && {
        backgroundColor: 'transparent',
      }),
    };

    const colorStyle = COLORS.map((color) => ({
      ...(ownerState.color === color && {
        backgroundColor: alpha(theme.palette[color].main, 0.26),
      }),
    }));

    return [defaultStyle, ...colorStyle];
  };

  return {
    MuiLinearProgress: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: LinearProgressProps }) => rootStyles(ownerState),
      },
    },
  };
}
