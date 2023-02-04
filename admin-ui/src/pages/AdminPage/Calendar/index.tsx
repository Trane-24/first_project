import React from 'react';
import { useSelector } from 'react-redux';
// Selectors
import { selectIsLoading } from 'store/reservation/reservationSelectors';
// MUI
import { LinearProgress } from '@mui/material';
// Components
import CalendarBody from './CalendarBody';
import CalendarHeader from './CalendarHeader';

const Calendar: React.FC = () => {
  const isLoading = useSelector(selectIsLoading);

  return (
    <div>
      <CalendarHeader />
      {isLoading ? (
        <LinearProgress sx={{m: 1}}/>
      ) : (
        <CalendarBody />
      )}
    </div>
  );
};

export default Calendar;
