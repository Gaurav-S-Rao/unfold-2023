import { Theme } from '@mui/material/styles';
import { DialogProps } from '@mui/material/Dialog';

export function dialog(theme: Theme) {
  return {
    MuiDialog: {
      styleOverrides: {
        paper: ({ ownerState }: { ownerState: DialogProps }) => ({
          boxShadow: theme.customShadows.dialog,
          borderRadius: theme.shape.borderRadius * 1.8,
          ...(!ownerState.fullScreen && {
            margin: theme.spacing(1.8),
          }),
        }),
        paperFullScreen: {
          borderRadius: 0,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: theme.spacing(2.6),
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(0, 2.6),
        },
        dividers: {
          borderTop: 0,
          borderBottomStyle: 'dashed',
          paddingBottom: theme.spacing(2.6),
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: theme.spacing(2.6),
          '& > :not(:first-of-type)': {
            marginLeft: theme.spacing(1.2),
          },
        },
      },
    },
  };
}
