
import React, {useEffect, useMemo} from 'react';
// Hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useWindowDimensions } from 'hooks/useWindowDimensions';
// Components
import Title from 'components/Title';
// MUI
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectHotelTypes } from 'store/hotelTypes/hotelTypesSelectors';
import { fetchHotelTypes } from 'store/hotelTypes/hotelTypesAsync';
// Styles
import './styles.scss';
import classNames from 'classnames';
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import IHotelType from 'models/HotelType';
import HotelTypeItem from './HotelTypeItem';

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
    <Box className='hotelsByTypes'>
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
