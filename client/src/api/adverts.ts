import { useMemo } from 'react';
import { IAdvertItem } from 'src/types/adverts';
import { endpoints, fetcher } from 'src/utils/axios-instance';
import useSWR from 'swr';

export function useGetAdverts() {
  const URL = endpoints.adverts.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      adverts: (data as IAdvertItem[]) || [],
      advertsLoading: isLoading,
      advertsError: error,
      advertsValidating: isValidating,
      advertsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
