import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { CurrentUserProvider } from './context/currentUserContext';
import Header from './components/Header';

// Só ativa o MSW quando VITE_USE_MOCK=true no .env
// Variáveis do .env são sempre strings: "true" e "false" são truthy em if()
async function enableMocking() {
  if (import.meta.env.VITE_USE_MOCK == 'true') {

    const { worker } = await import('./mocks/browser');
    return worker.start({ onUnhandledRequest: 'bypass' });
  }

  return;
}

const root = document.getElementById('root');
if (root) {
  enableMocking().then(() => {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <CurrentUserProvider>
          <BrowserRouter>
            <Header />
            <App />
          </BrowserRouter>
        </CurrentUserProvider>
      </React.StrictMode>
    );
  });
}
