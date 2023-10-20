import useSWR from 'swr';
import { fetcher, endpoints } from 'src/utils/axios-instance';
import { useEffect, useMemo } from 'react';
import { useWallet } from '@suiet/wallet-kit';
import { NONCE_TOKEN_KEY } from 'src/config-global';
import { useAuthContext } from 'src/auth/hooks';

type UseFetchNonceType = {
  activate: boolean;
  address?: string;
};

const useFetchNonce = ({ activate = false, address }: UseFetchNonceType) => {
  const { address: addressContext } = useAuthContext();

  const { address: suiContextAddress } = useWallet();

  const { data, error, isLoading } = useSWR(
    activate
      ? `${endpoints.auth.nonce}?platform=${addressContext?.evm ? 'evm' : 'sui'}&address=${
          address ?? addressContext?.sui ? suiContextAddress : addressContext?.evm
        }`
      : null,
    fetcher,
    {
      shouldRetryOnError: true,
      errorRetryCount: 5,
      errorRetryInterval: 1000,
    }
  );

  useEffect(() => {
    if (data?.token) {
      sessionStorage.setItem(NONCE_TOKEN_KEY, data.token);
    }
  }, [data]);

  console.log('data', data);

  return {
    isLoading,
    error,
    data,
  };
};

export default useFetchNonce;
