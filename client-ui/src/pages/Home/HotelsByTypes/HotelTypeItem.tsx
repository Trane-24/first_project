import React from 'react';
import { Link } from 'react-router-dom';
// Hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
// Store
import { hotelsActions } from 'store/hotels/hotelsSlice';
// MUI
import { Box } from '@mui/material';
// Models
import IHotelType from 'models/HotelType';
// Styles
import classes from './styles.module.scss';

interface Props {
  hotelType: IHotelType;
}

const HotelTypeItem: React.FC<Props> = ({ hotelType }) => {
  const dispatch = useAppDispatch();

  const addHotelType = (value: string) => {
    dispatch(hotelsActions.changeHotelType(value));
  };

  const imgUrl = hotelType.image ? hotelType.image.path.replace('\\', '/') : '/img/hotel-no-available.png';

  return (
    <Link to={`/hotels`} onClick={() => addHotelType(hotelType._id)}>
      <Box className={classes.item}>
        <div
          style={{ backgroundImage: `linear-gradient(0deg, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.5) 100%), url('${imgUrl}')` }}
          className={classes.img}
        />
        <h4 className={classes.title}>{hotelType.name}</h4>
      </Box>
    </Link>
  )
};

export default HotelTypeItem;
