import React, { useRef, useState } from "react";
import { v4 as uuid } from "uuid";
// hooks
import { useAppDispatch } from "hooks/useAppDispatch";
import useDialog from "hooks/useDialog";
// Async
import { deleteHotel, markAsAerified } from "store/hotels/hotelsAsync";
import AssetsAsync from "store/assets/assetsAsync";
// Action
import { appActions } from "store/app/appSlice";
// Models
import IHotel from "models/Hotel";
// Component
import ConfirmDeleteModal from "components/ConfirmDeleteModal";
import HotelsForm from "./HotelsForm";
// MUI
import { makeStyles } from "@mui/styles";
import {
  Accordion, AccordionDetails, AccordionSummary, Divider,
  Grid, IconButton, Menu, MenuItem, Tooltip, Typography
} from "@mui/material";
import {
  DeleteOutline as DeleteOutlineIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
  Verified as VerifiedIcon,
  Close as CloseIcon,
  ReportOutlined as ReportOutlinedIcon,
} from '@mui/icons-material';

type Props = {
  hotel: IHotel,
  onClose?: () => void;
  defaultExpanded?: boolean;
}

const HotelItem:React.FC<Props> = ({ hotel, onClose, defaultExpanded = false }) => {
  const classes = useStyle();
  const dispatch = useAppDispatch();

  const imgUrl = hotel.images?.length !== 0 ? hotel.images[0].path : '/images/hotel-no-available.png';

  // menu
  const menuRef = useRef();
  const [openMenu, setOpenMenu] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [expanded, setExpanded] = useState(defaultExpanded ? true : false);

  const handleExpanded = () => {
    if (defaultExpanded) return;
    setExpanded(prev => !prev);
  }

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

  // Verified hotel
  const verifiedHotel = (e: any) => {
    e.stopPropagation();

    dispatch(markAsAerified(hotel._id))
    .unwrap()
    .then(() => dispatch(appActions.enqueueSnackbar({
      key: uuid(),
      message: 'Hotel was verified',
    })))
  }

  // remove hotel
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
        disableGutters={true}
        expanded={expanded}
        onClick={handleExpanded}
        sx={{
          pt: defaultExpanded ? 2 : 0,
          userSelect: 'text',
          backgroundColor: expanded ? '#ededed' : '#fff',
        }}
      >
        {defaultExpanded && (
          <IconButton
            sx={{ position: 'absolute', top: '16px', right: '16px', zIndex: 1 }}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        )}
        <AccordionSummary>
          <Grid container spacing={2}>
            <Grid item xs={11} md={3} alignSelf="center" sx={{ order: -1, display: 'flex', alignItems: 'center', gap: 1 }}>
              {!hotel.verified && (
                <Tooltip title="unverified">
                  <ReportOutlinedIcon fontSize="small" />
                </Tooltip>
              )}
              <Typography className={classes.text} sx={{ fontWeight: 600 }}>{hotel.name}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={2} className={classes.item}>
              <Typography className={classes.title}>Hotel type</Typography>
              <Typography>{hotel.hotelType ? hotel.hotelType.name : '-'}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={2} className={classes.item}>
              <Typography className={classes.title}>Country</Typography>
              <Typography>{hotel.country ? hotel.country : '-'}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={2} className={classes.item}>
              <Typography className={classes.title}>City</Typography>
              <Typography>{hotel.city ? hotel.city : '-'}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={2} className={classes.item}>
              <Typography className={classes.title}>Owner</Typography>
              <Typography>{`${hotel.owner.firstName} ${hotel.owner.lastName}`}</Typography>
            </Grid>
            {!defaultExpanded && (
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

                  {!hotel.verified && (
                    <MenuItem component="div" onClick={verifiedHotel} sx={{ display: 'flex', gap: 1.5 }}>
                      <VerifiedIcon fontSize="small" />
                      Mark as verified
                    </MenuItem>
                  )}

                  <MenuItem component="div" onClick={handleOpenEditModal} sx={{ display: 'flex', gap: 1.5 }}>
                    <EditIcon fontSize="small" />
                    Edit hotel
                  </MenuItem>
                  <Divider />
                  <MenuItem component="div" onClick={handleOpenDeleteModal} sx={{ display: 'flex', gap: 1 }}>
                    <DeleteOutlineIcon />
                    Delete hotel
                  </MenuItem>
                </Menu>
              </Grid>
            )}
          </Grid>
        </AccordionSummary>

        <AccordionDetails>
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
  img: {
    width: '100%',
    height: '100%',
    maxHeight: '200px',
    objectFit: 'cover',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    '@media (min-width: 600px)': {
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
  },
});
