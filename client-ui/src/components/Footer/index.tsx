
import React from 'react';
import { NavLink } from 'react-router-dom';
// Styles
import classes from './styles.module.scss';


const Footer: React.FC = () => {

  return (
    <footer className={classes.footer}>
      <div className={[classes.footerContent, 'container'].join(' ')}>
        <NavLink to="/">
          <img className={classes.logo} src='/img/logo.png' alt='Hotels logo' />
        </NavLink>
        <p>© 2022</p>
        <nav className={classes.menu}>
          <NavLink to="about">About</NavLink>
          <NavLink to="contact-us">Contact us</NavLink>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;