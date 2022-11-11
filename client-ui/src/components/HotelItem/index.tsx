import React from "react";
// Mui
import { Box, Typography, Button, Paper } from "@mui/material";
// Models
import IHotel from "models/Hotel";
// Styles
import classes from './styles.module.scss';
// untils
import config from "config";

interface Props {
  hotel: IHotel;
}

const HotelItem: React.FC<Props> = ({ hotel }) => {
  console.log(hotel);
  const imgUrl = hotel.images?.length !== 0 ? `${config.serverURL}/${hotel.images[0].path}` : '/img/hotel-no-available.png';

  return (
    <Paper className={classes.item}>
      <img className={classes.img} src={imgUrl} alt={hotel.name} />
      <Box className={classes.content}>
        <Typography>{hotel.name}</Typography>
        <Typography>{`${hotel.country}, ${hotel.city}`}</Typography>
        <Button className={classes.btn} variant="contained">
          Requset A Quote
        </Button>
      </Box>
    </Paper>
  );
};

export default HotelItem;
