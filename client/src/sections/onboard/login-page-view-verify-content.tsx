import { Button, CircularProgress, Paper, Stack, Typography } from '@mui/material';
import { useWallet } from '@suiet/wallet-kit';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useAuthContext } from 'src/auth/hooks';
import { Address, recoverMessageAddress } from 'viem';
import { useAccount, useSignMessage } from 'wagmi';
type Props = {
  isLoading: boolean;
  data?: any;
};

export default function LoginPageViewVerifyContent({ isLoading: isLoadingFetch, data }: Props) {
  const { connected, verified, loading, verify, user } = useAuthContext();

  const [message, setMessage] = useState<number>(data?.challenge);

  const [recoveredAddress, setRecoveredAddress] = useState<Address>();

  const { account, signMessage: signMessageSui, verifySignedMessage, adapter } = useWallet();

  const { address: addressWagmi } = useAccount();

  const {
    data: signatureWagmi,
    signMessage: signMessageWagmi,
    variables,
    error,
  } = useSignMessage();

  useEffect(() => {
    if (data) {
      setMessage(data.challenge);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  }, [error]);

  async function handleVerify(e: React.MouseEvent<HTMLButtonElement>) {
    if (!addressWagmi) {
      if (!account) return;
      try {
        const msgBytes = new TextEncoder().encode(message?.toString());
        const result = await signMessageSui({
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
    } else {
      if (!addressWagmi) return;
      // if (!data.message) return;

      // if (isLoadingFetch) return;

      signMessageWagmi({ message: message.toString() });
    }
  }

  useEffect(() => {
    if (!addressWagmi) return;

    (async () => {
      if (variables?.message && signatureWagmi) {
        const _recoveredAddress = await recoverMessageAddress({
          message: variables?.message,
          signature: signatureWagmi,
        });

        setRecoveredAddress(_recoveredAddress);
      }
    })();
  }, [signatureWagmi, variables?.message]);

  useEffect(() => {
    if (!addressWagmi) return;
    (async () => {
      if (!signatureWagmi) return;

      if (!recoveredAddress) return;

      if (recoveredAddress === addressWagmi) {
        await verify(signatureWagmi)
          .then(() => {
            enqueueSnackbar('Verification Success', { variant: 'success' });
          })
          .catch((err) => {
            console.log('err: ', err);
          });
      } else {
        enqueueSnackbar('Addresses not matched', { variant: 'error' });
      }
    })();
  }, [signatureWagmi, recoveredAddress]);

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
