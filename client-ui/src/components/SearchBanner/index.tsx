// import { TextField } from '@mui/material';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
// import './ProductsSlider.scss';
// style
import classes from './styles.module.scss';
import BannerForm from './BannerForm';

const sliderData = [
  { image: '/img/0.png', id: 1 },
  { image: '/img/1.png', id: 2 },
  { image: '/img/2.png', id: 3 },
];

const Banner: React.FC = () => {
  const [currenSlide, setCurrenSlide] = useState(0);
  const slideLength = sliderData.length;

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
    <section className={classes.banner}>
      <div className={[classes.bannerContent, 'container'].join(' ')}>
        <BannerForm />
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
    </section>
  );
};

export default Banner;
