import { AppBar, Box, Divider, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import Logo from 'src/components/logo';
import { useSettingsContext } from 'src/components/settings';
import ToggleMode from '../_common/toggle-mode';
import Iconify from 'src/components/iconify';
import { ConnectButton, useWallet } from '@suiet/wallet-kit';
import { useAuthContext } from 'src/auth/hooks';
import { useAccount } from 'wagmi';
import { ChainSelector } from 'src/components/chain-selector';

export default function Header() {
  const settings = useSettingsContext();

  const { isConnected: isConnectedWagmi } = useAccount();

  const { chain, connected, adapter } = useWallet();

  const { user } = useAuthContext();

  const { disconnect } = useAuthContext();

  console.log('🚀 ~ file: header.tsx ~ line 37 ~ Header ~ adapter', adapter?.name);

  return (
    <>
      <AppBar position="static">
        <Toolbar
          sx={{
            px: { lg: 5 },
            mt: 1,
          }}
        >
          <Box
            gap={2}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexGrow: 1,
            }}
          >
            <Logo type="full" />

            <Divider
              orientation="vertical"
              flexItem
              sx={{
                border: '1px solid #fff',
                maxHeight: 40,
              }}
            />

            <Typography
              variant="h3"
              sx={{
                textAlign: 'flex-start',
                color: 'text.primary',
              }}
            >
              {user?.role}
            </Typography>
          </Box>

          <Stack
            flexGrow={1}
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            spacing={{ xs: 0.5, sm: 1 }}
          >
            {chain && connected && (
              <>
                <Iconify
                  icon="entypo:dot-single"
                  width={24}
                  height={24}
                  style={{
                    color: '#00ff00',
                  }}
                />
                <Typography>{chain.name}</Typography>
                <ConnectButton
                  style={{
                    marginLeft: 16,
                  }}
                  onDisconnectSuccess={() => {
                    console.log(
                      '🚀 ~ file: header.tsx ~ line 65 ~ Header ~ onDisconnectSuccess ~ disconnect'
                    );
                    disconnect();

                    window.location.reload();
                  }}
                />
              </>
            )}

            {isConnectedWagmi && <ChainSelector />}

            <ToggleMode
              value={settings.themeMode}
              onChange={(newValue: string) => settings.onUpdate('themeMode', newValue)}
              options={['light', 'dark']}
              icons={['sun', 'moon']}
            />

            <IconButton>
              <Iconify icon="icon-park-outline:help" width={24} height={24} />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
}
