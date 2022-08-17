import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
// hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
// Async
import { createUser, updateUser } from 'store/users/usersAsync';
// actions
import { appActions } from 'store/app/appSlice';
// Models
import IUser from 'models/User';
// Types
import UserRoles from 'types/UserRoles';
// Components
import Phone from 'components/Phone';
// MUI
import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
// utilites
import { isEmail, isRequired } from 'utilites/validation';

interface Props {
  onClose: () => void;
  user?: IUser | null;
  role?: UserRoles;
}

interface IForm {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: UserRoles;
}

const UsersForm: React.FC<Props> = ({ onClose, user, role }) => {
  const { handleSubmit, control, formState: {errors}} = useForm<IForm>({
    defaultValues: {
      email: user ? user.email : '',
      firstName: user ? user.firstName : '',
      lastName: user ? user.lastName : '',
      phone: user ? user.phone : '',
      role: user ? user.role : role,
    }
  });

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = handleSubmit((data: IForm) => {
    setIsLoading(true);
    if (user) {
      dispatch(updateUser({ userId: user._id, user: data }))
        .unwrap()
        .then(() => {
          dispatch(appActions.enqueueSnackbar({ key: uuid(), message: 'User was updated' }))
        })
        .then(() => onClose())
        .finally(() => setIsLoading(false))
    } else {
      dispatch(createUser(data))
        .unwrap()
        .then(() => {
          dispatch(appActions.enqueueSnackbar({ key: uuid(), message: 'User was created' }))
        })
        .then(() => onClose())
        .finally(() => setIsLoading(false))
    }
  });

  return (
    <Box sx={{ p: 5, width: '100%'}}>
      <Typography variant="h5">{`${user ? 'Update' : 'Create'} user`}</Typography>

      <form onSubmit={onSubmit} noValidate>
          <Grid container spacing={2} sx={{ pt: 4, pb: 4 }}>
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
                    fullWidth
                    required
                    error={!!errors?.lastName}
                    helperText={errors?.lastName ? errors.lastName.message : null}
                  />
                )}
              />
            </Grid>
            {/* phone */}
            <Grid item xs={12}>
              <Controller
                control={control} name="phone"
                render={({ field: { value, onChange } }) => (
                  <Phone value={value || ''} onChange={onChange} label="Phone" margin="none" />
                )}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={onClose}
            >
              Cancel
            </Button>
            <LoadingButton
              loading={isLoading}
              type='submit'
              variant='contained'
            >{`${user ? 'Update' : 'Create'} user`}</LoadingButton>
          </Box>
        </form>
    </Box>
  );
};

export default UsersForm;
