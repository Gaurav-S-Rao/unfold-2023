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

  // console.log("data", data?.campaigns[0]?.Advertisement[0])

  const memoizedValue = useMemo(
    () => ({
      adverts: data?.campaigns[0]?.Advertisement[0],
      advertsLoading: isLoading,
      advertsError: error,
      advertsValidating: isValidating,
      advertsEmpty: !isLoading && !data?.length,
    }),
    [data?.campaigns, error, isLoading, isValidating]
  );

  return (
    <ReachDataContext.Provider value={memoizedValue}>
      {children}
    </ReachDataContext.Provider>
  );
}
