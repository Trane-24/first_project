import { LoadingButton } from "@mui/lab";
import { Autocomplete, Box, Button, Grid, TextField, Typography, debounce } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useAppDispatch } from "hooks/useAppDispatch";
import IReservation from "models/Reservation";
import IUser from "models/User";
import React, { useCallback, useEffect, useMemo, useState }  from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { appActions } from "store/app/appSlice";
import { fetchHotels } from "store/hotels/hotelsAsync";
import { selectHotels } from "store/hotels/hotelsSelectors";
import { createReservation, updateReservation } from "store/reservation/reservationAsunc";
import { fetchUsers } from "store/users/usersAsync";
import { selectUsers } from "store/users/usersSelectors";
import { isRequired } from "utilites/validation";
import { v4 as uuid } from "uuid";
// Components

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
    }
  });

  const startDate = watch('startDate');
  const endDate = watch('endDate');

  const needUpdateData = useMemo(() => {
    return startDate >= endDate;
  }, [startDate]);

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
    };

     if (reservation) {
      dispatch(updateReservation({
        reservationId: reservation._id,
        reservation: nextData,
      }))
        .then(() => dispatch(appActions.enqueueSnackbar({
          key: uuid(),
          message: 'Updated reservation'
        })))
        .then(() => onClose())
        .finally(() => setIsLoading(false))
     } else {
      dispatch(createReservation(nextData))
        .unwrap()
        .then(() => dispatch(appActions.enqueueSnackbar({
          key: uuid(),
          message: 'Added reservation'
        })))
        .then(() => onClose())
        .finally(() => setIsLoading(false))
     }
  });

  useEffect(() => {
    dispatch(fetchUsers({ role: 'guest', search: valueGuest}))
      .unwrap()
      .finally(() => setIsLoadingGuests(false))
  }, [valueGuest]);

  useEffect(() => {
    dispatch(fetchHotels({ search: valueHotel }))
      .unwrap()
      .finally(() => setIsLoadingHotels(false))
  }, [valueHotel]);

  useEffect(() => {
    const newStartDate = dayjs(startDate).format('YYYY-MM-DD');
    const newEndDate = dayjs(endDate).format('YYYY-MM-DD');
    if (newStartDate >= newEndDate && !!endDate) {
      setValue('endDate', dayjs(startDate).add(1, 'day').format('YYYY-MM-DD'));
    }
  }, [startDate, endDate])

  return (
    <Box sx={{p: 5, width: '100%'}}>
      <Typography variant="h5">
        {`${reservation ? 'Update' : 'Add'} reservation`}
      </Typography>

      <form onSubmit={onSubmit} noValidate>
        <Grid container spacing={2} sx={{ pt: 4, pb: 4 }}>
          {/* startDate */}
          <Grid item xs={12}>
            <Controller
              control={control} name="startDate"
              rules={{ required: isRequired}}
              render={({ field }) => (
                <MobileDatePicker
                  { ...field }
                  disablePast
                  // maxDate={dayjs(endDate).subtract(1, 'day')}
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
              // rules={{ required: isRequired}}
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
                  onChange={(_, guest: IUser | null) => onChange(guest)}
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
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2}}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton
            loading={isLoading}
            type="submit"
            variant="contained"
          >
            {`${reservation ? 'Update' : 'Add'} reservation`}
          </LoadingButton>
        </Box>
      </form>

    </Box>
  )
};

export default ReservationForm;
