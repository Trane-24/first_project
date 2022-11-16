import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
// style
import classes from './styles.module.scss';
import BannerForm from './BannerForm';
import { useLocation } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

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
    <section className={classes.banner} style={{
      padding: isHomePage ? '120px 0' : '40px 0',
    }}>
      <div className='container'>
        <Box sx={{
          color: '#fff',
          textShadow: '0 0 5px rgba(0, 0, 0, 0.4)',
          display: isHomePage ? 'block' : 'none',
          position: 'relative',
          zIndex: 1
        }}>
          <Typography sx={{ fontSize: '40px' }}>Hotels, our new rental platform</Typography>
          <Typography sx={{ fontSize: '18px' }}>Find your perfect Stay. We specialize in luxury vacation rentals. Let's get started on your next journey</Typography>
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
                { [`${classes.imgAct}`] : index === currenSlide },
              )}
            />
        );
      })}
      <div className={classes.imgShadow} />
    </section>
  );
};

export default Banner;