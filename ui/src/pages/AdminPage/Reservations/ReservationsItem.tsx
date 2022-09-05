import { Accordion, AccordionDetails, AccordionSummary, Box, Card, Divider, Grid, IconButton, Link, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
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
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';
import dayjs from 'dayjs';

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

  const handleOpenEditModal = (e: any) => {
    e.stopPropagation();
    openDialog();
    setOpenMenu(false);
  };
  
  const {hotel} = reservation;
  const imgUrl = hotel.imgUrl || '/images/hotel-no-available.png';

  const showCorrectDate = (startDate: string, endDate: string) => {
    const start = startDate.split('-');
    const end = endDate.split('-');

    const oneMonth = start[1] === end[1];
    const oneYear = start[0] === end[0];

    if (oneMonth && oneYear) {
      return `${dayjs(startDate).format('MMM DD')} - ${end[2]}, ${end[0]}`
    } else if (!oneMonth) {
      return `${dayjs(startDate).format('MMM DD')} - ${dayjs(endDate).format('MMM DD, YYYY')}`
    }

    return `${dayjs(startDate).format('MMM DD YYYY')} - ${dayjs(endDate).format('MMM DD YYYY')}`
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
              <Typography>
                <Link href={`mailto:${reservation.guest.email}`}>{reservation.guest.email}</Link>
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2}}>
              <LocalPhoneOutlinedIcon />
              {reservation.guest.phone ? (
                <Typography>
                  <Link href={`tel:${reservation.guest.phone}`}>{reservation.guest.phone}</Link>
                </Typography>
              ) : (
                <Typography>Not phone</Typography>
              )}
              
            </Box>
          </Box>
        </Box>
      </DialogGuest>

      <DialogHotel>
        <Box sx={{ p: 2}}>
          <Grid container spacing={2}>
            <Grid item xs={3} alignSelf="center">
              <Typography className={classes.text} sx={{ fontWeight: 600 }}>{hotel.name}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.title}>Country</Typography>
              <Typography>{hotel.country ? hotel.country : '-'}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography className={classes.title}>City</Typography>
              <Typography>{hotel.city ? hotel.city : '-'}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.title}>Owner</Typography>
              <Typography>{`${hotel.owner.firstName} ${hotel.owner.lastName}`}</Typography>
            </Grid>
            <Grid item xs={1}>
              <Box onClick={closeDialogHotel} sx={{ cursor: 'pointer'}}>
                <CloseIcon />
              </Box>
            </Grid>
            
            <Grid item xs={3}>
              <img
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                src={imgUrl}
                alt={hotel.name}
              />
            </Grid>
            <Grid item xs={8}>
              <Typography className={classes.title}>Description</Typography>
              <Typography className={classes.text}>{hotel.description || '-'}</Typography>
            </Grid>
          </Grid>
        </Box>
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
              </Grid>

              <Grid item xs={2}>
                <Typography className={classes.title}>
                  Owner
                </Typography>
                <Typography className={classes.text}>
                  {reservation.hotel.owner.firstName}
                  {' '}
                  {reservation.hotel.owner.lastName}
                </Typography>
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
                  Hotel info
                <HelpCenterOutlinedIcon />
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