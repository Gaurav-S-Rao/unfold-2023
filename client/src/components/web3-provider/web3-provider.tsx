import React from 'react';
import { WagmiConfig } from 'wagmi';
import { config } from './wagmi';

import { WalletProvider } from '@suiet/wallet-kit';

type Props = {
  children: React.ReactNode;
};
export default function Web3Provider({ children }: Props) {
  return (
    <WagmiConfig config={config}>
      <WalletProvider>{children}</WalletProvider>
    </WagmiConfig>
  );
}
