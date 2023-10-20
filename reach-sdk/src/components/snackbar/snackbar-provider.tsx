import { useRef } from 'react';
import { SnackbarProvider as NotistackProvider, closeSnackbar } from 'notistack';
import IconButton from '@mui/material/IconButton';
import Iconify from '../iconify';
import { StyledIcon, StyledNotistack } from './styles';

type Props = {
  children: React.ReactNode;
};

export default function SnackbarProvider({ children }: Props) {
  const notistackRef = useRef<any>(null);

  return (
    <NotistackProvider
      ref={notistackRef}
      maxSnack={5}
      preventDuplicate
      autoHideDuration={3000}
      variant="success"
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      iconVariant={{
        info: (
          <StyledIcon color="info">
            <Iconify icon="eva:info-fill" width={32} />
          </StyledIcon>
        ),
        success: (
          <StyledIcon color="success">
            <Iconify icon="eva:checkmark-circle-2-fill" width={32} />
          </StyledIcon>
        ),
        warning: (
          <StyledIcon color="warning">
            <Iconify icon="eva:alert-triangle-fill" width={32} />
          </StyledIcon>
        ),
        error: (
          <StyledIcon color="error">
            <Iconify icon="solar:danger-bold" width={32} />
          </StyledIcon>
        ),
      }}
      Components={{
        default: StyledNotistack,
        info: StyledNotistack,
        success: StyledNotistack,
        warning: StyledNotistack,
        error: StyledNotistack,
      }}
      // with close as default
      action={(snackbarId) => (
        <IconButton size="small" onClick={() => closeSnackbar(snackbarId)} sx={{ p: 0.8 }}>
          <Iconify width={24} icon="mingcute:close-line" />
        </IconButton>
      )}
    >
      {children}
    </NotistackProvider>
  );
}
