import { Fragment, useEffect } from 'react';
// components
import Header from '../components/Header';
import AppRouting from './App.routing';
// hooks
import { useAppDispatch } from '../hooks/useAppDispatch';
// Actions
import { authActions } from '../store/auth/authSlice';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authActions.checkIsAuthorization());

    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Header />
      <AppRouting />
    </Fragment>
  );
}

export default App;
