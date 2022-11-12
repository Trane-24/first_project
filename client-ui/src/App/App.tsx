import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
// Hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
// Async
import AuthAsync from 'store/auth/authAsync';
// Selectors
import { selectIsAuthorization } from 'store/auth/authSelectors';
import { selectCurrentUser } from 'store/users/usersSelectors';
// Mui
import { LinearProgress } from '@mui/material';
// Components
import AppRouting from './App.routing';
import Notifications from 'components/Notifications';
import Header from '../components/Header';
import Footer from 'components/Footer';

const App:React.FC = () => {
  const dispatch = useAppDispatch();

  // state
  const isAuthorization = useSelector(selectIsAuthorization);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(AuthAsync.checkIsAuthorization({}));
    // eslint-disable-next-line
  }, []);

  if (isAuthorization === null || (isAuthorization && !currentUser)) return <LinearProgress />;

  return (
    <React.Fragment>
      <Header />
      <main style={{ flex: '1 1 auto' }}>
        <AppRouting />
      </main>
      <Footer />
      <Notifications />
    </React.Fragment>
  );
}

export default App;
