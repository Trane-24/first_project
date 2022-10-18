import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';

import { setupStore } from './store';
import App from './App/App';

import theme from 'theme';
import './index.scss';

const store = setupStore();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // With StrictMode redux actions call twice
  // <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <SnackbarProvider maxSnack={3}>
              <App />
            </SnackbarProvider>
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  // </React.StrictMode> 
);
