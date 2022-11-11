import React, { useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
// Hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
import useDialog from 'hooks/useDialog';
// Async
import { deleteReservation } from 'store/reservation/reservationAsync';
// Actions
import { appActions } from 'store/app/appSlice';
// Models
import IReservation from 'models/Reservation';
// Types
import ReservationStatuses from 'types/ReservationStatuses';
// MUI
import { makeStyles } from '@mui/styles';
import {
  Accordion, AccordionDetails, AccordionSummary, Box,
  Button,
  Chip,
  Divider, Grid, IconButton, Link, ListItemIcon, Menu,
  MenuItem, Tooltip, Typography
} from '@mui/material';
import {
  DeleteOutline as DeleteOutlineIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
  Done as DoneIcon,
  DoneAll as DoneAllIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
// Components
import ConfirmDeleteModal from 'components/ConfirmDeleteModal';
import ReservationForm from './ReservationsForm';
import UserInfo from '../Users/UserInfo';
import HotelItem from '../Hotels/HotelItem';
// utilites
import { formatStartAndEndDates } from 'utilites/dateFormatter';

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
  const [isActive, setIsActive] = useState(false);

  const handleIsActive = (e: any) => {
    setIsActive(!isActive);
  };

  const handleOpenMenu = (e: any) => {
    e.stopPropagation();
    setOpenMenu(!openMenu);
  };

  const handleOpenDeleteModal = (e: any) => {
    e.stopPropagation();
    setOpenDeleteModal(!openDeleteModal);
    setOpenMenu(false);
  };

  const handleOpenGuestModal = (e: any) => {
    e.stopPropagation();
    openDialogGuest();
  }

  const handleOpenOwnerModal = (e: any) => {
    e.stopPropagation();
    openDialogOwner();
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
    Dialog: DialogOwner,
    openDialog: openDialogOwner,
    closeDialog: closeDialogOwner,
  } = useDialog();

  const {
    Dialog: DialogHotel,
    openDialog: openDialogHotel,
    closeDialog: closeDialogHotel,
  } = useDialog();

  const handleOpenEditModal = (e: any) => {
    e.stopPropagation();
    openDialog();
    setOpenMenu(false);
  };
  
  const {hotel, guest} = reservation;

  return (
    <React.Fragment>
      <ConfirmDeleteModal
        title='reservation'
        remove={removeReservation}
        open={openDeleteModal}
        onClose={handleCloseModal}
      />

      <Dialog maxWidth="md">
        <ReservationForm onClose={closeDialog} reservation={reservation} />
      </Dialog>

      <DialogGuest maxWidth="sm">
        <UserInfo user={guest} close={closeDialogGuest} />
      </DialogGuest>

      <DialogOwner maxWidth="sm">
        <UserInfo user={hotel.owner} close={closeDialogOwner} />
      </DialogOwner>

      <DialogHotel maxWidth="md">
        <HotelItem hotel={reservation.hotel} onClose={closeDialogHotel}/>
      </DialogHotel>

      <Accordion disableGutters>
        <AccordionSummary
          sx={{
            userSelect: 'text',
            backgroundColor: isActive ? '#ededed' : '#fff',
          }}
          onClick={handleIsActive}
        >
            <Grid container sx={{ display: 'flex', alignItems: 'center'}} spacing={2}>
              <Grid item xs={11} sm={4} sx={{ order: { xs: -2, sm: 0}}}>
                <Typography sx={{ fontWeight: 600 }}>{reservation.hotel.name}</Typography>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography className={classes.title}>
                  Date
                </Typography>
                <Typography className={classes.text}>
                  {formatStartAndEndDates(reservation.startDate, reservation.endDate)}
                </Typography>
                {reservation.status === ReservationStatuses.Submitted && <Chip size="small" color="info" label="Submitted" icon={<DoneIcon />} />}
                {reservation.status === ReservationStatuses.Cancelled && <Chip size="small" color="error" label="Cancelled" icon={<CloseIcon />} />}
                {reservation.status === ReservationStatuses.Completed && <Chip size="small" color="success" label="Completed" icon={<DoneAllIcon />} />}
              </Grid>

              <Grid item xs={6} sm={2}>
                <Typography className={classes.title}>
                  Owner
                </Typography>
                <Typography className={classes.link} onClick={handleOpenOwnerModal}>
                  {`${reservation.hotel.owner.firstName} ${reservation.hotel.owner.lastName}`}
                </Typography>
              </Grid>

              <Grid item xs={6} sm={2}>
                <Typography className={classes.title}>
                  Guest
                </Typography>
                <Typography className={classes.link} onClick={handleOpenGuestModal}>
                  {`${reservation.guest.firstName} ${reservation.guest.lastName}`}
                </Typography>
              </Grid>

              <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end', order: { xs: -1, sm: 0 } }}>
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
        </AccordionSummary>

        <AccordionDetails sx={{ backgroundColor: isActive ? '#ededed' : '#fff' }}>
          <Divider sx={{ mb: 2 }} />

          <Grid container>
            <Grid item xs={8}>
              <Typography className={classes.title}>
                Notes
              </Typography>
              <Typography className={classes.text}>
                {reservation.notes || '-'}
              </Typography>
            </Grid>

            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end'}}>
              <Button onClick={openDialogHotel}>
                View hotel details
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      
    </React.Fragment>
  );
};

export default ReservationsItem;

const useStyles = makeStyles({
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
  link: {
    fontSize: '14px',
    lineHeight: '143%',
    letterSpacing: '0.17px',
    cursor: 'pointer',
    color: '#48A8D0',
  }
});