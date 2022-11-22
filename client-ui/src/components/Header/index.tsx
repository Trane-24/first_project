
import React from 'react';
import { NavLink } from 'react-router-dom';
// MUI
import { Box } from '@mui/material';
// Components
import UserMenu from './UserMenu';
// Styles
import classes from './styles.module.scss';
import TemporaryDrawer from 'components/Drawer';
import PageNavLink from 'components/PageNavLink';


const Header: React.FC = () => {
  return (
    <header className={classes.header}>
      <div className={[classes.headerContent, 'container'].join(' ')}>
        <TemporaryDrawer />
        <NavLink to="/">
          <img className={classes.logo} src='/img/logo.png' alt='Hotels logo' />
        </NavLink>
        <nav className={classes.menu}>
          <PageNavLink to="about" text="About" />
          <PageNavLink to="contact-us" text="Contact us" />
        </nav>
        <Box flexGrow="1" />
        <UserMenu />
      </div>
    </header>
  )
};

export default Header;