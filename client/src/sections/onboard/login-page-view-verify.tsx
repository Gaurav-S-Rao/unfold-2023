import { Card, Typography } from '@mui/material';

import { useAuthContext } from 'src/auth/hooks';
import useFetchNonce from 'src/hooks/use-fetch-nonce';
import LoginPageViewVerifyContent from './login-page-view-verify-content';

export default function LoginPageViewVerify() {
  const { connected, verified, loading } = useAuthContext();

  const open = connected && !verified && !loading;

  const { isLoading, data } = useFetchNonce({
    activate: open,
  });

  return (
    <Card
      sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 500,
      }}
    >
      <Typography variant="h4" sx={{ mb: 2 }}>
        Sign in and verify your account to unlock benefits.
      </Typography>

      <LoginPageViewVerifyContent isLoading={isLoading || loading} data={data} />
    </Card>
  );
}
