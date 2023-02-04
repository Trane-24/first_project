
import React, { useCallback, useEffect, useState }  from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
// Hooks
import { useAppDispatch } from "hooks/useAppDispatch";
// Async
import { createReservation, updateReservation } from "store/reservation/reservationAsync";
import { fetchUsers } from "store/users/usersAsync";
import { fetchHotels } from "store/hotels/hotelsAsync";
// Actions
import { appActions } from "store/app/appSlice";
// Selectors
import { selectUsers } from "store/users/usersSelectors";
import { selectHotels } from "store/hotels/hotelsSelectors";
// Models
import IReservation from "models/Reservation";
import IUser from "models/User";
// Types
import ReservationStatuses from "types/ReservationStatuses";
// Mui
import { LoadingButton } from "@mui/lab";
import { MobileDatePicker } from "@mui/x-date-pickers";
import {
  Autocomplete, Button, Grid, TextField,
  debounce, MenuItem, DialogTitle, DialogActions, DialogContent, Checkbox, FormControlLabel
} from "@mui/material";
// utilites
import { isRequired } from "utilites/validation";
import IHotel from "models/Hotel";

interface Props {
  onClose: () => void;
  reservation?: IReservation | null;
}

interface IForm {
  startDate: string;
  endDate: string;
  notes?: string;
  guestId: any;
  hotelId: any;
  status: ReservationStatuses;
  includeIntoCheckInCalendar: boolean;
}

