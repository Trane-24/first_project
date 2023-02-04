import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// Hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
// Async
import { fetchHotels } from 'store/hotels/hotelsAsync';
import { fetchReservation } from 'store/reservation/reservationAsync';
// Actions
import { CalendarActions } from 'store/calendar/calendarSlice';
import { reservationAction } from 'store/reservation/reservationSlice';
// Models
import IHotel from 'models/Hotel';
// Selectors
import { selectParams, selectSelectedDate } from 'store/calendar/calendarSelectors';
import { selectHotels } from 'store/hotels/hotelsSelectors';
// Mui
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Autocomplete, Box, Button, debounce, IconButton, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';
// utilites
import dayjs from 'dayjs';

const CalendarHeader:React.FC = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const selectedDate = useSelector(selectSelectedDate);
  const hotels = useSelector(selectHotels);
  const params = useSelector(selectParams);

  const [selectHotel, setSelectHotel] = useState<IHotel | null>(null);
  const [isLoadingHotels, setIsLoadingHotels] = useState(false);
  const [valueHotel, setValueHotel] = useState('');

  const changeQueryValue = (e: any) => {
    const { value } = e.target;
    setValueHotel(value.trim());
  };

  // eslint-disable-next-line
  const debouncedChangeHandler = useCallback(
    debounce(changeQueryValue, 1000)
  , []);

  const dateStringFormat = dayjs(selectedDate).format('YYYY, MMMM');

  const handlePrevMonth = () => {
    const prevMonth = dayjs(selectedDate).subtract(1, 'month');

    dispatch(CalendarActions.setSelectedDate(prevMonth));
  }

  const handleNextMonth = () => {
    const nextMonth = dayjs(selectedDate).add(1, 'month');

    dispatch(CalendarActions.setSelectedDate(nextMonth));
  }

  const handleChange = (date: any) => {
    dispatch(CalendarActions.setSelectedDate(date));
  }

  const handleToday = () => {
    dispatch(CalendarActions.setSelectedDate(dayjs().startOf('month')));
  }

  useEffect(() => {
    dispatch(fetchHotels({ search: valueHotel, limit: 20 }))
      .unwrap()
      .finally(() => setIsLoadingHotels(false))
  // eslint-disable-next-line
  }, [valueHotel]);

  useEffect(() => {
    dispatch(fetchReservation({...params, hotelId: selectHotel?._id}))
  // eslint-disable-next-line
  }, [params, selectHotel]);

  useEffect(() => {
    return () => {
      dispatch(CalendarActions.setInitialField('selectedDate'))
      dispatch(CalendarActions.setInitialField('params'))
      dispatch(reservationAction.setInitialField('params'))
      dispatch(reservationAction.setInitialField('reservations'))
    }
  }, [])

  return (
    // <Box className={classes.header}>
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant='h5' className={classes.title}>Calendar</Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

          <Box sx={{ alignItems: 'center', gap: 0.5, display: { xs: 'none', md: 'flex' } }}>
            
            <Autocomplete
              disablePortal
              options={hotels || []}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              onChange={(_, hotel: IHotel | null) => setSelectHotel(hotel)}
              value={selectHotel}
              getOptionLabel={(option) => option.name}
              loadingText='Please wait'
              loading={isLoadingHotels}
              noOptionsText='Dont have hotels'
              renderOption={(props, option) => (
                <li {...props} key={option._id} >
                  {option.name}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  sx={{ minWidth: { xs: '100%', md: '220px' } }}
                  {...params}
                  label="Hotel"
                  size="small"
                  onChange={(e) => {
                    setIsLoadingHotels(true);
                    debouncedChangeHandler(e);
                  }}
                />
              )}
            />

            <IconButton
              size="small"
              onClick={handlePrevMonth}
            ><ChevronLeftIcon /></IconButton>
            <Typography>{dateStringFormat}</Typography>
            <IconButton
              size="small"
              onClick={handleNextMonth}
            ><ChevronRightIcon /></IconButton>
          </Box>

          <Button
            variant="outlined"
            onClick={handleToday}
          >Today</Button>

          <DatePicker
            views={['year', 'month']}
            openTo="year"
            value={selectedDate}
            disableMaskedInput
            onChange={() => {}}
            onMonthChange={(date) => handleChange(date)}
            renderInput={({ inputRef, InputProps }) => (
              <Box ref={inputRef} sx={{ marginRight: '16px'}}>
                {InputProps?.endAdornment}
              </Box>
            )}
          />

        </Box>
      </Box>
      <Box sx={{
        pt: 1, display: { xs: 'flex', md: 'none' }, alignItems: 'center', justifyContent: 'space-between', gap: 0.5,
      }}>
        <Autocomplete
          sx={{ width: '50%'}}
          disablePortal
          options={hotels || []}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          onChange={(_, hotel: IHotel | null) => setSelectHotel(hotel)}
          value={selectHotel}
          getOptionLabel={(option) => option.name}
          loadingText='Please wait'
          loading={isLoadingHotels}
          noOptionsText='Dont have hotels'
          renderOption={(props, option) => (
            <li {...props} key={option._id} >
              {option.name}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              sx={{ minWidth: { xs: '100%', md: '220px' } }}
              {...params}
              label="Hotel"
              size="small"
              onChange={(e) => {
                setIsLoadingHotels(true);
                debouncedChangeHandler(e);
              }}
            />
          )}
        />

        <IconButton
          size="small"
          onClick={handlePrevMonth}
        ><ChevronLeftIcon /></IconButton>
        <Typography>{dateStringFormat}</Typography>
        <IconButton
          size="small"
          onClick={handleNextMonth}
        ><ChevronRightIcon /></IconButton>
      </Box>
    </Box>
  )
}

export default CalendarHeader;

const useStyles = makeStyles({
  header: {
    height: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    '@media (min-width: 700px)': {
      flexDirection: 'row',
    }
  },
  title: {
    alignSelf: 'center',
  },
  headerContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    '@media (min-width: 700px)': {
      flexDirection: 'row',
      width: 'max-content',
    }
  },
  textFild: {
    width: '100%',
    paddingRight: '0',
    '@media (min-width: 700px)': {
      width: '200px',
      paddingRight: '8px',
    }
  }
});
