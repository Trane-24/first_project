import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// Hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
// Async
import { fetchHotelTypes } from 'store/hotelTypes/hotelTypesAsync';
// Selectors
import { selectHotelTypes } from 'store/hotelTypes/hotelTypesSelectors';
// Models
import IHotelType from 'models/HotelType';
// MUI
import { makeStyles } from '@mui/styles';
import { Box, LinearProgress } from '@mui/material';
// Components
import HotelTypesItem from './HotelTypesItem';

type Props = {
  ownerId?: string;
}

const HotelTypesList:React.FC<Props> = ({ ownerId }) => {
  const classes = useStyles();
  // dispatch
  const dispatch = useAppDispatch();

  const hotelTypes = useSelector(selectHotelTypes);
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
      {!!hotelTypes.length ? (
        <Box className={classes.items}>
          {hotelTypes.map((hotelType: IHotelType) => (
            <HotelTypesItem key={hotelType._id} hotelType={hotelType} />
          ))}
        </Box>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center'}}>
          <p style={{ position: 'absolute'}}>List is empty</p>
          <img
            className={classes.image}
            src="/images/list_is_empty.jpg"
            alt="reservation_is_empty"
          />
        </div>
      )}
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
    maxHeight: 'calc(100vh - 140px)',
    overflowY: 'scroll',
    '@media (min-width: 600px)': {
      maxHeight: 'calc(100vh - 160px)',
    },
  },
  pagination: {
    marginTop: '6px',
    boxShadow: '0px -3px 6px -1px rgb(0 0 0 / 8%)',
  },
  image: {
    maxHeight: 'calc(100vh - 148px)',
    '@media (min-width: 600px)': {
      maxHeight: 'calc(100vh - 156px)',
    },
  }
})
