import React from 'react';
import { useNavigate } from 'react-router-dom';
// Hooks
import { useAppSelector } from 'hooks/useAppDispatch';
// Selectors
import { selectReservationByStartDay } from 'store/reservation/reservationSelectors';
// Components
import CalendarReservation from './CalendarReservation';
// Models
import IReservation from 'models/Reservation';
// Service
import { Day } from 'services/Calendar.service';
// Mui
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';
// utilites
import dayjs from 'dayjs';

type Props = {
  day: Day;
}

const CalendarDay:React.FC<Props> = ({ day }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const reservations = useAppSelector(state => selectReservationByStartDay(
    state, { startDateString: day.dateString}
  )) || [];

  const today = dayjs().format('YYYY-MM-DD');
  const isToday = today === day.dateString;

  const goToInfo = () => {
    if (reservations.length > 0) {
      navigate(`../${day.dateString}`)
    }
  };

  return (
    <Box
      onClick={goToInfo}
      id='day'
      className={classes.block}
      sx={{
        bgcolor: day.isCurrentMonth ? '#fff' : '#eee',
        cursor: day.isCurrentMonth ? 'pointer' : 'default',
        '&:hover': {
          bgcolor: day.isCurrentMonth && day.isCurrentMonth ? '#EDF8EB' : '#eee',
        },
      }}
    >
      <Box className={classes.dayWrapper}>
        <Box
          component="span"
          className={classes.day}
          sx={{
            color: isToday ? 'white' : 'initial',
            bgcolor: isToday ? '#48A8D0' : 'transparent',
          }}
        >{day.day}</Box>
      </Box>

      {reservations.length ? <Box className={classes.dote} /> : null}
      
      <Box className={classes.reservationList}>
      {reservations?.map((reservation: IReservation) => (
        <CalendarReservation
          key={reservation._id}
          reservation={reservation}
        />
      ))}
      </Box>
    </Box>
  )
}

export default React.memo(CalendarDay);

const useStyles = makeStyles({
  block: {
    paddingBottom: '6px',
    display: 'flex',
    flexDirection: 'column',
    width: 'calc(100% / 7)',
    height: '70px',
    borderLeft: '1px solid #DCDCDC',
    borderTop: '1px solid #DCDCDC',
    '&:nth-of-type(1)': {
      borderLeft: 'none'
    },
    '&:nth-of-type(7n+8)': {
      borderLeft: 'none'
    },
    '@media (min-width: 900px)': {
      paddingBottom: 0,
      height: '120px',
    },
  },
  dayWrapper: {
    textAlign: 'center',
    padding: '6px',
    '@media (min-width: 900px)': {
      textAlign: 'left',
    },
  },
  day: {
    display: 'inline-block',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    fontSize: '14px',
    fontWeight: 500,
    textAlign: 'center',
    lineHeight: '24px',
    '@media (min-width: 900px)': {
      lineHeight: '28px',
      height: '28px',
      width: '28px',
    },
  },
  dote: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    margin: '0 auto',
    backgroundColor: '#48A8D0',
    '@media (min-width: 900px)': {
      display: 'none',
    },
  },
  reservationList: {
    overflowY: 'auto',
    display: 'none',
    flexGrow: 1,
    flexDirection: 'column',
    gap: '3px',
    '@media(min-width: 900px)': {
      display: 'flex',
    },
  },
});
