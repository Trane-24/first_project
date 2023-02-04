import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { IconButton, LinearProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { fetchReservation } from 'store/reservation/reservationAsync';
import { useSelector } from 'react-redux';
import { selectReservations } from 'store/reservation/reservationSelectors';
import ReservationsItem from '../Reservations/ReservationsItem';
import IReservation from 'models/Reservation';
import dayjs from 'dayjs';

const CalendarReservationInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { day } = useParams();
  const classes = useStyles();

  const isValidDate = dayjs(day, 'YYYY-MM-DD').isValid();
  if (!isValidDate) navigate('/');

  // Selectors
  const reservations = useSelector(selectReservations);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    dispatch(fetchReservation({ start: day, end: day}))
      .finally(() => setIsLoading(false))

  },[]);

  return (
    <div>
      <div className={classes.header}>
        <IconButton onClick={() => navigate(-1)}>
          <KeyboardBackspaceIcon />
        </IconButton>

        <span>{dayjs(day).format('DD MMMM YYYY')}</span>
      </div>

      {!isLoading ? (
        <React.Fragment>
          {reservations && reservations.length > 0 ? (
            <div className={classes.list}>
              {reservations?.map((reservation: IReservation) => (
                <ReservationsItem reservation={reservation} readOnly={true} key={reservation._id} />
              ))}
            </div>
          ) : (
            <div>Empty</div>
          )}
        </React.Fragment>
      ) : (
        <LinearProgress />
      )}
      
    </div>
  );
};

export default CalendarReservationInfo;

const useStyles = makeStyles({
  header: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  list: {
    marginTop: '20px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0px 0px 0px 1px #E0E0E0',
    maxHeight: 'calc(100vh - 148px)',
    overflowY: 'auto',
    '@media (min-width: 600px)': {
      maxHeight: 'calc(100vh - 156px)',
    },
  },
})
