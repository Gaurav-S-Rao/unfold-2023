import { MaterialDesignContent } from 'notistack';
// @mui
import { styled, alpha } from '@mui/material/styles';

export const StyledNotistack = styled(MaterialDesignContent)(({ theme }) => {
  const isLight = theme.palette.mode === 'light';

  return {
    '& #notistack-snackbar': {
      ...theme.typography.subtitle2,
      padding: 0,
      flexGrow: 1,
    },
    '&.notistack-MuiContent': {
      padding: theme.spacing(0.8),
      paddingRight: theme.spacing(2.4),
      color: theme.palette.text.primary,
      boxShadow: theme.customShadows.z8,
      borderRadius: theme.shape.borderRadius + 50,
      backgroundColor: theme.palette.background.paper,
    },
    '&.notistack-MuiContent-default': {
      padding: theme.spacing(1),
      color: isLight ? theme.palette.common.white : theme.palette.grey[800],
      backgroundColor: isLight ? theme.palette.grey[800] : theme.palette.common.white,
    },
  };
});

type StyledIconProps = {
  color: 'info' | 'success' | 'warning' | 'error';
};

export const StyledIcon = styled('span')<StyledIconProps>(({ color, theme }) => ({
  width: 48,
  height: 48,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(1.5),
  color: theme.palette[color].main,
  borderRadius: theme.shape.borderRadius + 50,
  backgroundColor: alpha(theme.palette[color].main, 0.16),
}));
