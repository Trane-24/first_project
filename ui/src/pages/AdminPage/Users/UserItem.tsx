import React, { useRef, useState } from 'react';
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
// Components
import ConfirmDeleteModal from 'components/ConfirmDeleteModal';
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
  HomeWorkOutlined,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
// utilites
import { formatPhone, getFullName } from 'utilites/getString';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
  user: IUser;
}

const UserItem: React.FC<Props> = ({ user }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const activePage = location.pathname.split('/')[2];

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
            <Typography className={classes.title}>Name</Typography>
            <Typography className={classes.text}>{getFullName(user.firstName, user.lastName)}</Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography className={classes.title}>E-mail</Typography>
            <Typography className={classes.text}>{user.email}</Typography>
          </Grid>

          <Grid item xs={3}>
            <Typography className={classes.title}>Phone</Typography>
            <Typography className={classes.text}>{user.phone ? formatPhone(user.phone) : ''}</Typography>
          </Grid>

          <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
          <MenuItem component="div" onClick={handleOpenEditModal}>
            <ListItemIcon>
              <EditIcon fontSize='small'/>
            </ListItemIcon>
            Edit
          </MenuItem>

          {activePage === 'guests' && (
            <MenuItem component="div" onClick={() => navigate(`/admin/guests/${user._id}/reservations`)}>
              <ListItemIcon>
                <AppRegistrationIcon fontSize='small'/>
              </ListItemIcon>
              Reservations
            </MenuItem>
          )}

          {activePage === 'owners' && (
            <MenuItem component="div" onClick={() => navigate(`/admin/owners/${user._id}/hotels`)}>
              <ListItemIcon>
                <HomeWorkOutlined fontSize='small'/>
              </ListItemIcon>
              Hotels
            </MenuItem>
          )}

          <MenuItem component="div" onClick={handleOpenDeleteModal}>
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
  },
});
