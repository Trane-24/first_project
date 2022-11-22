
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
import ReservationStatuses from "types/ReservationStatuses";
import UserRoles from "types/UserRoles";
// Mui
import { LoadingButton } from "@mui/lab";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { Box, Button, Grid, TextField } from "@mui/material";
import {
  VisibilityOutlined as VisibilityOutlinedIcon,
  VisibilityOffOutlined as VisibilityOffOutlinedIcon
} from '@mui/icons-material';
// utilites
import { isEmail, isPassword, isRequired } from "utilites/validation";

interface Props {
  onClose: () => void;
  hotelId: string;
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
  guestId: any;
  hotelId: any;
}

const ReservationForm: React.FC<Props> = ({ onClose, hotelId }) => {
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

  const onSubmit= handleSubmit((data: IForm) => {
    setIsLoading(true);

    const nextData:any = {
      ...data,
      startDate: dayjs(data.startDate).format('YYYY-MM-DD'),
      endDate: dayjs(data.endDate).format('YYYY-MM-DD'),
      guestId: currentUser?._id,
      hotelId: hotelId,
      status: ReservationStatuses.Completed,
    };

    dispatch(createReservation(nextData))
      .unwrap()
      .then(() => dispatch(appActions.enqueueSnackbar({
        key: uuid(),
        message: 'Reservation was created'
      })))
      .then(() => onClose())
      .finally(() => setIsLoading(false))

  });

  useEffect(() => {
    const newStartDate = dayjs(startDate).format('YYYY-MM-DD');
    const newEndDate = dayjs(endDate).format('YYYY-MM-DD');
    if (newStartDate >= newEndDate && !!endDate) {
      setValue('endDate', dayjs(startDate).add(1, 'day').format('YYYY-MM-DD'));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate])

  return (
    <React.Fragment>
      <Box sx={{p: {xs: 2, sm: 3, md: 5}, width: '100%'}}>

        {!currentUser && (
          <React.Fragment>
            <Title>Contact details</Title>

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
                      autoComplete="email"
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
                      autoComplete="password"
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

        <Title>Request details</Title>

        <form onSubmit={onSubmit} noValidate>
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

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2}}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>

            <LoadingButton
              loading={isLoading}
              type="submit"
              variant="contained"
            >
              Add reservation
            </LoadingButton>
          </Box>
        </form>

      </Box>
    </React.Fragment>
  )
};

export default ReservationForm;
