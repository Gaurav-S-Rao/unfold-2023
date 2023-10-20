import { alpha, Theme } from '@mui/material/styles';
import { AvatarProps } from '@mui/material/Avatar';
import { avatarGroupClasses, AvatarGroupProps } from '@mui/material/AvatarGroup';

const COLORS = ['default', 'primary', 'secondary', 'info', 'success', 'warning', 'error'] as const;

const colorByName = (name: string) => {
  return 'default';
};

declare module '@mui/material/AvatarGroup' {
  interface AvatarGroupPropsVariantOverrides {
    compact: true;
  }
}

export function avatar(theme: Theme) {
  return {
    MuiAvatar: {
      variants: COLORS.map((color) =>
        color === 'default'
          ? {
              props: { color: 'default' },
              style: {
                color: theme.palette.text.secondary,
                backgroundColor: alpha(theme.palette.grey[500], 0.28),
              },
            }
          : {
              props: { color },
              style: {
                color: theme.palette[color].contrastText,
                backgroundColor: theme.palette[color].main,
              },
            }
      ),

      styleOverrides: {
        rounded: {
          borderRadius: theme.shape.borderRadius * 1.6,
        },
        colorDefault: ({ ownerState }: { ownerState: AvatarProps }) => {
          const color = colorByName(`${ownerState.alt}`);

          return {
            ...(!!ownerState.alt && {
              ...(color !== 'default'
                ? {
                    color: theme.palette[color].contrastText,
                    backgroundColor: theme.palette[color].main,
                  }
                : {
                    color: theme.palette.text.secondary,
                    backgroundColor: alpha(theme.palette.grey[500], 0.28),
                  }),
            }),
          };
        },
      },
    },
    MuiAvatarGroup: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: AvatarGroupProps }) => ({
          justifyContent: 'flex-end',
          ...(ownerState.variant === 'compact' && {
            width: 42,
            height: 42,
            position: 'relative',
            [`& .${avatarGroupClasses.avatar}`]: {
              margin: 0,
              width: 24,
              height: 24,
              position: 'absolute',
              '&:first-of-type': {
                left: 0,
                bottom: 0,
                zIndex: 9,
              },
              '&:last-of-type': {
                top: 0,
                right: 0,
              },
            },
          }),
        }),
        avatar: {
          fontSize: 18,
          fontWeight: theme.typography.fontWeightSemiBold,
          '&:first-of-type': {
            fontSize: 12,
            color: theme.palette.primary.dark,
            backgroundColor: theme.palette.primary.lighter,
          },
        },
      },
    },
  };
}