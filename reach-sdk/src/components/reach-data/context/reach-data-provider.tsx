import React, { useMemo } from "react";
import { endpoints, fetcher } from "src/utils/axios-instance";
import useSWR from "swr";

import { ReachDataContext } from "./reach-data-context";

export type IAdvertItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
};

export function ReachDataProvider({
  id,
  children,
}: {
  id?: string;
  children?: React.ReactNode;
}) {
  const URL = id && endpoints.clientSdk.get(id);

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      adverts: data["Advertisement"] || [],
      advertsLoading: isLoading,
      advertsError: error,
      advertsValidating: isValidating,
      advertsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return (
    <ReachDataContext.Provider value={memoizedValue}>
      {children}
    </ReachDataContext.Provider>
  );
}
