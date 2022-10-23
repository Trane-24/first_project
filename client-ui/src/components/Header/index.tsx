
import React from 'react';
import { NavLink } from 'react-router-dom';
// MUI
import { Box } from '@mui/material';
// Components
import UserMenu from './UserMenu';
// Styles
import classes from './styles.module.scss';


const Header: React.FC = () => {

  return (
    <header className={[classes.header, 'container'].join(' ')}>
      <NavLink to="/">
        <img className={classes.logo} src='/img/logo.png' alt='Hotels logo' />
      </NavLink>
      <nav className={classes.menu}>
        <NavLink to="about">About</NavLink>
        <NavLink to="contact-us">Contact us</NavLink>
      </nav>
      <Box flexGrow="1" />
      <UserMenu />
    </header>
  )
};

export default Header;