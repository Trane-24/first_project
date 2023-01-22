import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
// hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useWindowDimensions } from 'hooks/useWindowDimensions';
// Framer motion
import { motion } from 'framer-motion';
// Component
import HotelItem from 'components/HotelItem';
import Title from 'components/Title';
// MUI
import { Box } from '@mui/material';
import IHotel from 'models/Hotel';
import { fetchTopHotels } from 'store/hotels/hotelsAsync';
import { selectHotels } from 'store/hotels/hotelsSelectors';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
// Styles
import './styles.scss';
import classNames from 'classnames';
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { NavLink } from 'react-router-dom';
import { textAnimation, textAnimationRight } from 'utilites/animations';

const TopHotels: React.FC = () => {
  const dispatch = useAppDispatch();
  const hotels = useSelector(selectHotels);

  const { width } = useWindowDimensions();

  const slidesPerViewCount = useMemo(() => {
    return width < 600 ? 1.2 : width < 1280 ? 2.2 : width < 1920 ? 3 : 4;
  }, [width]);

  useEffect(() => {
    dispatch(fetchTopHotels({}))
  // eslint-disable-next-line
  }, []);

  if (!hotels) {
    return null;
  }

  return (
    <Box className='topHotels'>
      <Box className={classNames({ container: width >= 1280 })}>
        <motion.div
          className="header"
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2}}
        >
          <motion.div variants={textAnimation} custom={2}>
            <Title>Top Hotels</Title>
          </motion.div>

          <motion.div variants={textAnimationRight} custom={2}>
          <NavLink to="/hotels" className="btn">
            View All
            <ArrowForwardOutlinedIcon />
          </NavLink>
          </motion.div>

        </motion.div>

        <Swiper
          style={{ padding: ' 30px 3px 3px' }}
          slidesPerView={slidesPerViewCount}
          spaceBetween={20}
          className="mySwiper"
        >
          {hotels.map((hotel: IHotel) => (
            <SwiperSlide key={hotel._id}>
              <HotelItem hotel={hotel} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default TopHotels;
