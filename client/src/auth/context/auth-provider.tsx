import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { AuthContext } from 'src/auth/context/auth-context';
import { ActionMapType, AddressUserType, AuthStateType, AuthUserType } from '../types';
import { isValidToken, setSession, jwtDecode } from './utils';

import axios, { endpoints } from 'src/utils/axios-instance';
// import { useMockedUser } from 'src/hooks/use-mocked-user';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { enqueueSnackbar } from 'notistack';
import { useWallet } from '@suiet/wallet-kit';
import { STORAGE_KEY, NONCE_TOKEN_KEY } from 'src/config-global';

type Props = {
  children: React.ReactNode;
};

enum Types {
  INITIAL = 'INITIAL',
  CONNECT = 'CONNECT',
  VERIFY = 'VERIFY',
  DISCONNECT = 'DISCONNECT',
}

type Payload = {
  [Types.INITIAL]: {
    connected: boolean;
    verified: boolean;
    user: AuthUserType;
    platform: 'sui' | 'evm' | null;
  };
  [Types.CONNECT]: {
    address: AddressUserType;
    platform: 'sui' | 'evm' | null;
  };
  [Types.VERIFY]: {
    user: AuthUserType;
  };
  [Types.DISCONNECT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

const initialState: AuthStateType = {
  user: null,
  loading: true,
  address: null,
  connected: false,
  verified: false,
  platform: null,
};

const reducer = (state: AuthStateType, action: ActionsType): AuthStateType => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      connected: action.payload.connected,
      address: {
        sui: action.payload.user?.sui_address,
        evm: action.payload.user?.eth_address,
      },
      verified: action.payload.verified,
      user: action.payload.user,
      platform: action.payload.platform,
    };
  }
  if (action.type === Types.CONNECT) {
    return {
      ...state,
      connected: true,
      address: action.payload.address,
      verified: false,
      platform: action.payload.platform,
    };
  }
  if (action.type === Types.VERIFY) {
    return {
      ...state,
      connected: true,
      verified: true,
      user: action.payload.user,
    };
  }
  if (action.type === Types.DISCONNECT) {
    setSession(null);
    sessionStorage.removeItem('nonceToken');
    return {
      ...state,
      loading: false,
      address: null,
      connected: false,
      verified: false,
      user: null,
      platform: null,
    };
  }
  return state;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // const { user: _user } = useMockedUser();

  const { connected: _connectedSui, disconnect: disconnectSui, address: addressSui } = useWallet();

  const { disconnect: disconnectWagmi } = useDisconnect();
  const {
    isConnected: isConnectedWagmi,
    address: addressWagmi,
    isDisconnected: isDisconnectedWagmi,
  } = useAccount();

  const isDisconnectedSui = useMemo(() => {
    return Boolean(!_connectedSui);
  }, [_connectedSui]);

  const isConnectedSui = useMemo(() => {
    return Boolean(_connectedSui);
  }, [_connectedSui]);

  const initializeUser = useCallback(async () => {
    const accessToken = sessionStorage.getItem(STORAGE_KEY);

    console.log(
      '🚀 ~ file: auth-provider.tsx ~ line 162 ~ initializeUser ~ accessToken Decoded',
      accessToken && jwtDecode(accessToken).id
    );

    if (accessToken && isValidToken(accessToken)) {
      await axios
        .get(endpoints.auth.me(jwtDecode(accessToken).id))
        .then((res) => {
          const data = res.data;

          const isSuiAddress = data.sui_address ? true : false;

          dispatch({
            type: Types.INITIAL,
            payload: {
              connected: true,
              verified: true,
              user: data,
              platform: isSuiAddress ? 'sui' : 'evm',
            },
          });
        })
        .catch((err) => {
          disconnect();

          console.log('Error Initiallizing', err);
          dispatch({
            type: Types.DISCONNECT,
          });
          enqueueSnackbar('Error could not get you connected please try again', {
            variant: 'error',
          });
        });
    }

    // a testing user from mock user data to populate in initial state
    else {
      dispatch({
        type: Types.DISCONNECT,
      });
    }

    // dispatch({
    //   type: Types.INITIAL,
    //   payload: {
    //     connected: true,
    //     verified: true,
    //     user: { id: 'askd333fasdf1231h', name: 'Test user' },
    //   },
    // });
  }, [isConnectedSui, isConnectedWagmi, isDisconnectedSui, isDisconnectedWagmi]);

  const connect = useCallback(() => {
    dispatch({
      type: Types.CONNECT,
      payload: {
        address: {
          evm: addressWagmi,
          sui: addressSui,
        },
        platform: addressSui ? 'sui' : 'evm',
      },
    });
  }, [isConnectedSui, isConnectedWagmi, isDisconnectedSui, isDisconnectedWagmi]);

  useEffect(() => {
    initializeUser();
  }, [isConnectedSui, isConnectedWagmi, isDisconnectedSui, isDisconnectedWagmi, connect]);

  useEffect(() => {
    if (isConnectedSui) {
      connect();
    }
    if (isConnectedWagmi) {
      connect();
    }
  }, [isConnectedSui, isConnectedWagmi]);

  const verify = useCallback(
    async (signature: string) => {
      const accessToken = sessionStorage.getItem(NONCE_TOKEN_KEY);

      sessionStorage.removeItem(NONCE_TOKEN_KEY);

      await axios
        .post(endpoints.auth.login, {
          signature,
          token: accessToken,
        })
        .then((res) => {
          const { access_token, user } = res.data;

          enqueueSnackbar('Successfully verified', { variant: 'success' });

          sessionStorage.setItem(STORAGE_KEY, access_token);

          axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

          dispatch({
            type: Types.VERIFY,
            payload: {
              user,
            },
          });
        })
        .catch((err) => {
          console.log('err: ', err);
          enqueueSnackbar('Error could not verify you please try again', {
            variant: 'error',
          });
          disconnect();
        });
    },
    [
      addressSui,
      addressWagmi,
      isConnectedSui,
      isConnectedWagmi,
      isDisconnectedSui,
      isDisconnectedWagmi,
    ]
  );

  const disconnect = useCallback(async () => {
    setSession(null);
    sessionStorage.removeItem('nonceToken');
    state?.user?.platform === 'sui' ? disconnectSui() : disconnectWagmi();
    dispatch({
      type: Types.DISCONNECT,
    });
  }, [
    isConnectedSui,
    isConnectedWagmi,
    isDisconnectedSui,
    isDisconnectedWagmi,
    disconnectSui,
    disconnectWagmi,
    addressSui,
    addressWagmi,
  ]);

  const status = state.loading ? true : false;

  const memoizedValue = useMemo(() => {
    return {
      user: state.user,
      address: state.address,
      loading: status,
      connected: state.connected,
      verified: state.verified,
      //
      connect, //connect wallet
      verify, //verify wallet
      disconnect, //disconnect wallet
    };
  }, [state, connect, verify, disconnect, status]);

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
