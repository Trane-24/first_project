import { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
// components
import Header from '../components/Header';
import AppRouting from './App.routing';
// hooks
import { useAppDispatch } from '../hooks/useAppDispatch';
// Actions
import { authActions } from '../store/auth/authSlice';
// Selectors
import { selectIsAuthorization } from '../store/auth/authSelectors';
// Mui
import { LinearProgress } from '@mui/material';

const App = () => {
  const dispatch = useAppDispatch();

  const isAuthorization = useSelector(selectIsAuthorization);

  useEffect(() => {
    dispatch(authActions.checkIsAuthorization());

    // eslint-disable-next-line
  }, []);

  if (isAuthorization === null) return <LinearProgress />;

  return (
    <Fragment>
      <Header />
      <AppRouting />
    </Fragment>
  );
}

export default App;
