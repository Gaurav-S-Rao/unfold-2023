import { IAdvertItem } from "./context/reach-data-provider";

export type ReachDataContextProps = {
  adverts: IAdvertItem[];
  advertsLoading: boolean;
  advertsError: any;
  advertsValidating: boolean;
  advertsEmpty: boolean;
};
