import { Container } from '@mui/material';
import LoginPageViewConnect from '../login-page-view-connect';
import LoginPageViewVerify from '../login-page-view-verify';
import { useAuthContext } from 'src/auth/hooks';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { useEffect } from 'react';

export default function LoginPageView() {
  const { connected, verified, user } = useAuthContext();

  const { push } = useRouter();
  console.log('🚀 ~ file: login-view.tsx ~ line 14 ~ LoginPageView ~ user', user);

  useEffect(() => {
    if (connected && verified && user?.role === null) {
      push(paths.auth.register);
    }
  }, [connected, verified, user]);

  return (
    <>
      {/* Style the box to remain on the center */}
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 172px)',
        }}
      >
        {!connected && !verified && <LoginPageViewConnect />}

        {connected && !verified && <LoginPageViewVerify />}

        {/* {connected && verified && user?.role === null && <LoginPageViewOnBoard />} */}
      </Container>
    </>
  );
}
