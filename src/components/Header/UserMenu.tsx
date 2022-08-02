import React from 'react';
// mui
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth/authSlice';

const PublicMenu:React.FC = () => {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(authActions.signOut());
  }

  return (
    <React.Fragment>
      <Button
        sx={{ color: '#fefefe' }}
        variant='contained'
        onClick={handleSignOut}
      >Sign out</Button>
    </React.Fragment>
  )
}

export default PublicMenu;
