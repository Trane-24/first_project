import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
// Async
import { fetchHotels } from 'store/hotels/hotelsAsync';
// Actions
import { hotelsActions } from 'store/hotels/hotelsSlice';
// Models
import IHotel from 'models/Hotel';
// Selectors
import { selectHotels, selectParams, selectTotal } from 'store/hotels/hotelsSelectors';
// Components
import HotelTypesItem from './HotelTypesItem';
// MUI
import { Box, LinearProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { fetchHotelTypes } from 'store/hotelTypes/hotelTypesAsync';
import { IHotelType } from 'models/HotelType';
import { selectHotelsTypes } from 'store/hotelTypes/hotelTypesSelectors';

type Props = {
  ownerId?: string;
}

const HotelTypesList:React.FC<Props> = ({ ownerId }) => {
  const classes = useStyles();
  // dispatch
  const dispatch = useAppDispatch();

  const hotelTypes = useSelector(selectHotelsTypes);
  // state
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    dispatch(fetchHotelTypes({}))
      .unwrap()
      .finally(() => setIsLoading(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    return () => {
    }
    // eslint-disable-next-line
  }, [])

  if (isLoading) return <LinearProgress />
  if (!hotelTypes) return null;

  return (
    <Box className={classes.list}>
      <Box className={classes.items}>
        {hotelTypes.map((hotelType: IHotelType) => (
          <HotelTypesItem key={hotelType._id} hotelType={hotelType} />
        ))}
      </Box>
    </Box>
  )
}

export default HotelTypesList;

const useStyles = makeStyles({
  list: {
    marginTop: '20px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0px 0px 0px 1px #E0E0E0',
    overflow: 'hidden',
  },
  items: {
    maxHeight: 'calc(100vh - 202px)',
    overflowY: 'scroll',
    '@media (min-width: 600px)': {
      maxHeight: 'calc(100vh - 160px)',
    },
  },
  pagination: {
    marginTop: '6px',
    boxShadow: '0px -3px 6px -1px rgb(0 0 0 / 8%)',
  },
})
