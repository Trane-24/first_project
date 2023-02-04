import React, { useMemo } from 'react';
// Redux
import { useSelector } from 'react-redux';
// Select
import { selectSelectedDate } from 'store/calendar/calendarSelectors';
// Service
import CalendarService, { Day } from 'services/Calendar.service';
// Components
import CalendarDay from './CalendarDay';
// Mui
import { Box, Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';

const CalendarBody:React.FC = () => {
  const classes = useStyles();

  const selectedDate = useSelector(selectSelectedDate);

  const weekdays = CalendarService.weekdays;

  const currentMonthDays = useMemo(() => {
    return CalendarService.getCurrentMonthDays(selectedDate);
    // eslint-disable-next-line
  }, [selectedDate]);

  const previousMonthDays = useMemo(() => {
    return CalendarService.getPreviousMonthDays(selectedDate);
    // eslint-disable-next-line
  }, [currentMonthDays]);

  const nextMonthDays = useMemo(() => {
    return CalendarService.getNextMonthDays(selectedDate);
    // eslint-disable-next-line
  }, [currentMonthDays]);

  const calendarDays = [
    ...previousMonthDays,
    ...currentMonthDays,
    ...nextMonthDays
  ];

  return (
    <Paper variant="outlined" className={classes.block}>
      <Box display="flex">
        {weekdays.map((day:string) => (
          <Box
            key={day}
            className={classes.daysOfWeek}
          >{day}</Box>
        ))}
      </Box>
      <Box className={classes.days}>
        {calendarDays.map((day:Day) => (
          <CalendarDay
            key={day.dateString}
            day={day}
          />
        ))}
      </Box>
    </Paper>
)
}

export default CalendarBody;

const useStyles = makeStyles({
  block: {
    marginTop: '20px',
    flexGrow: 0,
    display: 'flex',
    flexDirection: 'column',
    borderColor: '#DCDCDC'
  },
  daysOfWeek: {
    width: 'calc(100% / 7)',
    color: 'rgba(0,0,0,0.87)',
    fontSize: 0,
    fontWeight: 500,
    padding: '8px 12px',
    lineHeight: '22px',
    letterSpacing: '-0.4px',
    textAlign: 'center',
    '& + &': {
      borderLeft: '1px solid #DCDCDC'
    },
    '&:first-letter': {
      fontSize: '14px'
    },
    '@media (min-width: 900px)': {
      fontSize: '14px',
      textAlign: 'left',
    },
  },
  days: {
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'wrap',
  },
});
