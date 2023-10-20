export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthUserType = null | Record<string, any>;

export type AddressUserType = null | Record<string, any>;

export type AuthStateType = {
  user: AuthUserType;
  address: AddressUserType;
  loading: boolean;
  connected: boolean;
  verified: boolean;
  platform: 'sui' | 'evm' | null;
};

export type ContextType = {
  user: AuthUserType;
  address: AddressUserType;
  loading: boolean;
  connected: boolean;
  verified: boolean;
  //
  connect: () => void;
  verify: (signature: string) => Promise<void>;
  disconnect: () => Promise<void>;
};
