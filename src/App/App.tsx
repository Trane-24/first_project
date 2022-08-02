import { Box } from '@mui/material';
import { Fragment } from 'react';
import Header from '../components/Header';
import AppRouting from './App.routing';

const App = () => {
  return (
    <Fragment>
      <Header />
      <AppRouting />
    </Fragment>
  );
}

export default App;
