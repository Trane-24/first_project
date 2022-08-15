import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
// hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
// components
import Title from 'components/Title';
import Phone from 'components/Phone';
// actions
import { appActions } from 'store/app/appSlice';
// async
import { updateUser } from 'store/users/usersAsync';
// selectors
import { selectCurrentUser } from 'store/users/usersSelectors';
// types
import UserRoles from 'types/UserRoles';
// MUI
import { LoadingButton } from '@mui/lab';
import { Grid, Paper, TextField } from '@mui/material';
// utilites
import { isEmail, isRequired } from 'utilites/validation';

interface IForm {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: UserRoles;
}

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useSelector(selectCurrentUser);

  const { handleSubmit, control, formState: {errors}} = useForm<IForm>({
    defaultValues: {
      email: currentUser?.email,
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      phone: currentUser?.phone,
      role: currentUser?.role,
    }
  });

  const onSubmit = handleSubmit((data: IForm) => {
    const { phone, ...nextData } = data;
    const newData: any = { ...nextData };
    if (phone) newData['phone'] = `+${phone}`;

    setIsLoading(true);
    dispatch(updateUser({ userId: currentUser?._id, user: newData }))
      .unwrap()
      .then(() => dispatch(appActions.enqueueSnackbar({ key: uuid(), message: 'Profile was updated' })))
      .finally(() => setIsLoading(false))
  });

  return (
    <Paper variant="outlined" sx={{ margin: '80px auto 0', maxWidth: '600px', p: 5}}>
      <Title>Profile</Title>
      <form onSubmit={onSubmit} noValidate>
          <Grid container spacing={2} sx={{ pt: 4, pb: 4 }}>
            {/* firstName */}
            <Grid item xs={12} md={6}>
              <Controller
                control={control} name="firstName"
                rules={{ required: isRequired }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First name"
                    margin="normal"
                    fullWidth
                    required
                    error={!!errors?.firstName}
                    helperText={errors?.firstName ? errors.firstName.message : null}
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
                    margin="normal"
                    fullWidth
                    required
                    error={!!errors?.lastName}
                    helperText={errors?.lastName ? errors.lastName.message : null}
                  />
                )}
              />
            </Grid>
            {/* email */}
            <Grid item xs={12} md={6}>
              <Controller
                control={control} name="email"
                rules={{ required: isRequired, pattern: isEmail }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    margin="normal"
                    fullWidth
                    required
                    error={!!errors?.email}
                    helperText={errors?.email ? errors.email.message : null}
                  />
                )}
              />
            </Grid>
            {/* phone */}
            <Grid item xs={12} md={6}>
              <Controller
                control={control} name="phone"
                render={({ field: { onChange, value } }) => (
                  <Phone value={value || ''} onChange={onChange} label="Phone" />
                )}
              />
            </Grid>
          </Grid>
          <LoadingButton
            fullWidth
            loading={isLoading}
            type='submit'
            variant='contained'
            color='primary'
          >Save</LoadingButton>
        </form>
    </Paper>
  );
};

export default ProfilePage;
