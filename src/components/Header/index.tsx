import React from 'react';
import { useSelector } from 'react-redux';
// mui
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
// selectors
import { selectIsAuthorization } from '../../store/auth/authSelectors';
// components
import UserMenu from './UserMenu';
import PublicMenu from './PublicMenu';

const Header: React.FC = () => {
  const classes = useStyles();

  const isAuthorization = useSelector(selectIsAuthorization);

  return (
    <Box className={classes.header}>
      <nav style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
        {isAuthorization ? <UserMenu /> : <PublicMenu /> }
      </nav>
    </Box>
  );
};

export default Header;

const useStyles = makeStyles({
  header: {
    backgroundColor: '#eee',
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid gray',
    borderRadius: '0 0 5px 5px'
  }
})