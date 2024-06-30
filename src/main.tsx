import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

import App from './components/App.tsx'
import theme from './styles/chakra';

const queryClient = new QueryClient();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain="dev-mbuxzrhofy1nn4wo.eu.auth0.com"
        clientId="4UotCyLuwpBEDRYBdAidXgZJUAPLjzrI"
        authorizationParams={{
          redirect_uri: window.location.origin
        }}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            <App />
          </ChakraProvider>
        </QueryClientProvider>
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
