import { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
// hooks
import { useAppDispatch } from '../hooks/useAppDispatch';
// Async
import { checkIsAuthorization } from 'store/auth/authAsync';
// components
import AppRouting from './App.routing';
import Header from '../components/Header';
import Notifications from 'components/Notifications';
// Selectors
import { selectIsAuthorization } from '../store/auth/authSelectors';
import { selectCurrentUser } from 'store/users/usersSelectors';
// Mui
import { LinearProgress } from '@mui/material';

const App = () => {
  const dispatch = useAppDispatch();

  // state
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
