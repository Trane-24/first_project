import React, { useRef, useState, useMemo } from "react";
import { v4 as uuid } from "uuid";
// hooks
import { useAppDispatch } from "hooks/useAppDispatch";
import useDialog from "hooks/useDialog";
// Async
import { deleteHotel } from "store/hotels/hotelsAsync";
// Action
import { appActions } from "store/app/appSlice";
// Models
import IHotel from "models/Hotel";
// Component
import ConfirmDeleteModal from "components/ConfirmDeleteModal";
import HotelsForm from "./HotelsForm";
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
import { assetsActions } from "store/assets/assetsSlice";
import AssetsAsync from "store/assets/assetsAsync";

type Props = {
  hotel: IHotel,
  onClose?: () => void;
}

const HotelItem:React.FC<Props> = ({ hotel, onClose }) => {
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
      .then(() => dispatch(AssetsAsync.deleteAsset(hotel.images[0]._id)))
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

  console.log(hotel)

  return (
    <React.Fragment>
      <ConfirmDeleteModal
        title="hotel"
        remove={removeHotel}
        open={openDeleteModal}
        onClose={handleCloseModal}
      />

      <Dialog>
        <HotelsForm onClose={closeDialog} hotel={hotel}/>
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
            {isNotReservation ? (
              <Grid sx={{ display: 'flex', justifyContent: 'flex-end'}} item xs={1}>
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
              <Grid sx={{ display: 'flex', justifyContent: 'flex-end'}} item xs={1}>
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
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  )
}

export default HotelItem;

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
});
