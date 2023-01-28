import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
// Hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
// Async
import AuthAsync from 'store/auth/authAsync';
import { fetchMessages } from 'store/helpdesk/helpdeskAsync';
// Actions
import { helpdeskActions } from 'store/helpdesk/helpdeskSlice';
// Selectors
import { selectIsAuthorization } from 'store/auth/authSelectors';
import { selectCurrentUser } from 'store/users/usersSelectors';
import { selectParams } from 'store/helpdesk/helpdeskSelectors';
// Types
import UserRoles from 'types/UserRoles';
// Mui
import { LinearProgress } from '@mui/material';
// Components
import AppRouting from './App.routing';
import Notifications from 'components/Notifications';
import Header from '../components/Header';
import Footer from 'components/Footer';

const App:React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Selectors
  const isAuthorization = useSelector(selectIsAuthorization);
  const currentUser = useSelector(selectCurrentUser);
  const params = useSelector(selectParams);

  useEffect(() => {
    dispatch(AuthAsync.checkIsAuthorization({}));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.role === UserRoles.Owner && pathname === '/reservations') {
      navigate('/my-hotels')
    }
    if (currentUser && currentUser.role === UserRoles.Guest && pathname === '/my-hotels') {
      navigate('/reservations')
    }

    if (currentUser) {
      dispatch(helpdeskActions.connect());
      dispatch(fetchMessages(params));
    } else {
      dispatch(helpdeskActions.disconnect());
    }
    // eslint-disable-next-line
  }, [currentUser]);

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
