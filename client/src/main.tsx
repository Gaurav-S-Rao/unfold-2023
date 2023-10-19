import ReactDOM from 'react-dom/client';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';

import { WalletProvider } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <BrowserRouter>
      <Suspense>
        <WalletProvider>
          <App />
        </WalletProvider>
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);
