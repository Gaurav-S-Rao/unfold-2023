import { Theme } from '@mui/material/styles';
import { loadingButtonClasses, LoadingButtonProps } from '@mui/lab/LoadingButton';

export function loadingButton(theme: Theme) {
  return {
    MuiLoadingButton: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: LoadingButtonProps }) => ({
          ...(ownerState.variant === 'soft' && {
            [`& .${loadingButtonClasses.loadingIndicatorStart}`]: {
              left: 12,
            },
            [`& .${loadingButtonClasses.loadingIndicatorEnd}`]: {
              right: 16,
            },
            ...(ownerState.size === 'small' && {
              [`& .${loadingButtonClasses.loadingIndicatorStart}`]: {
                left: 12,
              },
              [`& .${loadingButtonClasses.loadingIndicatorEnd}`]: {
                right: 12,
              },
            }),
          }),
        }),
      },
    },
  };
}
