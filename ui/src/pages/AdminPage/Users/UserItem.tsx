import React, { useRef, useState } from 'react';
// hooks
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import useDialog from '../../../hooks/useDialog';
// Async
import { deleteUser } from '../../../store/users/usersAsync';
// Models
import IUser from '../../../models/User';
// Components
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import UserForm from './UsersForm';
// MUI
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
import { fullName } from '../../../functions';
import { appActions } from 'store/app/appSlice';
import { v4 as uuid } from 'uuid';

interface Props {
  user: IUser;
}

const UserItem: React.FC<Props> = ({ user }) => {
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

      <Card style={{ width: '100%', padding: '10px'}}>
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

          <Grid item xs={1}>
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
          <MenuItem onClick={openDialog}>
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
