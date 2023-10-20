import useSWR from 'swr';
import { fetcher, endpoints } from 'src/utils/axios-instance';
import { useEffect } from 'react';
import { useWallet } from '@suiet/wallet-kit';
import { NONCE_TOKEN_KEY } from 'src/config-global';

type UseFetchNonceType = {
  activate: boolean;
  address?: string;
};

const useFetchNonce = ({ activate = false, address }: UseFetchNonceType) => {
  const { address: suiContextAddress } = useWallet();

  const { data, error, isLoading } = useSWR(
    activate
      ? `${endpoints.auth.nonce}?platform=sui&address=${address ?? suiContextAddress}`
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

  return {
    isLoading,
    error,
    data,
  };
};

export default useFetchNonce;
