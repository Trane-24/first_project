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
import { Accordion, AccordionDetails, AccordionSummary, Grid, IconButton, ListItem, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import {
  DeleteOutline as DeleteOutlineIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';

type Props = {
  hotel: IHotel,
}

const HotelItem:React.FC<Props> = ({ hotel }) => {
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

      <Accordion
        sx={{
          p: 2,
          backgroundColor: isActive ? '#ddd' : '#fff',
        }}
        onClick={handleIsActive}
      >
        <AccordionSummary >
          {/* <Card> */}
            <Grid container>
              <Grid item xs={3}>
                <Typography>{hotel.name}</Typography>
              </Grid>

              <Grid item xs={3}>
                <Typography sx={{ fontSize: '0.8rem', color: 'gray' }}>
                  Country
                </Typography>

                <Typography>
                  {hotel.country ? hotel.country : '-'}
                </Typography>
              </Grid>

              <Grid item xs={2}>
                <Typography sx={{ fontSize: '0.8rem', color: 'gray' }}>
                  City
                </Typography>

                <Typography>
                  {hotel.city ? hotel.city : '-'}
                </Typography>
              </Grid>

              <Grid item xs={3}>
                <Typography sx={{ fontSize: '0.8rem', color: 'gray' }}>
                  Owner
                </Typography>

                <Typography>
                  {`${hotel.owner.firstName} ${hotel.owner.lastName}`}
                </Typography>
              </Grid>

              <Grid item xs={1}>
                <Tooltip title="hotel menu" ref={menuRef}>
                  <IconButton onClick={handleOpenMenu}>
                    <MoreVertIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>

            <Menu
              anchorEl={menuRef.current}
              id="hotel-menu"
              open={openMenu}
              onClose={handleOpenMenu}
            >
              <MenuItem onClick={handleOpenEditModal}>
                <ListItem>
                  <EditIcon fontSize="small"/>
                </ListItem>
                Edit
              </MenuItem>

              <MenuItem onClick={handleOpenDeleteModal} >
                <ListItem>
                  <DeleteOutlineIcon />
                </ListItem>
                Delete
              </MenuItem>
            </Menu>
          {/* </Card> */}
        </AccordionSummary>

        <AccordionDetails sx={{ display: 'flex', gap: 2}}>
          <img style={{ height: '200px', }} src={hotel.imgUrl} alt={hotel.name} />
          <Typography>{hotel.description}</Typography>
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  )
}

export default HotelItem;