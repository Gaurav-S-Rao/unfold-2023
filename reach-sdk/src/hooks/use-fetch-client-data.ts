import { endpoints, fetcher } from "src/utils/axios-instance";
import useSWR from "swr";

export function useFetchClientData({ id }: { id?: string }) {
  const URL = id && endpoints.clientSdk.get(id);

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  return {
    clientSdk: data,
    clientSdkLoading: isLoading,
    clientSdkError: error,
    clientSdkValidating: isValidating,
    clientSdkEmpty: !isLoading && !data?.length,
  };
}
