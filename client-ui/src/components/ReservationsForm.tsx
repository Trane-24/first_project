
import React, { useEffect, useState }  from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
// Hooks
import { useAppDispatch } from "hooks/useAppDispatch";
// Components
import Phone from "components/Phone";
import Title from "components/Title";
// Async
import { createReservation } from "store/reservations/reservationsAsync";
// Actions
import { appActions } from "store/app/appSlice";
// Selectors
import { selectCurrentUser } from "store/users/usersSelectors";
// Types
import UserRoles from "types/UserRoles";
// Models
import IHotel from "models/Hotel";
// Mui
import { LoadingButton } from "@mui/lab";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { Box, Button, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import {
  VisibilityOutlined as VisibilityOutlinedIcon,
  VisibilityOffOutlined as VisibilityOffOutlinedIcon
} from '@mui/icons-material';
// utilites
import { isEmail, isPassword, isRequired } from "utilites/validation";

interface Props {
  onClose: () => void;
  hotel: IHotel;
}

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  role: UserRoles;
  // reservations
  startDate: string;
  endDate: string;
  notes?: string;
}

const ReservationForm: React.FC<Props> = ({ onClose, hotel }) => {
  const dispatch = useAppDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(prev => !prev);

  const {handleSubmit, watch, control, formState: {errors}, setValue} = useForm<IForm>({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      password: '',
      role: UserRoles.Guest,
      // reservations
      startDate: '',
      endDate: '',
      notes: '',
    }
  });

  const startDate = watch('startDate');
  const endDate = watch('endDate');

  const { _id: hotelId } = hotel;

  const onSubmit= handleSubmit((data: IForm) => {
    setIsLoading(true);

    const { email, firstName, lastName, phone, password, role, startDate, endDate, notes } = data;

    const nextData:any = {
      reservationData: {
        startDate: dayjs(data.startDate).format('YYYY-MM-DD'),
        endDate: dayjs(data.endDate).format('YYYY-MM-DD'),
        hotelId,
        notes,
      }
    };

    if (!currentUser) nextData['guestData'] = { email, firstName, lastName, phone, password, role };

    dispatch(createReservation(nextData))
      .unwrap()
      .then(() => dispatch(appActions.enqueueSnackbar({
        key: uuid(),
        message: currentUser ? 'The hotel has been successfully reserved' : 'The hotel has been successfully reserved and an account has been created'
      })))
      .then(() => onClose())
      .finally(() => setIsLoading(false))
  });

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
        <Title>{`Reserve \`${hotel.name}\` hotel`}</Title>
      </DialogTitle>

      <DialogContent dividers>
        <form noValidate style={{ paddingTop: '20px' }}>
          {!currentUser && (
            <React.Fragment>
              <Typography color="text.secondary">Contact details</Typography>

              <Grid container spacing={1} sx={{ pt: 4, pb: 4 }}>
                {/* email */}
                <Grid item xs={12}>
                  <Controller
                    control={control} name="email"
                    rules={{ required: isRequired, pattern: isEmail }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Email"
                        fullWidth
                        required
                        error={!!errors?.email}
                        helperText={errors?.email ? errors.email.message : null}
                      />
                    )}
                  />
                </Grid>
                {/* firstName */}
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control} name="firstName"
                    rules={{ required: isRequired }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="First name"
                        fullWidth
                        required
                        error={!!errors?.firstName}
                        helperText={errors?.firstName?.message || ''}
                      />
                    )}
                  />
                </Grid>
                {/* lastName */}
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control} name="lastName"
                    rules={{ required: isRequired }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Last name"
                        fullWidth
                        required
                        error={!!errors?.lastName}
                        helperText={errors?.lastName?.message || ''}
                      />
                    )}
                  />
                </Grid>
                {/* phone */}
                <Grid item xs={12}>
                  <Controller
                    control={control} name="phone"
                    rules={{ required: isRequired }}
                    render={({ field: { value, onChange } }) => (
                      <Phone
                        value={value || ''}
                        onChange={onChange}
                        label="Phone"
                        required
                        error={!!errors?.phone}
                        helperText={errors?.phone?.message || ''} 
                      />
                    )}
                  />
                </Grid>
                {/* password */}
                <Grid item xs={12} sx={{ position: 'relative'}}>
                  <Controller
                    control={control} name="password"
                    rules={{  required: isRequired, pattern: isPassword }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        fullWidth
                        required
                        error={!!errors?.password}
                        helperText={errors?.password ? errors.password.message : null}
                      />
                    )}
                  />
                  <Button
                    sx={{ position: 'absolute', right: '0', height: '56px'}}
                    onClick={handleShowPassword}
                  >
                    {showPassword
                      ? <VisibilityOffOutlinedIcon />
                      : <VisibilityOutlinedIcon />
                    }
                  </Button>
                </Grid>
              </Grid>
            </React.Fragment>
          )}

          <Typography color="text.secondary">Request details</Typography>

          <Grid container spacing={1} sx={{ pt: 4, pb: 4 }}>
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
          </Grid>
        </form>
      </DialogContent>

      <DialogActions>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2}}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton
            loading={isLoading}
            variant="contained"
            onClick={onSubmit}
          >
            Reserve
          </LoadingButton>
        </Box>
      </DialogActions>

      </React.Fragment>
  )
};

export default ReservationForm;
