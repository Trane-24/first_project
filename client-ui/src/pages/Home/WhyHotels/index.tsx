import React from 'react';
// Componnts
import Title from 'components/Title';
// MUI
import { Box, Typography } from '@mui/material';
// Data
import { whyHotelsData } from './whyHotelsData';
// Style
import classes from './style.module.scss';

const WhyHotels: React.FC = () => {
  return (
    <Box className={classes.whyHotels}>
      <Box className="container">
        <Title>Benefits of working with us</Title>
        <Box className={classes.list}>
          {whyHotelsData.map(item => (
            <Box key={item.title} className={classes.item}>
              <img src={item.imgUrl} alt={item.title} className={classes.image}/>

              <Box>
                <Typography className={classes.subtitle}>{item.title}</Typography>
                <Typography sx={{ opacity: 0.7 }}>{item.text}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default WhyHotels;
