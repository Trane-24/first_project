import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
// Hooks
import { useAppDispatch } from "hooks/useAppDispatch";
import useDialog from "hooks/useDialog";
// Store
import { reservationAction } from "store/reservation/reservationSlice";
// Async
import { fetchReservation } from "store/reservation/reservationAsync";
// Selectors
import { selectParams } from "store/reservation/reservationSelectors";
// Type
import ReservationStatuses from "types/ReservationStatuses";
// MUI
import { Autocomplete, Box, Button, debounce, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material";
// Components
import ReservationForm from "./ReservationsForm";
import { makeStyles } from "@mui/styles";
import IHotel from "models/Hotel";
import { selectHotels } from "store/hotels/hotelsSelectors";
import { fetchHotels } from "store/hotels/hotelsAsync";

const ReservationHeader: React.FC = () => {
  // dispath
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
    dispatch(fetchHotels({ search: valueHotel }))
      .unwrap()
      .finally(() => setIsLoadingHotels(false))
  // eslint-disable-next-line
  }, [valueHotel]);

  useEffect(() => {
    return () => {
      dispatch(reservationAction.setInitialField('params'));
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
          <FormControl sx={{ minWidth: 300}}>
            <InputLabel id="demo-multiple-name-label">Status</InputLabel>
            <Select
              sx={{ height: '40px' }}
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={statuses}
              onChange={(e) => handleChangeStatus(e)}
              input={<OutlinedInput label="Status" />}
            >
              {Object.entries(ReservationStatuses).map((status) => {
                const [title, value] = status;

                return (<MenuItem key={value} value={value} >{title}</MenuItem>)
              })}
            </Select>
          </FormControl>

          <Autocomplete
            sx={{height: '40px'}}
            disablePortal
            options={hotels || []}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            onChange={(_, hotel: IHotel | null) => setSelectHotel(hotel)}
            value={selectHotel || null}
            getOptionLabel={(option) => option.name}
            loadingText='Please wait'
            loading={isLoadingHotels}
            noOptionsText='Dont have hotels'
            renderOption={(props, option) => (
              <li {...props} key={option._id} >
                {option.name}
              </li>
            )}
            renderInput={(params) => {
              return (
                (
                  <TextField
                    sx={{ minWidth: '300px', '& .MuiInputBase-root': { height: '40px', paddingTop: '1px'}}}
                    {...params}
                    label="Hotel"
                    onChange={(e) => {
                      setIsLoadingHotels(true);
                      debouncedChangeHandler(e);
                    }}
                  />
                )
              )
            }}
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
