import { Button, CircularProgress, Paper, Stack, Typography } from '@mui/material';
import { useWallet } from '@suiet/wallet-kit';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useAuthContext } from 'src/auth/hooks';
type Props = {
  isLoading: boolean;
  data?: any;
};

export default function LoginPageViewVerifyContent({ isLoading: isLoadingFetch, data }: Props) {
  const { connected, verified, loading, verify } = useAuthContext();

  const [message, setMessage] = useState<number>(data?.challenge);

  const { account, signMessage, verifySignedMessage, adapter } = useWallet();

  useEffect(() => {
    if (data) {
      setMessage(data.challenge);
    }
  }, [data]);

  async function handleVerify() {
    if (!account) return;

    try {
      const msgBytes = new TextEncoder().encode(message?.toString());
      const result = await signMessage({
        message: msgBytes,
      });
      
      console.log('signature', result?.signature);
      
      const verifyResult = await verifySignedMessage(result, account.publicKey);
      console.log('verify signedMessage', verifyResult);
      if (!verifyResult) {
        enqueueSnackbar('Please sign from the wallet connected', {
          variant: 'error',
        });
      } else {
        await verify(result?.signature);
      }
    } catch (e) {
      console.error('signMessage failed', e);
      enqueueSnackbar('Please Sign the message', {
        variant: 'info',
      });
    }
  }

  return (
    <Paper
      sx={{
        p: 4,
        backgroundColor: 'background.default',
      }}
    >
      <Stack gap={2} direction="column" justifyContent="center" alignItems="center">
        <img src={adapter?.icon} alt={adapter?.name} width={64} height={64} />
        <Typography variant="h5" sx={{ mb: 2 }}>
          {adapter?.name}
        </Typography>
        <Button
          variant="contained"
          sx={{
            minWidth: 200,
          }}
          startIcon={isLoadingFetch ? <CircularProgress size={24} /> : ''}
          disabled={isLoadingFetch || !data}
          onClick={handleVerify}
        >
          Verify
        </Button>
      </Stack>
    </Paper>
  );
}
