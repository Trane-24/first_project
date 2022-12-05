import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
// Framer motion
import { motion } from 'framer-motion';
// Components
import BannerForm from './BannerForm';
// MUI
import { Box, Typography } from '@mui/material';
// Styles
import classes from './styles.module.scss';
// Utilites
import { textAnimation } from 'utilites/animations';

const sliderData = [
  { image: '/img/0.png', id: 1 },
  { image: '/img/1.png', id: 2 },
  { image: '/img/2.png', id: 3 },
];

const Banner: React.FC = () => {
  const [currenSlide, setCurrenSlide] = useState(0);
  const slideLength = sliderData.length;

  const { pathname } = useLocation();
  const isHomePage = pathname.split('/')[1] === '';

  // Slider
  let slideInterval: NodeJS.Timer;
  const intervalTime = 5000;

  const nextSlide = () => {
    setCurrenSlide(currenSlide === slideLength - 1 ? 0 : currenSlide + 1);
  };

  const auto = () => {
    slideInterval = setInterval(nextSlide, intervalTime);
  };

  useEffect(() => {
    setCurrenSlide(0);
  }, []);

  useEffect(() => {
    auto();

    return () => clearInterval(slideInterval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currenSlide]);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2}}
      className={classes.banner}
      style={{
        padding: isHomePage ? '120px 0' : '40px 0',
      }}
    >
      <div className='container'>
        <Box sx={{
          color: '#fff',
          textShadow: '0 0 5px rgba(0, 0, 0, 0.4)',
          display: isHomePage ? 'block' : 'none',
          position: 'relative',
          zIndex: 1
        }}>
          <motion.div custom={1} variants={textAnimation}>
            <Typography sx={{ fontSize: '40px' }}>Make your dream trip happen</Typography>
          </motion.div>

          <motion.div custom={2} variants={textAnimation}>
            <Typography sx={{ fontSize: '18px' }}>augue neque gravida in fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla</Typography>
          </motion.div>
        </Box>

        <BannerForm isHomePage={isHomePage} />
      </div>
      {sliderData.map((slide, index: number) => {
        return (
            <img
              key={slide.id}
              src={slide.image}
              alt="slide"
              className={classNames(
                classes.img,
                { [classes.imgAct]: index === currenSlide },
              )}
            />
        );
      })}
      <div className={classes.imgShadow} />
    </motion.section>
  );
};

export default Banner;