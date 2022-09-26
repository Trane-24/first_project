import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LinearProgress } from '@mui/material';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { fetchReservation } from 'store/reservation/reservationAsunc';
import { useSelector } from 'react-redux';
import { selectReservations } from 'store/reservation/reservationSelectors';
import ReservationsItem from '../Reservations/ReservationsItem';
import { reservationAction } from 'store/reservation/reservationSlice';
import InfoPage from 'components/InfoPage';

const UserReservations: React.FC = () => {
  const dispatch = useAppDispatch();

  const reservation = useSelector(selectReservations);
  const [isLoading, setIsLoading] = useState(false);

  const { guestId } = useParams();

  const renderReservation = () => {
    return reservation?.map(reservation => (
      <ReservationsItem key={reservation._id} reservation={reservation}/>
    ))
  }

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchReservation({ guest: guestId }))
      .unwrap()
      .finally(() => setIsLoading(false));

    return () => {
      dispatch(reservationAction.setInitialField('params'));
      dispatch(reservationAction.setInitialField('reservations'));
    }
  }, [])

  if (isLoading) return <LinearProgress />;

  return (
    <InfoPage title='User reservation' renderFun={renderReservation} />
  );
};

export default UserReservations;
