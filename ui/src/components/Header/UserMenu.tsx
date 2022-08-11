import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
// Selectors
import { selectCurrentUser } from 'store/users/usersSelectors';
// Actions
import { authActions } from '../../store/auth/authSlice';
import { usersActions } from 'store/users/usersSlice';
// Services
import StorageService from 'services/StorageService';
// mui
import { Box, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

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

  return (
    <React.Fragment>
      <Box onClick={handleToggleMenu} sx={{ display: 'flex', gap: 0.5, alignItems: 'center', cursor: 'pointer' }}>
        <Typography sx={{ lineHeight: '40px'}}>
          {`Welcome, ${currentUser?.firstName} ${currentUser?.lastName}`}
        </Typography>
        <Box ref={menuRef}>
          <ExpandMoreIcon />
        </Box>
      </Box>

      <Menu
        anchorEl={menuRef.current}
        id="account-menu"
        open={openMenu}
        onClose={handleToggleMenu}
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
