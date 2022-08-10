import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
// hooks
import { useAppDispatch } from '../../../hooks/useAppDispatch';
// Async
import { createUser, updateUser } from '../../../store/users/usersAsync';
// Models
import IUser from '../../../models/User';
// Types
import UserRoles from '../../../types/UserRoles';
// components
import Title from '../../../components/Title';
// MUI
import { LoadingButton } from '@mui/lab';
import { Box, Grid, TextField } from '@mui/material';
// utilites
import { isEmail, isRequired } from '../../../utilites/validation';
import { v4 as uuid } from 'uuid';
// actions
import { appActions } from 'store/app/appSlice';



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
      const params = {
        userId: user._id,
        user: data,
      }

      dispatch(updateUser(params))
        .unwrap()
        .then(() => dispatch(appActions.enqueueSnackbar({
          key: uuid(),
          message: 'User was updated',
        })))
    } else {
      dispatch(createUser(data))
        .unwrap()
        .then(() => dispatch(appActions.enqueueSnackbar({
          key: uuid(),
          message: 'User was created',
        })))
    }
    setIsLoading(false);
    onClose();
  });

  return (
    <Box sx={{ p: 5, width: '100%'}}>
      <Title>{`${user ? 'Update' : 'Create'} user`}</Title>

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
                    label='First name'
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
                    label='Last name'
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
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Cell phone'
                    fullWidth
                  />
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
          >{`${user ? 'Update' : 'Create'} user`}</LoadingButton>
        </form>
    </Box>
  );
};

export default UsersForm;