const ReservationForm: React.FC<Props> = ({ onClose, reservation }) => {
  const dispatch = useAppDispatch();
  const users = useSelector(selectUsers);
  const hotels = useSelector(selectHotels);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGuests, setIsLoadingGuests] = useState(false);
  const [isLoadingHotels, setIsLoadingHotels] = useState(false);

  const [valueGuest, setValueGuest] = useState('');
  const [valueHotel, setValueHotel] = useState('');

  const {handleSubmit, watch, control, formState: {errors}, setValue} = useForm<IForm>({
    defaultValues: {
      startDate: reservation ? reservation.startDate : '',
      endDate: reservation ? reservation.endDate : '',
      notes: reservation ? reservation.notes : '',
      guestId: reservation ? reservation.guest : null,
      hotelId: reservation ? reservation.hotel : null,
      status: reservation ? reservation.status :  ReservationStatuses.Completed,
      includeIntoCheckInCalendar: reservation ? reservation.includeIntoCheckInCalendar : true,
    }
  });

  const startDate = watch('startDate');
  const endDate = watch('endDate');

  const changeQueryValue = (e: any) => {
    const { name, value } = e.target;

    switch (name) {
      case 'guestId':
        setValueGuest(value);
        break;
      case 'hotelId':
        setValueHotel(value);
        break;
      default:
        break;
    }
  };

  // eslint-disable-next-line
  const debouncedChangeHandler = useCallback(
    debounce(changeQueryValue, 1000)
  , []);

  const onSubmit= handleSubmit((data: IForm) => {
    setIsLoading(true);

    const nextData:any = {
      ...data,
      startDate: dayjs(data.startDate).format('YYYY-MM-DD'),
      endDate: dayjs(data.endDate).format('YYYY-MM-DD'),
      guestId: data.guestId._id,
      hotelId: data.hotelId._id,
      status: data.status,
      includeIntoCheckInCalendar: data.includeIntoCheckInCalendar,
    };

     if (reservation) {
      dispatch(updateReservation({
        reservationId: reservation._id,
        reservationData: nextData,
      }))
        .then(() => dispatch(appActions.enqueueSnackbar({
          key: uuid(),
          message: 'Reservation was updated'
        })))
        .then(() => onClose())
        .finally(() => setIsLoading(false))
     } else {
      dispatch(createReservation(nextData))
        .unwrap()
        .then(() => dispatch(appActions.enqueueSnackbar({
          key: uuid(),
          message: 'Reservation was created'
        })))
        .then(() => onClose())
        .finally(() => setIsLoading(false))
     }
  });

  useEffect(() => {
    dispatch(fetchUsers({ role: 'guest', search: valueGuest}))
      .unwrap()
      .finally(() => setIsLoadingGuests(false))
  // eslint-disable-next-line
  }, [valueGuest]);

  useEffect(() => {
    dispatch(fetchHotels({ search: valueHotel }))
      .unwrap()
      .finally(() => setIsLoadingHotels(false))
  // eslint-disable-next-line
  }, [valueHotel]);

  useEffect(() => {
    const newStartDate = dayjs(startDate).format('YYYY-MM-DD');
    const newEndDate = dayjs(endDate).format('YYYY-MM-DD');
    if (newStartDate >= newEndDate && !!endDate) {
      setValue('endDate', startDate
        ? dayjs(startDate).add(1, 'day').format('YYYY-MM-DD')
        : dayjs(endDate).format('YYYY-MM-DD'));
    }
  // eslint-disable-next-line
  }, [startDate, endDate])

  return (
    <React.Fragment>
      <DialogTitle>
        {`${reservation ? 'Update' : 'Add'} reservation`}
      </DialogTitle>

      <DialogContent dividers>
        <form noValidate>
          <Grid container spacing={2} sx={{ pt: 2, pb: 1 }}>
            {/* startDate */}
            <Grid item xs={12}>
              <Controller
                control={control} name="startDate"
                rules={{ required: isRequired}}
                render={({ field }) => (
                  <MobileDatePicker
                    { ...field }
                    disablePast
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Start date"
                        fullWidth
                        required
                        error={!!errors?.startDate}
                        helperText={errors?.startDate ? errors.startDate.message : null}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            {/* endDate */}
            <Grid item xs={12}>
              <Controller
                control={control} name="endDate"
                rules={{ required: isRequired}}
                render={({ field }) => (
                  <MobileDatePicker
                    { ...field }
                    disablePast
                    minDate={dayjs(startDate).add(1, 'day')}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="End date"
                        fullWidth
                        required
                        error={!!errors?.endDate}
                        helperText={errors?.endDate ? errors.endDate.message : null}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            {/* notes */}
            <Grid item xs={12}>
              <Controller
                control={control} name="notes"
                render={({ field }) => (
                  <TextField
                    {...field}
                    multiline
                    rows={3}
                    label="Notes"
                    fullWidth
                    error={!!errors?.notes}
                    helperText={errors?.notes ? errors.notes.message : null}
                  />
                )}
              />
            </Grid>

            {/* status */}
            {reservation && (
              <Grid item xs={12}>
              <Controller
                control={control} name="status"
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    multiline
                    label="Status"
                    fullWidth
                    error={!!errors?.notes}
                  >
                    {Object.entries(ReservationStatuses).map((status) => {
                      const [title, value] = status;

                      return (<MenuItem key={value} value={value} >{title}</MenuItem>)
                    })}
                  </TextField>
                )}
              />
            </Grid>
            )}

            {/* guestId */}
            <Grid item xs={12}>
              <Controller
                control={control} name="guestId"
                rules={{ required: isRequired}}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    disablePortal
                    options={users || []}
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    onChange={(_, guest: IUser | null) => onChange(guest)}
                    value={value || null}
                    getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                    loadingText='Please wait'
                    loading={isLoadingGuests}
                    noOptionsText='Dont have gusts'
                    renderOption={(props, option) => (
                      <li {...props} key={option._id} >
                        {`${option.firstName} ${option.lastName}`}
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="guestId"
                        label="Guest"
                        required
                        error={Boolean(errors.guestId)}
                        helperText={errors.guestId ? `${errors.guestId.message}` : ''}
                        onChange={(e) => {
                          setIsLoadingGuests(true);
                          debouncedChangeHandler(e)
                        }}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            {/* hotelId */}
            <Grid item xs={12}>
              <Controller
                control={control} name="hotelId"
                rules={{ required: isRequired}}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    disablePortal
                    options={hotels || []}
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    onChange={(_, hotel: IHotel | null) => onChange(hotel)}
                    value={value || null}
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
                        {...params}
                        name="hotelId"
                        label="Hotel"
                        required
                        error={Boolean(errors.hotelId)}
                        helperText={errors.hotelId ? `${errors.hotelId.message}` : ''}
                        onChange={(e) => {
                          setIsLoadingHotels(true);
                          debouncedChangeHandler(e);
                        }}
                      />
                    )}
                  />
                )}
              />
            </Grid>
            {/* includeIntoCheckInCalendar */}
            {reservation && (
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end', paddingRight: '10px'}}>
                <Controller
                  control={control} name="includeIntoCheckInCalendar"
                  render={({ field: { onChange, value, ...field} }) => (
                    <FormControlLabel labelPlacement="start"
                      control={
                        <Checkbox onChange={onChange} checked={value} {...field} />
                      }
                      label="Include in to calendar"
                    />
                  )}
                />
              </Grid>
            )}
          </Grid>
        </form>
      </DialogContent>

      <DialogActions sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>

        <LoadingButton
          loading={isLoading}
          variant="contained"
          onClick={onSubmit}
        >
          {reservation ? 'Save' : 'Create'}
        </LoadingButton>
      </DialogActions>

    </React.Fragment>
  )
};

export default ReservationForm;
