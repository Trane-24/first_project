import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import './ProductsSlider.scss';
import { sliderData } from './ProductsSliderData';

const Banner: React.FC = () => {
  const [currenSlide, setCurrenSlide] = useState(0);
  const slideLength = 3;

  const autoScroll = true;
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
    if (autoScroll) {
      auto();
    }

    return () => clearInterval(slideInterval);
  }, [currenSlide]);

  return (
    <section className="productsSlider">
      <div className="productsSlider__wrap">

        <div className="productsSlider__container">
          {sliderData.map((slide, index: number) => {
            return (
              <img
                key={slide.id}
                src={slide.image}
                alt="slide"
                className={classNames(
                  'productsSlider__img',
                  { 'productsSlider__img--act': index === currenSlide },
                )}
              />
            );
          })}
        </div>

      </div>
      <img src='/img/logo.png' alt='Hotels logo' />
      <img src='/img/banner/0.png' alt='Hotels logo' />

    </section>
  );
};

export default Banner;
