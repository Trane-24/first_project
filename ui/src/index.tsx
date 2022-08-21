import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { setupStore } from './store';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import App from './App/App';
// styles
import theme from './theme'
import './index.css';

const store = setupStore();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // With StrictMode request is duplicated
  // <React.StrictMode> 
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <SnackbarProvider maxSnack={5}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </SnackbarProvider>
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  // </React.StrictMode> 
);
