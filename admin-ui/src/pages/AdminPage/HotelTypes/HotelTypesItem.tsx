import React, { useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import config from "config";
// hooks
import { useAppDispatch } from "hooks/useAppDispatch";
import useDialog from "hooks/useDialog";
// Async
import { deleteHotelType } from "store/hotelTypes/hotelTypesAsync";
// Action
import { appActions } from "store/app/appSlice";
// Models
import IHotelType from "models/HotelType";
// MUI
import { makeStyles } from "@mui/styles";
import {
  Box, Grid, IconButton, Menu, MenuItem,
  Tooltip, Typography,
} from "@mui/material";
import {
  DeleteOutline as DeleteOutlineIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
// Component
import ConfirmDeleteModal from "components/ConfirmDeleteModal";
import HotelTypesForm from "./HotelTypesForm";

type Props = {
  hotelType: IHotelType,
}

const HotelTypesItem:React.FC<Props> = ({ hotelType }) => {
  const classes = useStyle();
  const dispatch = useAppDispatch();

  const imgUrl = hotelType.image ? `${config.serverURL}/${hotelType.image.path}` : '/images/hotel-no-available.png';

  // menu
  const menuRef = useRef();
  const [openMenu, setOpenMenu] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);


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

  const removeHotelType = () => {
    dispatch(deleteHotelType(hotelType._id))
      .unwrap()
      .then(() => dispatch(appActions.enqueueSnackbar({
        key: uuid(),
        message: 'Hotel type was deleted',
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
        title="hotel types"
        remove={removeHotelType}
        open={openDeleteModal}
        onClose={handleCloseModal}
      />

      <Dialog>
        <HotelTypesForm onClose={closeDialog} hotelType={hotelType}/>
      </Dialog>

      <Box sx={{ p: 1}} className={classes.item}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} sx={{ order: { xs: 3, sm: 0}}}>
            <img className={classes.img} src={imgUrl} alt={hotelType.name} />
          </Grid>
          <Grid item xs={4} sm={2}>
            <Typography className={classes.title}>Type name</Typography>
            <Typography className={classes.text} sx={{ fontWeight: 600 }}>{hotelType.name}</Typography>
          </Grid>
          <Grid item xs={7} sm={5}>
            <Typography className={classes.title}>Description</Typography>
            <Typography>{hotelType.description || '-'}</Typography>
          </Grid>

          <Grid sx={{ display: 'flex', justifyContent: 'flex-end', height: '44px'}} item xs={1}>
            <Tooltip title="hotel type menu" ref={menuRef}>
              <IconButton onClick={handleOpenMenu}>
                <MoreVertIcon />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={menuRef.current}
              id={`hotelType-${hotelType._id}-menu`}
              open={openMenu}
              onClose={handleOpenMenu}
            >
              <MenuItem component="div" onClick={handleOpenEditModal} sx={{ display: 'flex', gap: 1.5 }}>
                <EditIcon fontSize="small" />
                Edit hotel type
              </MenuItem>

              <MenuItem component="div" onClick={handleOpenDeleteModal} sx={{ display: 'flex', gap: 1 }}>
                <DeleteOutlineIcon />
                Delete hotel type
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  )
}

export default HotelTypesItem;

const useStyle = makeStyles({
  item: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
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
  img: {
    height: '100px',
    width: '150px',
    objectFit: 'cover',
  }
});
