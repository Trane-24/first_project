import React, { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
// hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
import useDialog from 'hooks/useDialog';
// Async
import { deleteUser } from 'store/users/usersAsync';
// Acions
import { appActions } from 'store/app/appSlice';
// Models
import IUser from 'models/User';
// Types
import UserRoles from 'types/UserRoles';
// Components
import ConfirmDeleteModal from 'components/ConfirmDeleteModal';
import UserForm from './UsersForm';
// MUI
import { makeStyles } from '@mui/styles';
import {
  IconButton, ListItemIcon, Menu, MenuItem,
  Tooltip, Typography, Card, Grid, Divider
} from '@mui/material';
import {
  DeleteOutline as DeleteOutlineIcon,
  Edit as EditIcon,
  HomeWorkOutlined,
  MoreVert as MoreVertIcon,
  AppRegistration as AppRegistrationIcon,
} from '@mui/icons-material';
// utilites
import { formatPhone } from 'utilites/stringFormatter';

interface Props {
  user: IUser;
}

const UserItem: React.FC<Props> = ({ user }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  //menu
  const menuRef = useRef();
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenMenu = () => {setOpenMenu(!openMenu)};
  // delete
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(!openDeleteModal);
    setOpenMenu(false);
  }

  const removeUser = () => {
    dispatch(deleteUser(user._id))
      .unwrap()
      .then(() => dispatch(appActions.enqueueSnackbar({
        key: uuid(),
        message: 'User was deleted',
      })))
  };
  // edite form
  const { Dialog, closeDialog, openDialog} = useDialog();

  const handleOpenEditModal = () => {
    openDialog();
    setOpenMenu(false);
  }

  return (
    <React.Fragment>
      <ConfirmDeleteModal
        title='user'
        remove={removeUser}
        open={openDeleteModal}
        onClose={handleOpenDeleteModal}
      />
      <Dialog>
        <UserForm onClose={closeDialog} user={user} />
      </Dialog>

      <Card className={classes.card}>
        <Grid container spacing={2}>
          <Grid item xs={10} md={4} alignSelf="center" sx={{ order: -1 }}>
            <Typography className={classes.text}>{`${user.firstName} ${user.lastName}`}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography className={classes.title}>E-mail</Typography>
            <Tooltip title={user.email}>
              <Typography className={classes.text}>{user.email}</Typography>
            </Tooltip>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography className={classes.title}>Phone</Typography>
            <Typography className={classes.text}>{user.phone ? formatPhone(user.phone) : '-'}</Typography>
          </Grid>

          <Grid item xs={2} md={1} sx={{ display: 'flex', justifyContent: 'flex-end', order: { xs: -1, md: 0 } }}>
            <Tooltip title="User menu" ref={menuRef}>
              <IconButton onClick={handleOpenMenu}>
                <MoreVertIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>

        <Menu
          anchorEl={menuRef.current}
          id={`user-${user._id}-menu`}
          open={openMenu}
          onClose={handleOpenMenu}
          sx={{ display: 'flex', justifyContent: 'flex-start'}}
        >
          {user.role === UserRoles.Guest && (
            <MenuItem component={NavLink} to={`/admin/guests/${user._id}/reservations`}>
              <ListItemIcon>
                <AppRegistrationIcon fontSize='small'/>
              </ListItemIcon>
              Reservations
            </MenuItem>
          )}

          {user.role === UserRoles.Owner && (
            <MenuItem component={NavLink} to={`/admin/owners/${user._id}/hotels`}>
              <ListItemIcon>
                <HomeWorkOutlined fontSize='small'/>
              </ListItemIcon>
              Hotels
            </MenuItem>
          )}
          <MenuItem component="div" onClick={handleOpenEditModal}>
            <ListItemIcon>
              <EditIcon fontSize='small'/>
            </ListItemIcon>
            {`Edit ${user.role}`} 
          </MenuItem>
          <Divider />
          <MenuItem component="div" onClick={handleOpenDeleteModal}>
            <ListItemIcon>
              <DeleteOutlineIcon />
            </ListItemIcon>
            {`Delete ${user.role}`} 
          </MenuItem>
        </Menu>
      </Card>
    </React.Fragment>
  );
};

export default UserItem;

const useStyles = makeStyles({
  card: {
    padding: '12px',
    borderRadius: 0,
    borderBottom: '1px solid #eee',
    width: '100%',
  },
  title: {
    fontSize: '12px',
    lineHeight: '166%',
    letterSpacing: '0.4px',
    color: 'rgba(0, 0, 0, 0.6)',
  },
  text: {
    fontSize: '14px',
    lineHeight: '143%',
    letterSpacing: '0.17px',
    color: 'rgba(0, 0, 0, 0.87)',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
});
