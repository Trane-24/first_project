import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Grid, IconButton, Link, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
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
import dayjs from 'dayjs';
import UserInfo from '../Users/UserInfo';
import ReservationStatus from 'types/ReservationStatus';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CloseIcon from '@mui/icons-material/Close';
import HotelItem from '../Hotels/HotelItem';

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

  const handleIsActive = () => setIsActive(!isActive);

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

  const showCorrectDate = (startDate: string, endDate: string) => {
    const start = startDate.split('-');
    const end = endDate.split('-');

    const oneMonth = start[1] === end[1];
    const oneYear = start[0] === end[0];

    if (oneMonth && oneYear) {
      return `${dayjs(startDate).format('MMM DD')} - ${dayjs(endDate).format('DD, YYYY')}`;
    } else if (!oneMonth && oneYear) {
      return `${dayjs(startDate).format('MMM DD')} - ${dayjs(endDate).format('MMM DD, YYYY')}`;
    } else {
      return `${dayjs(startDate).format('MMM DD, YYYY')} - ${dayjs(endDate).format('MMM DD, YYYY')}`;
    }
  };

  const createStatus = (status: ReservationStatus) => {
    const styleDefault = {
      display:'flex',
      alignItems: 'center',
      gap: 1,
      width: 'max-content',
      padding: '2px 10px',
      borderRadius: '15px',
    }

    switch(status) {
      case ReservationStatus.Submitted:
        return (
          <Box sx={{
            ...styleDefault,
            color: '#3D98BF',
            backgroundColor: '#E9F5F8',
          }}>
            <DoneIcon fontSize='small'/>
            Submitted
          </Box>
        )
        case ReservationStatus.Completed:
        return (
          <Box sx={{
            ...styleDefault,
            color: '#2E7D31',
            backgroundColor: '#E6EFE6',
          }}>
            <DoneAllIcon fontSize='small'/>
            Completed
          </Box>
        )
        case ReservationStatus.Cancelled:
        return (
          <Box sx={{
            ...styleDefault,
            color: '#D32F30',
            backgroundColor: '#FAE6E6',
          }}>
            <CloseIcon fontSize='small'/>
            Cancelled
          </Box>
        )
    }
  }

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
        <UserInfo user={guest} close={closeDialogGuest} />
      </DialogGuest>

      <DialogOwner >
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
            <Grid container sx={{ display: 'flex', alignItems: 'center'}}>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: 600 }}>{reservation.hotel.name}</Typography>
              </Grid>

              <Grid item xs={3}>
                <Typography className={classes.title}>
                  Date
                </Typography>
                <Typography className={classes.text}>
                  {showCorrectDate(reservation.startDate, reservation.endDate)}
                </Typography>
                {createStatus(reservation.status)}
              </Grid>

              <Grid item xs={2}>
                <Typography className={classes.title}>
                  Owner
                </Typography>
                <Link className={classes.link} onClick={handleOpenOwnerModal} sx={{ cursor: 'pointer'}} underline="hover">
                  <Typography color='primary' >
                    {reservation.hotel.owner.firstName}
                    {' '}
                    {reservation.hotel.owner.lastName}
                  </Typography>
                </Link>
              </Grid>

              <Grid item xs={2}>
                <Typography className={classes.title}>
                  Guest
                </Typography>
                <Link className={classes.link} onClick={handleOpenGuestModal} sx={{ cursor: 'pointer'}} underline="hover">
                  <Typography color='primary'>
                    {`${reservation.guest.firstName} ${reservation.guest.lastName}`}
                  </Typography>
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
        </AccordionSummary>

        <AccordionDetails sx={{ backgroundColor: isActive ? '#ededed' : '#fff' }}>
          <Divider sx={{ mb: 2 }} />

          <Grid container>
            <Grid item xs={10}>
              <Typography className={classes.title}>
                Notes
              </Typography>
              <Typography className={classes.text}>
                {reservation.notes || '-'}
              </Typography>
            </Grid>

            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end'}}>
              <Link
                className={classes.link}
                onClick={openDialogHotel}
                sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1}}
                underline='hover'
              >
                View hotel details
              </Link>
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
  }
});