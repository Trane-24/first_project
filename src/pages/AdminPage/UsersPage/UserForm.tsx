import { Title } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import IUser from '../../../models/User';
import { createUser } from '../../../store/users/usersAsync';
import UserRoles from '../../../types/UserRoles';
import { isEmail, isRequired } from '../../../utilites/validation';

interface Props {
  onClose: () => void;
  user: IUser | null;
}

interface IForm {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: string | null;
}
// role: UserRoles | string;

const UserForm: React.FC<Props> = ({ onClose, user }) => {
  const { handleSubmit, control, formState: {errors}} = useForm<IForm>({
    defaultValues: {
      email: user ? user.email : '',
      firstName: user ? user.firstName : '',
      lastName: user ? user.lastName : '',
      phone: user ? user.phone : '',
      role: user ? user.role : null,
    }
  });

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = handleSubmit((data: IForm) => {
    setIsLoading(true);

    if (user) {

    } else {
      dispatch(createUser(data));
    }
    setIsLoading(false);
    onClose();
  });

  return (
    <Box sx={{ p: 5, width: '100%'}}>
      {/* <Title>{`${user ? 'Update' : 'Create'} user`}</Title> */}
      <Typography variant='h6'>
        {`${user ? 'Update' : 'Create'} user`}
      </Typography>

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
            {/* role */}
            <Grid item xs={12} md={6}>
              <Controller
                control={control} name="role"
                rules={{ required: isRequired }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Role"
                    type="role"
                    fullWidth
                    required
                    error={!!errors?.role}
                    helperText={errors?.role ? errors.role.message : null}
                  >
                    {Object.keys(UserRoles).map(userRole => (
                      <MenuItem key={userRole} value={userRole.toLowerCase()} >{userRole}</MenuItem>
                    ))}
                  </TextField>
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

export default UserForm;
