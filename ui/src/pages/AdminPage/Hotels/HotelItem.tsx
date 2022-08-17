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
// import hotelImg from '../../../img/hotel.png';

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

      <Accordion>
        <AccordionSummary
        sx={{
          backgroundColor: isActive ? '#ededed' : '#fff',
        }}
        onClick={handleIsActive}
      >
          {/* <Card> */}
            <Grid container sx={{ display: 'flex', alignItems: 'center'}}>
              <Grid item xs={3}>
                <Typography
                  sx={{
                    fontSize: isActive ? '1.3rem' : '1.2rem',
                    textShadow: isActive ? '1px 1px 2px grey' : '',
                }}
                >
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
              sx={{ display: 'flex', justifyContent: 'flex-end'}}
            >
              <MenuItem component="div" onClick={handleOpenEditModal}>
                <ListItem>
                  <EditIcon fontSize="small"/>
                </ListItem>
                Edit
              </MenuItem>

              <MenuItem component="div" onClick={handleOpenDeleteModal} >
                <ListItem>
                  <DeleteOutlineIcon />
                </ListItem>
                Delete
              </MenuItem>
            </Menu>
          {/* </Card> */}
        </AccordionSummary>

        <AccordionDetails
          sx={{
            display: 'flex',
            gap: 2,
            backgroundColor: isActive ? '#ededed' : '#fff',
          }}
        >
          <Box sx={{ width: '100%'}}>
            <Divider sx={{ mb: 1}} className={classes.subtitle} >Description</Divider>
            <Box sx={{ display: 'flex', gap: 2}}>
              <img
                style={{ height: '200px', }}
                src={hotel.imgUrl ? hotel.imgUrl : require('../../../img/hotel.png')}
                alt={hotel.name}
              />
                <Typography>{hotel.description ? hotel.description : '-'}</Typography>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  )
}

export default HotelItem;

const useStyle = makeStyles({
  subtitle: {
    fontSize: '0.8rem',
    color: 'gray',
  }
})