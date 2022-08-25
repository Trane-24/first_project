import React, { useRef, useState } from "react";
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
  Accordion, AccordionDetails, AccordionSummary, Divider,
  Grid, IconButton, Menu, MenuItem, Tooltip, Typography
} from "@mui/material";
import {
  DeleteOutline as DeleteOutlineIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { makeStyles } from "@mui/styles";

type Props = {
  hotel: IHotel,
}

const HotelItem:React.FC<Props> = ({ hotel }) => {
  console.log(hotel)
  const classes = useStyle();
  const dispatch = useAppDispatch();

  const imgUrl = hotel.imgUrl || '/images/hotel-no-available.png';

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
  }

  const handleCloseModal = () => {
    setOpenDeleteModal(false);
    setOpenMenu(false);
  }

  const removeHotel = () => {

    dispatch(deleteHotel(hotel._id))
      .unwrap()
      .then(() => dispatch(appActions.enqueueSnackbar({
        key: uuid(),
        message: 'Hotel was deleted'
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
        <HotelsForm onClose={closeDialog} hotel={hotel}/>
      </Dialog>

      <Accordion disableGutters={true}>
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
          </Grid>
        </AccordionSummary>

        <AccordionDetails
          sx={{ backgroundColor: isActive ? '#ededed' : '#fff' }}
        >
          <Divider sx={{ mb: 3 }} />
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
