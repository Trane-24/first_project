import React from 'react';
// MUI
import { Box, Typography } from '@mui/material';
// Data
import { benefitsData } from './HowItWorksData';
// Style
import classes from './style.module.scss';

const HowItWorks: React.FC = () => {
  return (
    <Box className={classes.how_it_works} data-container="how-it-works">
      <Box className="container">
        <Typography className={classes.title}>How it works</Typography>
        <Box className={classes.list}>
          {benefitsData.map((item) => (
            <Box key={item.title} className={classes.item}>
              <img src={item.imgUrl} alt={item.title} className={classes.image}/>

              <Box>
                <Typography className={classes.subtitle}>{item.title}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default HowItWorks;
