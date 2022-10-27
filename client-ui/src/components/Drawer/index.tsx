import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { NavLink } from 'react-router-dom';
import classes from './styles.module.scss';

interface INav {
  to: string;
  label: string;
}

const TemporaryDrawer = () => {
  const [open, setOpen] = useState(false);

  const navs: INav[] = [
    {
      to: '/about', label: 'About',
    },
    {
      to: '/contact-us', label: 'Contact us',
    },
  ]

  const toggleDrawer =
    (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setOpen(open);
    };

  const list = () => (
    <Box
      className={[classes.list_content, 'container'].join(' ')}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box className={classes.list_header}>
        <Button onClick={toggleDrawer(true)}>
          <CloseOutlinedIcon />
        </Button>
        <NavLink to="/">
          <img className={classes.logo} src='/img/logo.png' alt='Hotels logo' />
        </NavLink>
      </Box>
      
      <List>
        {navs.map((nav: INav) => {
          const {to, label} = nav;

          return (
            <ListItem key={label} disablePadding>
              <ListItemButton component={NavLink} to={to}>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Box>
  );

  return (
    <Box className={classes.drawer_btn}>
      <Button onClick={toggleDrawer(true)}>
        <MenuOutlinedIcon />
      </Button>
      <Drawer
        anchor="top"
        open={open}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </Box>
  );
}

export default TemporaryDrawer;
