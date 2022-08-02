import { Button, Grid, Input, TextField } from '@mui/material';
import { Fragment } from 'react';
import Header from '../pages/Login/Header';
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
