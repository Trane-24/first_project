import React from 'react';
import { NavLink } from 'react-router-dom';
// mui
import { makeStyles } from '@material-ui/styles';
import { Button } from '@mui/material';

const PublicMenu:React.FC = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <NavLink to="/sign-in" className={classes.button}>
        <Button variant='contained'>Sign in</Button>
      </NavLink>
      <NavLink to="/sign-up" className={classes.button}>
        <Button variant='contained'>Sign up</Button>
      </NavLink>
    </React.Fragment>
  )
}

export default PublicMenu;

const useStyles = makeStyles({
  button: {
    color: '#fefefe',
    textDecoration: 'none'
  }
})
