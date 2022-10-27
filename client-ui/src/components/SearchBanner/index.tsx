// import { TextField } from '@mui/material';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
// import './ProductsSlider.scss';
import { sliderData } from './BannerData';
// style
import classes from './styles.module.scss';
import BannerForm from './BannerForm';

const Banner: React.FC = () => {
  const [currenSlide, setCurrenSlide] = useState(0);
  const slideLength = 3;

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
  }, [currenSlide]);

  return (
    <section className={classes.baner}>
      <div className={classes.container}>
        <BannerForm />
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
      </div>
    </section>
  );
};

export default Banner;
