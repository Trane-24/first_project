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
import Notifications from 'components/Notifications';
import { checkIsAuthorization } from 'store/auth/authAsync';
import { selectCurrentUser } from 'store/users/usersSelectors';

const App = () => {
  const dispatch = useAppDispatch();

  const isAuthorization = useSelector(selectIsAuthorization);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(checkIsAuthorization({}));

    // eslint-disable-next-line
  }, []);

  if (isAuthorization === null || (isAuthorization && !currentUser)) return <LinearProgress />;

  return (
    <Fragment>
      <Header />
      <AppRouting />
      <Notifications />
    </Fragment>
  );
}

export default App;
