import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { AuthContext } from 'src/auth/context/auth-context';
import { ActionMapType, AddressUserType, AuthStateType, AuthUserType } from '../types';
import { isValidToken, setSession, jwtDecode } from './utils';

import axios, { endpoints } from 'src/utils/axios-instance';
// import { useMockedUser } from 'src/hooks/use-mocked-user';
// import { useAccount, useConnect, useDisconnect } from 'wagmi';
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
  };
  [Types.CONNECT]: {
    address: AddressUserType;
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
};

const reducer = (state: AuthStateType, action: ActionsType): AuthStateType => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      connected: action.payload.connected,
      address: action.payload.user?.address,
      verified: action.payload.verified,
      user: action.payload.user,
    };
  }
  if (action.type === Types.CONNECT) {
    return {
      ...state,
      connected: true,
      address: action.payload.address,
      verified: false,
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
    return {
      ...state,
      loading: false,
      address: null,
      connected: false,
      verified: false,
      user: null,
    };
  }
  return state;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // const { user: _user } = useMockedUser();

  const { connected: _connected, disconnect: disconnectSui, address } = useWallet();

  const isDisconnected = useMemo(() => {
    return Boolean(!_connected);
  }, [_connected]);

  const isConnected = useMemo(() => {
    return Boolean(_connected);
  }, [_connected]);

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

          dispatch({
            type: Types.INITIAL,
            payload: {
              connected: true,
              verified: true,
              user: data,
            },
          });
        })
        .catch((err) => {
          disconnect();

          console.log('Error Initiallizing', err);
          dispatch({
            type: Types.INITIAL,
            payload: {
              connected: false,
              verified: false,
              user: null,
            },
          });
          enqueueSnackbar('Error could not get you connected please try again', {
            variant: 'error',
          });
        });
    }

    // a testing user from mock user data to populate in initial state
    else {
      dispatch({
        type: Types.INITIAL,
        payload: {
          connected: false,
          verified: false,
          user: null,
        },
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
  }, [isConnected, isDisconnected]);

  const connect = useCallback(() => {
    dispatch({
      type: Types.CONNECT,
      payload: {
        address: {
          evm: address,
        },
      },
    });
  }, [isConnected, isDisconnected]);

  useEffect(() => {
    initializeUser();
  }, [isConnected, isDisconnected, connect]);

  useEffect(() => {
    if (isConnected) {
      connect();
    }
  }, [isConnected]);

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
    [address, isConnected, isDisconnected]
  );

  const disconnect = useCallback(async () => {
    setSession(null);
    sessionStorage.removeItem('nonceToken');
    disconnectSui();
    dispatch({
      type: Types.DISCONNECT,
    });
  }, [isConnected, isDisconnected, disconnectSui, address]);

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
