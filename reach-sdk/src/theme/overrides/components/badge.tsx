import { Theme } from '@mui/material/styles';
import { BadgeProps, badgeClasses } from '@mui/material/Badge';

declare module '@mui/material/Badge' {
  interface BadgePropsVariantOverrides {
    alway: true;
    busy: true;
    online: true;
    offline: true;
    invisible: true;
  }
}

export function badge(theme: Theme) {
  return {
    MuiBadge: {
      styleOverrides: {
        dot: {
          borderRadius: '50%',
        },
        root: ({ ownerState }: { ownerState: BadgeProps }) => {
          const alway = ownerState.variant === 'alway';

          const online = ownerState.variant === 'online';

          const busy = ownerState.variant === 'busy';

          const offline = ownerState.variant === 'offline';

          const invisible = ownerState.variant === 'invisible';

          const baseStyles = {
            [`&.${badgeClasses.invisible}`]: {
              transform: 'unset',
            },
            width: 12,
            zIndex: 10,
            padding: 0,
            height: 12,
            minWidth: 'auto',
            '&:before, &:after': {
              content: "''",
              borderRadius: 1,
              backgroundColor: theme.palette.common.white,
            },
          };

          return {
            ...(online && {
              [`& .${badgeClasses.badge}`]: {
                ...baseStyles,
                backgroundColor: theme.palette.success.main,
              },
            }),
            ...(busy && {
              [`& .${badgeClasses.badge}`]: {
                ...baseStyles,
                backgroundColor: theme.palette.error.main,
                '&:before': { width: 8, height: 4 },
              },
            }),
            ...(offline && {
              [`& .${badgeClasses.badge}`]: {
                ...baseStyles,
                backgroundColor: theme.palette.text.disabled,
                '&:before': {
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                },
              },
            }),
            ...(alway && {
              [`& .${badgeClasses.badge}`]: {
                ...baseStyles,
                backgroundColor: theme.palette.warning.main,
                '&:before': {
                  width: 2.4,
                  height: 4.2,
                  transform: 'translateX(1px) translateY(-1px)',
                },
                '&:after': {
                  width: 2.4,
                  height: 4.2,
                  transform: 'translateY(1px) rotate(125deg)',
                },
              },
            }),
            ...(invisible && {
              [`& .${badgeClasses.badge}`]: {
                display: 'none',
              },
            }),
          };
        },
      },
    },
  };
}
