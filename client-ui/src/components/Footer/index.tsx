
import React from 'react';
import { NavLink } from 'react-router-dom';
// Styles
import classes from './styles.module.scss';


const Footer: React.FC = () => {

  return (
    <header className={[classes.footer, 'container'].join(' ')}>
      <NavLink to="/">
        <img className={classes.logo} src='/img/logo.png' alt='Hotels logo' />
      </NavLink>
      <nav className={classes.menu}>
        <NavLink to="about">About</NavLink>
        <NavLink to="contact-us">Contact us</NavLink>
      </nav>
    </header>
  )
};

export default Footer;