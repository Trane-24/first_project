import { Box } from '@mui/material';
import { Fragment } from 'react';
import Header from '../pages/Login/Header';
import AppRouting from './App.routing';

const App = () => {
  return (
    <Fragment>
      <Box sx={{minHeight: '100vh'}}>
        <Header />
        <AppRouting />
      </Box>
    </Fragment>
  );
}

export default App;
