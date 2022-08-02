import React from 'react';
import { NavLink } from 'react-router-dom';
// mui
import { Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.header}>
      <nav style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
        <NavLink to="/sign-in" className={classes.button}>
          <Button variant='contained'>Sign in</Button>
        </NavLink>
        <NavLink to="/sign-up" className={classes.button}>
          <Button variant='contained'>Sign up</Button>
        </NavLink>
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
  },
  button: {
    color: '#fefefe',
    textDecoration: 'none'
  }
})