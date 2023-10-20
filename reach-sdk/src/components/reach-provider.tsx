import React from "react";
import { SuiReachContextProvider } from "src/context/sui-reach-context-provider";
import SuiReachProviderApp from "./reach-provider-app";

type ProviderProps = {
  children: React.ReactNode;
  clientId?: string;
};

const SuireachProvider: React.FC<ProviderProps> = ({ children, clientId }) => {
  return (
    <SuiReachContextProvider>
      <SuiReachProviderApp>{children}</SuiReachProviderApp>
    </SuiReachContextProvider>
  );
};

export default SuireachProvider;
