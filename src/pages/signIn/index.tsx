import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
// hooks
import { useAppDispatch } from '../../hooks/useAppDispatch';
// Async
import { signIn } from '../../store/auth/authAsync';
// components
import Title from '../../components/Title';
// mui
import { LoadingButton } from '@mui/lab';
import { makeStyles } from '@mui/styles';
import { TextField, Grid, Box, Paper } from '@mui/material';
// utilites
import { isEmail, isPassword, isRequired } from '../../utilites/validation';

interface IForm {
  email: string;
  password: string;
}

const SignInPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<IForm>({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = handleSubmit((data: IForm) => {
    setIsLoading(true);

    dispatch(signIn(data))
      .unwrap()
      .finally(() => setIsLoading(false));
  });

  return (
    <Box className={classes.page}>
      <Paper elevation={5} sx={{ p:5, width: '600px' }}>
        <Title>Sign In</Title>
        <form onSubmit={onSubmit} noValidate>
          <Grid container spacing={2} sx={{ pt: 4, pb: 4 }}>
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
            <Grid item xs={12}>
              <Controller
                control={control} name="password"
                rules={{  required: isRequired, pattern: isPassword }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type="password"
                    autoComplete="password"
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
          >Sign In</LoadingButton>
        </form>
      </Paper>
    </Box>
  );
}

export default SignInPage;

const useStyles = makeStyles({
  page: {
    height: 'calc(100vh - 64px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
