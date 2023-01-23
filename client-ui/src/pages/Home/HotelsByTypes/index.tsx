
import React, {useEffect, useMemo} from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
// Hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useWindowDimensions } from 'hooks/useWindowDimensions';
// Async
import { fetchHotelTypes } from 'store/hotelTypes/hotelTypesAsync';
// Framer motion
import { motion } from 'framer-motion';
// Selectors
import { selectHotelTypes } from 'store/hotelTypes/hotelTypesSelectors';
// Models
import IHotelType from 'models/HotelType';
// MUI
import { Box } from '@mui/material';
// Components
import HotelTypeItem from './HotelTypeItem';
import Title from 'components/Title';
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

// Styles
import './swiper.scss';
import "swiper/css/pagination";
import classes from './styles.module.scss';
import { textAnimation } from 'utilites/animations';

const HotelsByTypes: React.FC = () => {
  const dispatch = useAppDispatch();
  const hotelTypes = useSelector(selectHotelTypes);

  const { width } = useWindowDimensions();

  const slidesPerViewCount = useMemo(() => {
    return width < 600 ? 1 : width < 900 ? 2 : width < 1280 ? 3 : width < 1920 ? 4 : 5;
  }, [width])

  useEffect(() => {
    dispatch(fetchHotelTypes({}))
  // eslint-disable-next-line
  }, [])

  return (
    <motion.div
      className={classes.block}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2}}

    >
      <Box className={classNames({ container: width >= 1280 })}>
        <motion.div variants={textAnimation} custom={2}>
          <Title>Hotel types</Title>
        </motion.div>
        <Swiper
          style={{
            padding: width < 1280 ? '30px 40px 40px' : '30px 3px 40px',
            width: '100%'
          }}
          slidesPerView={slidesPerViewCount}
          spaceBetween={15}
          className="mySwiper"
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
        >
          {hotelTypes?.map((hotelType: IHotelType) => (
            <SwiperSlide key={hotelType._id}>
              <HotelTypeItem hotelType={hotelType} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </motion.div>
  );
};

export default HotelsByTypes;
