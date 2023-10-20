import React from "react";
import { SuiReachContextProvider } from "src/context/sui-reach-context-provider";
import SuiReachProviderApp from "./sui-reach-provider-app";

type SuireachProviderProps = {
  children: React.ReactNode;
};

const SuireachProvider: React.FC<SuireachProviderProps> = ({ children }) => {
  return (
    <SuiReachContextProvider>
      <SuiReachProviderApp>{children}</SuiReachProviderApp>
    </SuiReachContextProvider>
  );
};

export default SuireachProvider;
