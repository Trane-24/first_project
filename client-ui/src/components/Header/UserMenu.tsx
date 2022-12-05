import React, { useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// Hooks
import useDialog from 'hooks/useDialog';
import { useWindowDimensions } from 'hooks/useWindowDimensions';
// Actions
import { usersActions } from 'store/users/usersSlice';
import { authActions } from 'store/auth/authSlice';
// Selectors
import { selectIsAuthorization } from 'store/auth/authSelectors';
import { selectCurrentUser } from 'store/users/usersSelectors';
// MUI
import { Box, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Logout } from '@mui/icons-material';
// Icon
import {
  HouseOutlined as HouseOutlinedIcon,
  ExitToAppOutlined as ExitToAppOutlinedIcon,
  AppRegistration as AppRegistrationIcon,
  HomeWorkOutlined as HomeWorkOutlinedIcon,
  PersonOutlined as PersonOutlinedIcon,
  SupportAgent as SupportAgentIcon,
  AccountCircleOutlined as AccountCircleOutlinedIcon,
} from '@mui/icons-material';
// Services
import StorageService from 'services/StorageService';
// Components
import SignInForm from 'components/SignIn.form';
import SignUpForm from 'components/SignUp.form';
// Style
import classes from './styles.module.scss';

const UserMenu:React.FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const isAuthorization = useSelector(selectIsAuthorization);
  const currentUser = useSelector(selectCurrentUser);
  const isListYourPropertu = pathname === '/list-your-property';

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = () => {
    StorageService.removeToken();
    dispatch(authActions.setAuthorization(false));
    dispatch(usersActions.removeCurrentUser());
  }

  const { width } = useWindowDimensions();
  const isMobile = useMemo(() => {
    return width < 600;
  }, [ width ])

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
        <React.Fragment>
          <IconButton sx={{ mr: 1}} component={NavLink} to="/helpdesk">
            <SupportAgentIcon />
          </IconButton>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              textAlign: 'center',
              cursor: 'pointer',
            }}
            onClick={handleClick}
          >
            {isMobile ? (
              <Tooltip title="Account settings">
                <IconButton>
                  <AccountCircleOutlinedIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <React.Fragment>
              <Typography>{`Welcome, ${currentUser?.firstName}`}</Typography>

              <Tooltip title="Account settings">
                <IconButton
                  size="small"
                  sx={{ ml: 0.5 }}
                >
                  <ExpandMoreIcon sx={{ color: '#000' }} />
                </IconButton>
              </Tooltip>
            </React.Fragment>
            )}
          </Box>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClick} component={NavLink} to="my-profile">
              <ListItemIcon>
                <PersonOutlinedIcon fontSize="small"/>
              </ListItemIcon>
              Profile
            </MenuItem>

            {currentUser?.role === 'guest' && (
              <MenuItem onClick={handleClick} component={NavLink} to="/reservations">
                <ListItemIcon>
                  <AppRegistrationIcon fontSize="small"/>
                </ListItemIcon>
                Reservations
              </MenuItem>
            )}

            {currentUser?.role === 'owner' && (
              <MenuItem onClick={handleClick} component={NavLink} to="/my-hotels">
                <ListItemIcon>
                  <HomeWorkOutlinedIcon fontSize="small"/>
                </ListItemIcon>
                Hotels
              </MenuItem>
            )}

            <Divider />
            <MenuItem onClick={signOut}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>

          </Menu>
        </React.Fragment>
      ) : (
        <React.Fragment>
        <Box className={classes.menuDesktop}>
          <Button
            component={NavLink} to="list-your-property"
            variant="outlined"
            size="small"
          >
            List your property
          </Button>

          {!isListYourPropertu && (
            <Button
              variant="contained"
              size="small"
              onClick={openSignUpDialog}
            >Sign up</Button>
          )}


          <Button
            variant="contained"
            size="small"
            onClick={openSignInDialog}
          >Sign in</Button>
        </Box>
        <Box className={classes.menuPhone}>
          <MenuItem component={NavLink} to="list-your-property">
            <HouseOutlinedIcon />
          </MenuItem>
          
          <MenuItem onClick={openSignInDialog}>
            <ExitToAppOutlinedIcon />
          </MenuItem>
        </Box>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default UserMenu;
