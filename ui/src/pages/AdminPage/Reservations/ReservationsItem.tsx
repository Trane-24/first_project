import { Card, Grid, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ConfirmDeleteModal from 'components/ConfirmDeleteModal';
import { useAppDispatch } from 'hooks/useAppDispatch';
import useDialog from 'hooks/useDialog';
import IReservation from 'models/Reservation';
import React, { useRef, useState } from 'react';
import ReservationForm from './ReservationsForm';
import {
  DeleteOutline as DeleteOutlineIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { deleteReservation } from 'store/reservation/reservationAsunc';
import { appActions } from 'store/app/appSlice';
import { v4 as uuid } from 'uuid';

interface Props {
  reservation: IReservation;
}

const ReservationsItem: React.FC<Props> = ({ reservation }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  //menu
  const menuRef = useRef();
  const [openMenu, setOpenMenu] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleOpenMenu = () => {setOpenMenu(!openMenu)};

  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(!openDeleteModal);
    setOpenMenu(false);
  }

  const handleCloseModal = () => {
    setOpenDeleteModal(false);
    setOpenMenu(false);
  };

  const removeReservation = () => {
    dispatch(deleteReservation(reservation._id))
      .unwrap()
      .then(() => dispatch(appActions.enqueueSnackbar({
        key: uuid(),
        message: 'Reservation was deleted',
      })))
  };

  // edite form
  const {Dialog, openDialog, closeDialog} = useDialog();

  const handleOpenEditModal = () => {
    openDialog();
    setOpenMenu(false);
  };

  return (
    <React.Fragment>
      <ConfirmDeleteModal
        title='reservation'
        remove={removeReservation}
        open={openDeleteModal}
        onClose={handleCloseModal}
      />

      <Dialog>
        <ReservationForm onClose={closeDialog} reservation={reservation} />
      </Dialog>

      <Card className={classes.card}>
        <Grid container>
          <Grid item xs={2}>
            <Typography className={classes.title}>
              Start date
            </Typography>
            <Typography className={classes.text}>
              {reservation.startDate}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography className={classes.title}>
              End date
            </Typography>
            <Typography className={classes.text}>
              {reservation.endDate}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography className={classes.title}>
              Notes
            </Typography>
            <Typography className={classes.text}>
              {reservation.notes || '-'}
            </Typography>
          </Grid>

          <Grid item xs={3}>
            <Typography className={classes.title}>
              Guest
            </Typography>
            <Typography className={classes.text}>
              {`${reservation.guest.firstName} ${reservation.guest.lastName}`}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography className={classes.title}>
              Hotel
            </Typography>
            <Typography className={classes.text}>
              {reservation.hotel.name}
            </Typography>
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
          id={`user-${reservation._id}-menu`}
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

export default ReservationsItem;

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