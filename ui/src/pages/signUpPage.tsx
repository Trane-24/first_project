import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
// async
import { signUp } from '../store/auth/authAsync';
// components
import Title from '../components/Title';
// hooks
import { useAppDispatch } from '../hooks/useAppDispatch';
// mui
import { makeStyles } from '@mui/styles';
import { LoadingButton } from '@mui/lab';
import { TextField, Grid, Box, Paper, Button, Typography } from '@mui/material';
// utilites
import { isEmail, isPassword, isRequired } from '../utilites/validation';
import UserRoles from 'types/UserRoles';

interface IForm {
  role: UserRoles;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
}

const SignUpPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoadin] = useState(false);
  const [isSingUp, setIsSingUp] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<IForm>({
    defaultValues: {
      role: UserRoles.Admin,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
    }
  });

  const onSubmit = handleSubmit((data: IForm) => {
    console.log(data);
    setIsLoadin(true);

    dispatch(signUp(data))
      .unwrap()
      .then(() => setIsSingUp(true))
      .finally(() => setIsLoadin(false));
  });

  if (isSingUp) {
    return (
      <Box className={classes.page}>
        <Paper elevation={5} sx={{ p:5, width: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Typography sx={{ fontSize: '24px' }}>You have been successfully registered</Typography>
          <NavLink to="/sign-in" className={classes.button}>
            <Button variant="contained" size="large" sx={{ mt: 5 }}>Sign in</Button>
          </NavLink>
        </Paper>
      </Box>
    )
  }

  return (
    <Box className={classes.page}>
      <Paper elevation={5} sx={{ p:5, width: '600px' }}>
        <Title>Sign Up</Title>
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
            {/* password */}
            <Grid item xs={12} md={6}>
              <Controller
                control={control} name="password"
                rules={{  required: isRequired, pattern: isPassword }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type="password"
                    fullWidth
                    required
                    error={!!errors?.password}
                    helperText={errors?.password ? errors.password.message : null}
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
          >Sign Up</LoadingButton>
        </form>
      </Paper>
    </Box>
  );
}

export default SignUpPage;

const useStyles = makeStyles({
  page: {
    height: 'calc(100vh - 64px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    color: '#fefefe',
    textDecoration: 'none'
  },
});