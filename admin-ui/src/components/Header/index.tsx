import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// Actions
import { appActions } from '../../store/app/appSlice';
// Selectors
import { selectIsAuthorization } from '../../store/auth/authSelectors';
// Mui
import {
  AppBar, Toolbar, Box,
  IconButton, Typography
} from '@mui/material';
// Icons
import { Menu as MenuIcon } from '@mui/icons-material';
// components
import UserMenu from './UserMenu';

const NavBar:FC = () => {
  // Dispatch
  const dispatch = useDispatch();
  // State
  const isAuthorization:boolean | null = useSelector(selectIsAuthorization);

  const handleToggleDrawer = () => dispatch(appActions.toggleDrawer());

  return (
    <AppBar position="relative" elevation={0} sx={{ background: 'linear-gradient(315deg, #3D98BF 0%, #53B8E0 100%)' }}>
      <Toolbar>
        {isAuthorization && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ color: 'white', mr: 2 }}
            onClick={handleToggleDrawer}
          ><MenuIcon /></IconButton>
        )}
        <Box
          display="flex" alignItems="center"
          component={Link} to="/"
          sx={{
            textDecoration: 'none'
          }}
        >
          <Typography
            sx={{
              color: 'white',
              fontSize: '20px',
              fontWeight: 500,
              lineHeight: '32px',
              letterSpacing: '-0.35px'
            }}
          >Admin Module</Typography>
        </Box>
        <Box flexGrow={1} />
        <Box sx={{ display: 'flex', gap: 2 }}>
          {isAuthorization && <UserMenu />}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
