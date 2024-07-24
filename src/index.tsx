import React from 'react';
import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';
import { BlockchainProvider } from './contexts/BlockchainContext';

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BlockchainProvider>
      <App />
    </BlockchainProvider>
  </React.StrictMode>,
);
