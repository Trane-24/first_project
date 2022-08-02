import { Box, Button } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: '#eee', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid gray', borderRadius: '0 0 5px 5px' }}>
      <nav style={{ display: 'flex', gap: '12px' }}>
        <NavLink to="/" style={{ color: '#fefefe', textDecoration: 'none' }}>
          <Button variant='outlined'>Home</Button>
        </NavLink>

        <NavLink to="/login" style={{ color: '#fefefe', textDecoration: 'none' }}>
          <Button variant='outlined'>Log in</Button>
        </NavLink>
        {/* <NavLink to="/" style={{ color: '#fefefe', textDecoration: 'none' }}>
          <Button variant='outlined'>Log up</Button>
        </NavLink> */}
      </nav>
    </Box>
  );
};

export default Header;
