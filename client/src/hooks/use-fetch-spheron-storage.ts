import { endpoints, fetcher } from 'src/utils/axios-instance';
import useSWR from 'swr';

type IUseFetchSpheronStorage = {
  activate?: boolean;
};

const useFetchSpheronStorage = ({ activate = false }: IUseFetchSpheronStorage) => {
  const { data, error, isLoading } = useSWR(activate ? endpoints.spheronToken.get : null, fetcher, {
    shouldRetryOnError: true,
    errorRetryCount: 5,
    errorRetryInterval: 1000,
  });

  return {
    data,
    error,
    isLoading,
  };
};

export default useFetchSpheronStorage;
