
import React from 'react';
import { NavLink } from 'react-router-dom';
// components
import PageNavLink from 'components/PageNavLink';
// utilites
import { toTop } from 'utilites/utilites';
// Styles
import classes from './styles.module.scss';

const Footer: React.FC = () => {

  return (
    <footer className={classes.footer}>
      <div className={[classes.footerContent, 'container'].join(' ')}>
        <NavLink to="/" onClick={toTop}>
          <img className={classes.logo} src='/img/logo.png' alt='Hotels logo' />
        </NavLink>
        <p>© 2022</p>
        <nav className={classes.menu}>
          <PageNavLink to="about" text="About" />
          <PageNavLink to="contact-us" text="Contact us" />
        </nav>
      </div>
    </footer>
  );
};

export default Footer;