import { configureChains, createConfig } from 'wagmi';
import { avalancheFuji } from 'wagmi/chains';

import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

const walletConnectProjectId = '6e6eb9ff4d4c3dff5b8b9978c614181a';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [avalancheFuji],
  [
    alchemyProvider({ apiKey: import.meta.env.VITE_CHAIDEX_ALCHEMY_KEY! }),
    infuraProvider({ apiKey: import.meta.env.VITE_CHAIDEX_INFURA_KEY! }),
    publicProvider(),
  ]
);

export const config = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: {
        projectId: walletConnectProjectId,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});
