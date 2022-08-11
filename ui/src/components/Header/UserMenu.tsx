import React, { useRef, useState } from 'react';
// mui
import { IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth/authSlice';
import { selectCurrentUser } from 'store/users/usersSelectors';
import { MoreVert } from '@mui/icons-material';
import { selectIsAuthorization } from 'store/auth/authSelectors';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink } from 'react-router-dom';

const UserMenu:React.FC = () => {
  const dispatch = useDispatch();
  const menuRef = useRef();
  const [openMenu, setOpenMenu] = useState(false);

  const handleToggleMenu = () => {
    setOpenMenu(!openMenu);
  }

  const isAutthorization = useSelector(selectIsAuthorization);
  const currentUser = useSelector(selectCurrentUser);
  console.log(currentUser)

  const handleSignOut = () => {
    dispatch(authActions.signOut());
  };

  return (
    <React.Fragment>
      {isAutthorization && <>
      <Typography sx={{ lineHeight: '40px'}}>
        {/* {`Welcome, ${currentUser.firstName} ${currentUser.lastName}`} */}
      </Typography>
        <Tooltip title="user menu" ref={menuRef}>
          <IconButton onClick={handleToggleMenu}>
            <MoreVert />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={menuRef.current}
          id="account-menu"
          open={openMenu}
          onClose={handleToggleMenu}
        >
          <MenuItem onClick={handleToggleMenu} component={NavLink} to="admin/my-profile">
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            Profile
          </MenuItem>

          <MenuItem onClick={handleSignOut}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            Sign out
          </MenuItem>
        </Menu>
      </>}
    </React.Fragment>
  )
}

export default UserMenu;
