import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { setupStore } from './store';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import App from './App/App';
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs as DateAdapter } from '@mui/x-date-pickers/AdapterDayjs'
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
            <LocalizationProvider dateAdapter={DateAdapter}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </LocalizationProvider>
          </SnackbarProvider>
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
);
