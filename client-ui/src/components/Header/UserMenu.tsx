import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// Hooks
import useDialog from 'hooks/useDialog';
// Selecgors
import { selectIsAuthorization } from 'store/auth/authSelectors';
// MUI
import { Box, Button, Typography } from '@mui/material';
// Components
import SignInForm from 'components/SignIn.form';
import SignUpForm from 'components/SignUp.form';
import { selectCurrentUser } from 'store/users/usersSelectors';

const UserMenu:React.FC = () => {
  const isAuthorization = useSelector(selectIsAuthorization);
  const currentUser = useSelector(selectCurrentUser);

  const { Dialog:SignInDialog, openDialog:openSignInDialog, closeDialog:closeSignInDialog } = useDialog();
  const { Dialog:SignUpDialog, openDialog:openSignUpDialog, closeDialog:closeSignUpDialog } = useDialog();

  return (
    <React.Fragment>
      <SignInDialog maxWidth="sm">
        <SignInForm onClose={closeSignInDialog} />
      </SignInDialog>
      <SignUpDialog maxWidth="sm">
        <SignUpForm onClose={closeSignUpDialog} />
      </SignUpDialog>
  
      {isAuthorization ? (
        <Typography>{`Welcome, ${currentUser?.firstName} ${currentUser?.lastName}`}</Typography>
      ) : (
        <Box sx={{ display: 'flex', gap: 1.2 }}>
          <Button
            component={NavLink} to="list-your-property"
            variant="outlined"
            size="small"
          >
            List your property
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={openSignInDialog}
          >Sign in</Button>
          <Button
            variant="contained"
            size="small"
            onClick={openSignUpDialog}
          >Sign up</Button>
        </Box>
      )}
    </React.Fragment>
  );
}

export default UserMenu;
