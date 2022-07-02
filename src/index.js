import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import './index.css';
import App from './components/App';
import { UserContextProvider } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
