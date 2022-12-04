import React, { useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
// Hooks
import { useWindowDimensions } from 'hooks/useWindowDimensions';
// Selectors
import { selectCurrentUser } from 'store/users/usersSelectors';
// Actions
import { authActions } from '../../store/auth/authSlice';
import { usersActions } from 'store/users/usersSlice';
// Services
import StorageService from 'services/StorageService';
// mui
import { Box, IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const UserMenu:React.FC = () => {
  const dispatch = useDispatch();
  const menuRef = useRef();
  const [openMenu, setOpenMenu] = useState(false);

  const handleToggleMenu = () => {
    setOpenMenu(!openMenu);
  }

  const currentUser = useSelector(selectCurrentUser);

  const signOut = () => {
    StorageService.removeToken();
    dispatch(authActions.setAuthorization(false));
    dispatch(usersActions.removeCurrentUser());
  }

  const { width } = useWindowDimensions();
  const isMobile = useMemo(() => {
    return width < 600;
  }, [ width ])

  return (
    <React.Fragment>
      <Box onClick={handleToggleMenu} sx={{ display: 'flex', gap: 0.5, alignItems: 'center', cursor: 'pointer' }}>
        {isMobile ? (
          <Box ref={menuRef}>
            <IconButton >
              <AccountCircleOutlinedIcon sx={{ color: '#fff'}}/>
            </IconButton>
          </Box>
        ) : (
          <React.Fragment>
            <Typography sx={{ color: '#fff' }}>
              {`Welcome, ${currentUser?.firstName} ${currentUser?.lastName}`}
            </Typography>
            <Box ref={menuRef} sx={{display: 'flex'}}>
              <ExpandMoreIcon sx={{ color: '#fff' }} />
            </Box>
          </React.Fragment>
        )}
       
      </Box>

      <Menu
        anchorEl={menuRef.current}
        id="account-menu"
        open={openMenu}
        onClose={handleToggleMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            minWidth: '160px',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
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
      >
        <MenuItem onClick={handleToggleMenu} component={NavLink} to="admin/my-profile">
          <ListItemIcon>
            <PersonOutlineIcon />
          </ListItemIcon>
          Profile
        </MenuItem>

        <MenuItem onClick={signOut}>
          <ListItemIcon>
            <LogoutOutlinedIcon />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}

export default UserMenu;
