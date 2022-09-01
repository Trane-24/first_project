import { Box, Card, Divider, Grid, IconButton, Link, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
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
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import CloseIcon from '@mui/icons-material/Close';

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

  const {
    Dialog: DialogGuest,
    openDialog: openDialogGuest,
    closeDialog: closeDialogGuest
  } = useDialog();

  const {
    Dialog: DialogHotel,
    openDialog: openDialogHotel,
    closeDialog: closeDialogHotel
  } = useDialog();

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

      <DialogGuest>
        <Box sx={{ p: 2}}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant='h5'>
              {`${reservation.guest.firstName} ${reservation.guest.lastName}`}
            </Typography>
            <Box onClick={closeDialogGuest} sx={{ cursor: 'pointer'}}>
              <CloseIcon />
            </Box>
          </Box>
          <Divider sx={{ pb: 1, mb: 2}}/>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2}}>
            <Box sx={{ display: 'flex', gap: 2}}>
              <EmailOutlinedIcon />
              <Link href={`mailto:${reservation.guest.email}`}>{reservation.guest.email}</Link>
            </Box>

            <Box sx={{ display: 'flex', gap: 2}}>
              <LocalPhoneOutlinedIcon />
              {reservation.guest.phone ? (
                <Link href={`tel:${reservation.guest.phone}`}>{reservation.guest.phone}</Link>
              ) : (
                <Typography>Not phone</Typography>
              )}
              
            </Box>
          </Box>
        </Box>
      </DialogGuest>

      <DialogHotel>
        <p>Dialog Hotel</p>
      </DialogHotel>

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
            <Link className={classes.text} onClick={openDialogGuest} sx={{ cursor: 'pointer'}} underline="hover">
              <Typography>{`${reservation.guest.firstName} ${reservation.guest.lastName}`}</Typography>
            </Link>
          </Grid>

          <Grid item xs={2}>
            <Typography className={classes.title}>
              Hotel
            </Typography>
            <Link className={classes.text} onClick={openDialogHotel} sx={{ cursor: 'pointer', fontSize: '14px'}} underline="hover">
              <Typography>{reservation.hotel.name}</Typography>
            </Link>
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