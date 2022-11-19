import React, { useRef, useState, useMemo } from "react";
import { v4 as uuid } from "uuid";
// hooks
import { useAppDispatch } from "hooks/useAppDispatch";
import useDialog from "hooks/useDialog";
// Async
// import { deleteHotel } from "store/hotels/hotelsAsync";
// Action
import { appActions } from "store/app/appSlice";
// Models
import IHotel from "models/Hotel";
// Component
import ConfirmDeleteModal from "components/ConfirmDeleteModal";
// import HotelsForm from "./HotelsForm";
// MUI
import {
  Accordion, AccordionDetails, AccordionSummary, Box, Divider,
  Grid, IconButton, Menu, MenuItem, Tooltip, Typography
} from "@mui/material";
import {
  DeleteOutline as DeleteOutlineIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { makeStyles } from "@mui/styles";
import config from "config";
import { useLocation } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import AssetsAsync from "store/assets/assetsAsync";
import MyHotelsForm from "./MyHotelsForm";
import { deleteHotel } from "store/hotels/hotelsAsync";

type Props = {
  hotel: IHotel,
  onClose?: () => void;
}

const MyHotelItem:React.FC<Props> = ({ hotel, onClose }) => {
  const classes = useStyle();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const page = location.pathname.split('/')[2];

  const isNotReservation = useMemo(() => {
    return page !== 'reservations';
  }, [page]);

  const imgUrl = hotel.images?.length !== 0 ? `${config.serverURL}/${hotel.images[0].path}` : '/images/hotel-no-available.png';

  // menu
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

  const handleCloseModal = () => {
    setOpenDeleteModal(false);
    setOpenMenu(false);
  };

  const removeHotel = () => {
    dispatch(deleteHotel(hotel._id))
      .unwrap()
      .then(() => dispatch(appActions.enqueueSnackbar({
        key: uuid(),
        message: 'Hotel was deleted',
      })))
  };
  // edite form
  const { Dialog, closeDialog, openDialog } = useDialog();

  const handleOpenEditModal = (e: any) => {
    e.stopPropagation();

    openDialog();
    setOpenMenu(false);
  };

  return (
    <React.Fragment>
      <ConfirmDeleteModal
        title="hotel"
        remove={removeHotel}
        open={openDeleteModal}
        onClose={handleCloseModal}
      />

      <Dialog>
        <MyHotelsForm onClose={closeDialog} hotel={hotel}/>
      </Dialog>

      <Accordion disableGutters={true} defaultExpanded={isNotReservation ? false : true}>
        <AccordionSummary
        sx={{
          userSelect: 'text',
          backgroundColor: isActive ? '#ededed' : '#fff',
        }}
        onClick={handleIsActive}
        >
          <Grid container spacing={2}>
            <Grid item xs={11} md={3} alignSelf="center" sx={{ order: -1}}>
              <Typography className={classes.text} sx={{ fontWeight: 600 }}>{hotel.name}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography className={classes.title}>Hotel type</Typography>
              <Typography>{hotel.hotelType ? hotel.hotelType.name : '-'}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography className={classes.title}>Country</Typography>
              <Typography>{hotel.country ? hotel.country : '-'}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <Typography className={classes.title}>City</Typography>
              <Typography>{hotel.city ? hotel.city : '-'}</Typography>
            </Grid>

            {isNotReservation ? (
              <Grid sx={{ display: 'flex', justifyContent: 'flex-end', order: { xs: -1, md: 0 }, position: 'relative', left: { xs: '15px', sm: 0}}} item xs={1} >
                <Tooltip title="hotel menu" ref={menuRef}>
                  <IconButton onClick={handleOpenMenu}>
                    <MoreVertIcon />
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={menuRef.current}
                  id={`hotel-${hotel._id}-menu`}
                  open={openMenu}
                  onClose={handleOpenMenu}
                >
                  <MenuItem component="div" onClick={handleOpenEditModal} sx={{ display: 'flex', gap: 1.5 }}>
                    <EditIcon fontSize="small" />
                    Edit
                  </MenuItem>

                  <MenuItem component="div" onClick={handleOpenDeleteModal} sx={{ display: 'flex', gap: 1 }}>
                    <DeleteOutlineIcon />
                    Delete
                  </MenuItem>
                </Menu>
              </Grid>
            ) : (
              <Grid sx={{ display: 'flex', justifyContent: 'flex-end', order: { md: 3 }}} item xs={1}>
                <Box onClick={onClose} sx={{ cursor: 'pointer', display: 'flex', justifyContent: 'flex-end'}}>
                  <CloseIcon />
                </Box>
              </Grid>
            )}
          </Grid>
        </AccordionSummary>

        <AccordionDetails
          sx={{ backgroundColor: isActive ? '#ededed' : '#fff' }}
        >
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <img
                className={classes.img}
                src={imgUrl}
                alt={hotel.name}
              />
            </Grid>
            <Grid item xs={12} sm={9}>
              <Typography className={classes.title}>Description</Typography>
              <Typography className={classes.text}>{hotel.description || '-'}</Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  )
}

export default MyHotelItem;

const useStyle = makeStyles({
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
  // info: {
  //   display: 'flex',
  //   alignItems: 'center'
  //   // flexDerection: 'colum',
  // },
  img: {
    width: '100%',
    height: '100%',
    maxHeight: '200px',
    objectFit: 'cover',
  }
});
