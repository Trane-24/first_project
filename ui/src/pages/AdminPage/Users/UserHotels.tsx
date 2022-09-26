import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LinearProgress } from '@mui/material';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import InfoPage from 'components/InfoPage';
import { selectHotels } from 'store/hotels/hotelsSelectors';
import HotelItem from '../Hotels/HotelItem';
import { fetchHotels } from 'store/hotels/hotelsAsync';
import { hotelsActions } from 'store/hotels/hotelsSlice';

const UserHotels: React.FC = () => {
  const dispatch = useAppDispatch();

  const hotels = useSelector(selectHotels);
  const [isLoading, setIsLoading] = useState(false);

  const { ownerId } = useParams();

  const renderReservation = () => {
    return hotels?.map(hotel => (
      <HotelItem key={hotel._id} hotel={hotel}/>
    ))
  }

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchHotels({ owner: ownerId }))
      .unwrap()
      .finally(() => setIsLoading(false));

    return () => {
      dispatch(hotelsActions.setInitialField('params'));
      dispatch(hotelsActions.setInitialField('hotels'));
    }
  }, [])

  if (isLoading) return <LinearProgress />;

  return (
    <InfoPage title='User hotels' renderFun={renderReservation} />
  );
};

export default UserHotels;
