import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './style.css';
import { GlobalProvider } from './contexts/GlobalContext';
import App from './App';

const queryClient = new QueryClient({
  defaultOptions : {
    queries : {
      staleTime : 0,
      refetchInterval : 1000 * 60 * 5,
      refetchIntervalInBackground : true,
    }
  }
});

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </QueryClientProvider>
  </StrictMode>
);
