import React, { forwardRef } from 'react';
// Framer motion
import { motion } from 'framer-motion';
// Componnts
import Title from 'components/Title';
// MUI
import { Box, Typography } from '@mui/material';
// Data
import { whyHotelsData } from './whyHotelsData';
// Style
import classes from './style.module.scss';
import { textAnimation, textAnimationRight } from 'utilites/animations';

const WhyHotelItem: React.FC<any> = forwardRef(({ item }, ref) => {
  return (
    <Box key={item.title} className={classes.item} ref={ref}>
      <img src={item.imgUrl} alt={item.title} className={classes.image}/>

      <Box>
        <Typography className={classes.subtitle}>{item.title}</Typography>
        <Typography sx={{ opacity: 0.7 }}>{item.text}</Typography>
      </Box>
    </Box>
  );
});

const MWhyHotelItem = motion(WhyHotelItem);

const WhyHotels: React.FC = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2}}
      className={classes.whyHotels}
    >
      <Box className="container">
        <Title>Benefits of working with us</Title>
        <Box className={classes.list}>
          {whyHotelsData.map((item, ind) => (
            <MWhyHotelItem item={item} key={item.title} variants={ind % 2 === 0 ? textAnimation : textAnimationRight} custom={ind} />
          ))}
        </Box>
      </Box>
    </motion.div>
  );
};

export default WhyHotels;
