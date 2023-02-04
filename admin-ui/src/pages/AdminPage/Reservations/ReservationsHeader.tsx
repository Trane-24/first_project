import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
// Hooks
import { useAppDispatch } from "hooks/useAppDispatch";
import useDialog from "hooks/useDialog";
// Async
import { fetchReservation } from "store/reservation/reservationAsync";
import { fetchHotels } from "store/hotels/hotelsAsync";
// Actions
import { reservationAction } from "store/reservation/reservationSlice";
import { hotelsActions } from "store/hotels/hotelsSlice";
// Selectors
import { selectParams } from "store/reservation/reservationSelectors";
import { selectHotels } from "store/hotels/hotelsSelectors";
// Models
import IHotel from "models/Hotel";
// Type
import ReservationStatuses from "types/ReservationStatuses";
// MUI
import { makeStyles } from "@mui/styles";
import {
  Autocomplete, Box, Button, Chip, debounce,
  MenuItem, TextField, Typography
} from "@mui/material";
// Components
import ReservationForm from "./ReservationsForm";
// Utilites
import { capitalizeFirstLetter } from 'utilites/stringFormatter';

const ReservationHeader: React.FC = () => {
  // dispatсh
  const dispatch = useAppDispatch();
  // Styles
  const classes = useStyles();
  // Selectors
  const params = useSelector(selectParams);
  const hotels = useSelector(selectHotels);
  // State
  const [statuses, setStatuses] = useState([ReservationStatuses.Submitted, ReservationStatuses.Completed]);
  const [stateParams, setStateParams] = useState(params);
  const [selectHotel, setSelectHotel] = useState<IHotel | null>(null);
  const [isLoadingHotels, setIsLoadingHotels] = useState(false);
  const [valueHotel, setValueHotel] = useState('');
  // Dialog
  const {Dialog, openDialog, closeDialog} = useDialog();

  const handleChangeStatus = (e: any) => {
    const { value } = e.target;
    if (value.length === 0) return;

    setStatuses(value);

    setStateParams({
      ...stateParams,
      statuses: statuses,
      page: 1,
    })
  };

  const changeQueryValue = (e: any) => {
    const { value } = e.target;
    setValueHotel(value.trim());
  };

  // eslint-disable-next-line
  const debouncedChangeHandler = useCallback(
    debounce(changeQueryValue, 1000)
  , []);

  useEffect(() => {
    dispatch(fetchReservation({ ...stateParams, statuses, hotelId: selectHotel?._id}))
  // eslint-disable-next-line
  }, [stateParams, selectHotel]);

  useEffect(() => {
    dispatch(fetchHotels({ search: valueHotel, limit: 20 }))
      .unwrap()
      .finally(() => setIsLoadingHotels(false))
  // eslint-disable-next-line
  }, [valueHotel]);

  useEffect(() => {
    return () => {
      dispatch(reservationAction.setInitialField('params'));
      dispatch(reservationAction.setInitialField('reservations'));
      dispatch(hotelsActions.setInitialField('params'));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
    <Dialog>
      <ReservationForm onClose={closeDialog}/>
    </Dialog>

    <Box className={classes.header}>
      <Typography className={classes.title} variant='h5' sx={{ pr: 1 }}>Reservations</Typography>
        <Box className={classes.headeContent}>
          <TextField
            sx={{ minWidth: { xs: '100%', md: '220px' } }}
            label="Statuses"
            value={statuses}
            onChange={(e) => handleChangeStatus(e)}
            select
            size="small"
            SelectProps={{
              multiple: true,
              renderValue: (statuses: any) => (
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  {statuses.map((status: any) => (
                    <Chip
                      key={status}
                      label={capitalizeFirstLetter(status)}
                      size="small"
                      sx={{ height: '23px' }}
                    />
                  ))}
                </Box>
              ),
            }}
          >
          {Object.entries(ReservationStatuses).map((status) => {
            const [title, value] = status;

            return (<MenuItem key={value} value={value} >{title}</MenuItem>)
          })}
          </TextField>

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
          <Button sx={{ height: '40px' }} variant='contained' onClick={openDialog}>Add reservation</Button>
        </Box>
    </Box>
  </React.Fragment>
  )
};

export default ReservationHeader;

const useStyles = makeStyles({
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    wrap: 'flex-wrap',
    '@media (min-width: 1140px)': {
      flexDirection: 'row',
    }
  },
  title: {
    alignSelf: 'flex-start',
    marginBottom: '10px',
    '@media (min-width: 1140px)': {
      alignSelf: 'center',
      marginBottom: '0',
    }
  },
  headeContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '8px',
    '@media (min-width: 1140px)': {
      flexDirection: 'row',
      alignItems: 'center',
      width: 'max-content',
    }
  },
});
