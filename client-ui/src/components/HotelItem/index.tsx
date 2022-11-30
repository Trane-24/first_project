import React from "react";
// Mui
import { Box, Typography, Button, Paper } from "@mui/material";
// Models
import IHotel from "models/Hotel";
// Styles
import classes from './styles.module.scss';
// untils
import config from "config";
import { Link } from "react-router-dom";
import useDialog from "hooks/useDialog";
import ReservationForm from "components/ReservationsForm";

interface Props {
  hotel: IHotel;
}

const HotelItem: React.FC<Props> = ({ hotel }) => {
  const { Dialog, openDialog, closeDialog} = useDialog();

  const imgUrl = hotel.images?.length !== 0 ? `${config.serverURL}/${hotel.images[0].path}` : '/img/hotel-no-available.png';

  return (
    <React.Fragment>
      <Dialog>
        <ReservationForm onClose={closeDialog} hotel={hotel} />
      </Dialog>

      <Paper className={classes.item}>
        <Link to={`/hotels/${hotel._id}`}>
          <Box className={classes.img_box}>
            <img className={classes.img} src={imgUrl} alt={hotel.name} />
          </Box>
        </Link>
        <Box className={classes.content}>
          <Typography>{hotel.name}</Typography>
          <Typography>{`${hotel.country}, ${hotel.city}`}</Typography>
          <Button
            className={classes.btn}
            variant="contained"
            onClick={openDialog}
          >
            Reserve
          </Button>
        </Box>
      </Paper>
    </React.Fragment>
  );
};

export default HotelItem;
