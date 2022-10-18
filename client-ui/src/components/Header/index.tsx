import React from 'react';
import classes from './styles.module.scss';

const Header: React.FC = () => {
  return (
    <header className={[classes.header, 'container'].join(' ')}>
      <img className={classes.logo} src='/img/logo.png' alt='LOGO' />
      <nav className={classes.nav}>
        <a className={classes.link} href="#">List of propery</a>
        <a className={classes.link} href="#">Sing In</a>
        <a className={classes.link} href="#">Sing Up</a>
      </nav>
    </header>
  )
};

export default Header;