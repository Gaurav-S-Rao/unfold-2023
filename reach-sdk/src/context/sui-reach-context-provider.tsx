import React, { createContext } from "react";

type ContextValue = {
  id: string;
};

export const SuiReachContext = createContext<ContextValue | null>(null);

type CKCPProps = {
  children: React.ReactNode;
  id?: string;
};

export const SuiReachContextProvider: React.FC<CKCPProps> = ({ children }) => {
  if (React.useContext(SuiReachContext)) {
    throw new Error(
      "Multiple, nested usages of SuiReachProvider detected. Please use only one."
    );
  }

  const defaultValues: ContextValue = {
    id: "sui-reach-context-provider",
  };

  return (
    <SuiReachContext.Provider value={defaultValues}>
      {children}
    </SuiReachContext.Provider>
  );
};

export const useSuiReachContext = () => {
  const context = React.useContext(SuiReachContext);
  if (!context) throw Error("SuiReach Hook must be inside a Provider.");
  return context;
};
