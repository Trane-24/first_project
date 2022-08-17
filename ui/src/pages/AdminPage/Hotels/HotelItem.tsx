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
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Grid, IconButton, ListItem, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
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
  const classes = useStyle();
  const dispatch = useAppDispatch();
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
            <Grid container sx={{ display: 'flex', alignItems: 'center'}}>
              <Grid item xs={3}>
                <Typography className={classes.hotelName}>
                  {hotel.name}
                </Typography>
              </Grid>

              <Grid item xs={3}>
                <Typography className={classes.subtitle} >
                  Country
                </Typography>

                <Typography>
                  {hotel.country ? hotel.country : '-'}
                </Typography>
              </Grid>

              <Grid item xs={2}>
                <Typography className={classes.subtitle} >
                  City
                </Typography>

                <Typography>
                  {hotel.city ? hotel.city : '-'}
                </Typography>
              </Grid>

              <Grid item xs={3}>
                <Typography className={classes.subtitle} >
                  Owner
                </Typography>

                <Typography>
                  {`${hotel.owner.firstName} ${hotel.owner.lastName}`}
                </Typography>
              </Grid>

              <Grid sx={{ display: 'flex', justifyContent: 'flex-end'}} item xs={1}>
                <Tooltip title="hotel menu" ref={menuRef}>
                  <IconButton onClick={handleOpenMenu}>
                    <MoreVertIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>

            <Menu
              anchorEl={menuRef.current}
              id={`hotel-${hotel._id}-menu`}
              open={openMenu}
              onClose={handleOpenMenu}
              className={classes.menu}
            >
              <MenuItem component="div" onClick={handleOpenEditModal}>
                <ListItem className={classes.listItem}>
                  <EditIcon fontSize="small"/>
                </ListItem>
                Edit
              </MenuItem>

              <MenuItem component="div" onClick={handleOpenDeleteModal} >
                <ListItem className={classes.listItem}>
                  <DeleteOutlineIcon />
                </ListItem>
                Delete
              </MenuItem>
            </Menu>
        </AccordionSummary>

        <AccordionDetails
          sx={{
            display: 'flex',
            gap: 2,
            backgroundColor: isActive ? '#ededed' : '#fff',
          }}
        >
          <Box sx={{ width: '100%'}}>
            <Divider sx={{ mb: 1}} />
            <Box sx={{ display: 'flex', gap: 2}}>
              <img
                style={{ height: '200px', }}
                src={hotel.imgUrl
                  ? hotel.imgUrl
                  : require('../../../img/hotel-no-available.png')
                }
                alt={hotel.name}
              />
                <Box>
                  <Typography className={classes.subtitle} >
                    Description
                  </Typography>
                  <Typography>{hotel.description ? hotel.description : '-'}</Typography>
                </Box>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  )
}

export default HotelItem;

const useStyle = makeStyles({
  hotelName: {
    fontWeight: '600'
  },
  listItem: {
    margin: 0,
    padding: 0,
    width: '36px',
  },
  menu: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  subtitle: {
    fontSize: '0.8rem',
    color: 'gray',
  }
});
