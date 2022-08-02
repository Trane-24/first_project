import React from 'react';
import { Controller, useForm } from 'react-hook-form';
// components
import Title from '../../components/Title';
// mui
import { makeStyles } from '@mui/styles';
import { TextField, Button, Grid, Box, Paper } from '@mui/material';
// utilites
import { isEmail, isPassword, isRequired } from '../../utilites/validation';

interface IForm {
  email: string;
  password: string;
}

const SignInPage: React.FC = () => {
  const classes = useStyles();

  const { control, handleSubmit, formState: { errors } } = useForm<IForm>({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = handleSubmit((data: IForm) => {
    console.log(data);
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
          <Button type='submit' variant='contained' color='primary' fullWidth>Sign In</Button>
        </form>
      </Paper>
    </Box>
  );
}

export default SignInPage;

const useStyles = makeStyles({
  page: {
    height: 'calc(100vh - 78px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})