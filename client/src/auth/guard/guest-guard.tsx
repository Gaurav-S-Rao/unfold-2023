import { useCallback, useEffect } from 'react';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useAuthContext } from '../hooks';
import { useWallet } from '@suiet/wallet-kit';
import { STORAGE_KEY } from 'src/config-global';
import { useLocation } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: Props) {
  const router = useRouter();

  const location = useLocation();

  const returnTo = paths.dashboard.root;

  const { address } = useWallet();

  const { connected, verified, user } = useAuthContext();

  console.log('🚀 ~ file: auth-guard.tsx ~ line 14 ~ AuthGuard ~ connected', connected);
  console.log('🚀 ~ file: auth-guard.tsx ~ line 14 ~ AuthGuard ~ verified', verified);

  const check = useCallback(() => {
    if (sessionStorage.getItem(STORAGE_KEY) || user?.role === null) {
      const registerPath = paths.auth.register;
      if (user?.role === null) {
        router.replace(registerPath);
        return;
      } else {
        router.replace((location.pathname).includes('auth') ? returnTo : location.pathname);
      }
    }
  }, [connected, address, returnTo, router, verified]);

  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
}
