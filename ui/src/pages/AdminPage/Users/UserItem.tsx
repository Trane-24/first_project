import React, { useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
// hooks
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import useDialog from '../../../hooks/useDialog';
// Async
import { deleteUser } from '../../../store/users/usersAsync';
// Acions
import { appActions } from 'store/app/appSlice';
// Models
import IUser from '../../../models/User';
// Components
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import UserForm from './UsersForm';
// MUI
import { makeStyles } from '@mui/styles';
import {
  IconButton, ListItemIcon, Menu, MenuItem,
  Tooltip, Typography, Card, Grid
} from '@mui/material';
import {
  DeleteOutline as DeleteOutlineIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
// utilites
import { fullName } from 'utilites/getString';

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
        <Grid container>
          <Grid item xs={4}>
            <Typography sx={{ fontSize: '0.8rem', color: 'gray' }}>Name</Typography>
            <Typography>{fullName(user.firstName, user.lastName)}</Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography sx={{ fontSize: '0.8rem', color: 'gray' }}>E-mail</Typography>
            <Typography>{user.email}</Typography>
          </Grid>

          <Grid item xs={3}>
            <Typography sx={{ fontSize: '0.8rem', color: 'gray' }}>Phone</Typography>
            <Typography>{user.phone ? user.phone : 'Not found'}</Typography>
          </Grid>

          <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Tooltip title="user menu" ref={menuRef}>
              <IconButton onClick={handleOpenMenu}>
                <MoreVertIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>

        <Menu
          anchorEl={menuRef.current}
          id="account-menu"
          open={openMenu}
          onClose={handleOpenMenu}
        >
          <MenuItem onClick={handleOpenEditModal}>
            <ListItemIcon>
              <EditIcon fontSize='small'/>
            </ListItemIcon>
            Edit
          </MenuItem>

          <MenuItem onClick={handleOpenDeleteModal}>
            <ListItemIcon>
              <DeleteOutlineIcon />
            </ListItemIcon>
            Delete
          </MenuItem>
        </Menu>
      </Card>
    </React.Fragment>
  );
};

export default UserItem;

const useStyles = makeStyles({
  card: {
    boxShadow: '0px 0px 4px 1px rgba(0,0,0,0.08)',
    padding: '10px',
    margin: '5px 0',
  }
});
