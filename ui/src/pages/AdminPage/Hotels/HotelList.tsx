import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
// Async
import { fetchHotels } from 'store/hotels/hotelsAsync';
// Models
import IHotel from 'models/Hotel';
// Selectors
import { selectHotels } from 'store/hotels/hotelsSelectors';
// Components
import HotelItem from './HotelItem';
// MUI
import { Box, LinearProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';

const HotelList:React.FC = () => {
  const classes = useStyles();
  // dispatch
  const dispatch = useAppDispatch();
  // state
  const hotels = useSelector(selectHotels);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    dispatch(fetchHotels({}))
      .unwrap()
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <LinearProgress />
  if (!hotels) return null;

  return (
    <Box className={classes.list}>
      {hotels.map((hotel: IHotel) => (
        <HotelItem key={hotel._id} hotel={hotel} />
      ))}
    </Box>
  )
}

export default HotelList;

const useStyles = makeStyles({
  list: {
    padding: '0 5px',
    boxShadow: '0 0 10px 1px rgba(0,0,0,0.2)',
    borderRadius: '8px',
    marginTop: '40px',
    maxHeight: 'calc(100vh - 170px)',
    overflowY: 'scroll'
  }
})