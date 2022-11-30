
import React, {useEffect, useMemo} from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
// Hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useWindowDimensions } from 'hooks/useWindowDimensions';
// Async
import { fetchHotelTypes } from 'store/hotelTypes/hotelTypesAsync';
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
// Styles
import './swiper.scss';
import classes from './styles.module.scss';

const HotelsByTypes: React.FC = () => {
  const dispatch = useAppDispatch();
  const hotelTypes = useSelector(selectHotelTypes);

  const { width } = useWindowDimensions();

  const slidesPerViewCount = useMemo(() => {
    return width < 600 ? 1 : width < 900 ? 2 : width < 1240 ? 3 : width < 1920 ? 4 : 5;
  }, [width])

  useEffect(() => {
    dispatch(fetchHotelTypes({}))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box className={classes.block}>
      <Box className={classNames({ container: width >= 1240 })}>
        <Title>Hotel types</Title>
        <Swiper
          style={{
            padding: width < 1240 ? '30px 40px 3px' : '30px 3px 3px',
            width: '100%'
          }}
          slidesPerView={slidesPerViewCount}
          spaceBetween={15}
          className="mySwiper"
        >
          {hotelTypes?.map((hotelType: IHotelType) => (
            <SwiperSlide key={hotelType._id}>
              <HotelTypeItem hotelType={hotelType} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default HotelsByTypes;
