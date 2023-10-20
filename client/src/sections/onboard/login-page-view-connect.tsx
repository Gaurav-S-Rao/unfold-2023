import { Box, Card, Typography } from '@mui/material';
import { ConnectButton, ErrorCode, useWallet } from '@suiet/wallet-kit';
import { enqueueSnackbar } from 'notistack';

export default function LoginPageViewConnect() {
  const { allAvailableWallets } = useWallet();

  console.log(
    '🚀 ~ file: login-page-view-connect.tsx ~ line 15 ~ LoginPageViewConnect ~ allAvailableWallets',
    allAvailableWallets
  );

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: 300,
          minHeight: 200,
          p: 2,
          mb: 4,
        }}
      >
        <Typography variant="h2" sx={{ mb: 2 }}>
          Welcome to Sui Reach!
        </Typography>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Expand Reach, Experience Transparency.
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Connect your Sui Wallet and explore the potential of Sui Reach!
      </Typography>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: 300,
          minHeight: 200,
          p: 2,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Available Wallets
        </Typography>
        {allAvailableWallets.map((wallet) => (
          <Box
            key={wallet.name}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              p: 2,
            }}
          >
            <img src={wallet.iconUrl} width={24} height={24} />
            <Typography variant="h6" sx={{ ml: 2 }}>
              {wallet.name}
            </Typography>
          </Box>
        ))}
        <ConnectButton
          onConnectError={(error) => {
            if (error.code === ErrorCode.WALLET__CONNECT_ERROR__USER_REJECTED) {
              enqueueSnackbar('User rejected', { variant: 'error' });
            } else {
              enqueueSnackbar(error.message, { variant: 'error' });
            }
          }}
          style={{
            marginTop: 16,
          }}
          label="Connect Wallet"
        />
      </Card>
    </>
  );
}
