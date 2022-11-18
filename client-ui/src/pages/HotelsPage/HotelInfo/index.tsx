import React from "react";
import { useParams } from "react-router-dom";
// MUI
import { Box } from "@mui/material";
// Styles
import classes from './styles.module.scss';
import Title from "components/Title";

const HotelInfo: React.FC = () => {
  const { hotelId } = useParams();

  return (
    <section className={classes.hotelInfo}>
      <Box className={[classes.hotelInfo, 'container'].join(' ')}>
        <h2 className={classes.title}>Hotel Info</h2>
        <br />
        { hotelId }
      </Box>

    </section>
  );
};

export default HotelInfo;