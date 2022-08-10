import { Card, Grid } from '@material-ui/core';
import { IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import { fullName } from '../../../functions';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import useDialog from '../../../hooks/useDialog';
import IUser from '../../../models/User';
import { deleteUser } from '../../../store/users/usersAsync';
import UserForm from './UserForm';
import {
  DeleteOutline as DeleteOutlineIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';

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
    dispatch(deleteUser(user.id))
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
