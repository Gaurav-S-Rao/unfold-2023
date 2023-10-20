import ReactDOM from 'react-dom/client';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';

import '@suiet/wallet-kit/style.css';
import Web3Provider from './components/web3-provider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <Web3Provider>
      <BrowserRouter>
        <Suspense>
          <App />
        </Suspense>
      </BrowserRouter>
    </Web3Provider>
  </HelmetProvider>
);
