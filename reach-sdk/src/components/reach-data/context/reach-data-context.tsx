import { createContext, useContext } from "react";
import { ReachDataContextProps } from "../types";

export const ReachDataContext = createContext({} as ReachDataContextProps);

export const useReachDataContext = () => {
  const context = useContext(ReachDataContext);

  if (!context)
    throw new Error("use Settings Context must be use inside SettingsProvider");

  return context;
};
