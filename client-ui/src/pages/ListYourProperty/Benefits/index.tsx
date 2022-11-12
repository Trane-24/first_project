import React from 'react';
// MUI
import { Box, Typography } from '@mui/material';
// Data
import { benefitsData } from './benefitsData';
// Style
import classes from './style.module.scss';

const Benefits: React.FC = () => {
  return (
    <Box className={classes.benefits}>
      <Box className="container">
        <Typography className={classes.title}>Benefits of working with us</Typography>
        <Box className={classes.list}>
          {benefitsData.map(item => (
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

export default Benefits;
