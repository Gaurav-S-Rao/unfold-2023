import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { useAuthContext } from '../hooks';

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const router = useRouter();

  const { connected, verified, user, disconnect } = useAuthContext();

  console.log('🚀 ~ file: auth-guard.tsx ~ line 14 ~ AuthGuard ~ user', user);

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if ((!connected && !verified) || user?.role === null) {
      const loginPath = paths.auth.login;
      const registerPath = paths.auth.register;

      if (user?.role === null) {
        router.replace(registerPath);
        return;
      }

      if (!connected && !verified) {
        router.replace(loginPath);
      }
    } else {
      setChecked(true);
    }
  }, [connected, verified, router, checked]);

  useEffect(() => {
    check();
  }, [connected, verified, user]);

  return <>{children}</>;
}
