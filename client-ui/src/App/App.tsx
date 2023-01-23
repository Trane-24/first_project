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
<<<<<<< HEAD
import { helpdeskActions } from 'store/helpdesk/helpdeskSlice';
=======
import { useLocation, useNavigate } from 'react-router-dom';
import UserRoles from 'types/UserRoles';
>>>>>>> 474d7eafdaa64ab7a428c77c19c7e61ce5f44261

const App:React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // state
  const isAuthorization = useSelector(selectIsAuthorization);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(AuthAsync.checkIsAuthorization({}));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
<<<<<<< HEAD
    if (currentUser) {
      dispatch(helpdeskActions.connect());
    } else {
      dispatch(helpdeskActions.disconnect());
    }

    return () => {
      dispatch(helpdeskActions.disconnect());
    }
  }, [currentUser])
=======
    if (currentUser && currentUser.role === UserRoles.Owner && pathname === '/reservations') {
      navigate('/my-hotels')
    }
    if (currentUser && currentUser.role === UserRoles.Guest && pathname === '/my-hotels') {
      navigate('/reservations')
    }
    // eslint-disable-next-line
  }, [currentUser]);
>>>>>>> 474d7eafdaa64ab7a428c77c19c7e61ce5f44261

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
