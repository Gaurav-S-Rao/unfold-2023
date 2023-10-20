import { Box, Button, Card, CircularProgress, Typography } from '@mui/material';
import { ConnectButton, ErrorCode, useWallet } from '@suiet/wallet-kit';
import { enqueueSnackbar } from 'notistack';
import { useCallback, useEffect } from 'react';
import { Connector, useAccount, useConnect } from 'wagmi';

export default function LoginPageViewConnect() {
  const { allAvailableWallets: allAvailableWalletsSui } = useWallet();

  const { connector: connectorEvm, isConnected: isConnectedEvm } = useAccount();
  const {
    connect: connectEvm,
    connectors: connectorsEvm,
    error: errorEvm,
    isLoading: isLoadingEvm,
    pendingConnector: pendingConnectorEvm,
    isError: isErrorEvm,
  } = useConnect();

  const handleOnClickEvm = async (site: Connector<any, any>) => {
    connectEvm({ connector: site });
  };

  useEffect(() => {
    if (isErrorEvm) {
      enqueueSnackbar(errorEvm?.message, { variant: 'error' });
    }
  }, [isErrorEvm, errorEvm]);

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
          Welcome to Reach!
        </Typography>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Expand Reach, Experience Transparency.
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Connect your Wallet and explore the potential of Reach!
      </Typography>
      <Box
        gap={2}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* EVm Wallets */}
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
            Available EVM Wallets
          </Typography>
          {connectorsEvm
            .filter((x) => x.ready && x.id !== connectorEvm?.id)
            .map((walletEvm) => (
              <Box
                key={walletEvm.name}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  p: 2,
                }}
              >
                <img
                  src={`/assets/illustrations/connectors/${walletEvm.name.toLocaleLowerCase()}.png`}
                  width={24}
                  height={24}
                />
                <Typography variant="h6" sx={{ ml: 2 }}>
                  {walletEvm.name}
                </Typography>
              </Box>
            ))}
          <Button
            disabled={isLoadingEvm}
            variant="contained"
            size="large"
            color="primary"
            sx={{
              marginTop: 1,
              width: 284,
              borderRadius: 1.5,
            }}
            onClick={() => handleOnClickEvm(connectorsEvm[0])}
            startIcon={isLoadingEvm ? <CircularProgress size={16} /> : null}
          >
            Connect Evm wallet
          </Button>
        </Card>

        {/* Sui wallets */}

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
            Available Sui Wallets
          </Typography>
          {allAvailableWalletsSui.map((wallet) => (
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
              marginTop: 6,
            }}
            label="Connect Sui Wallet"
          />
        </Card>
      </Box>
    </>
  );
}
