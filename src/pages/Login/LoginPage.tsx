import React from 'react';
import { TextField, Typography, Button, Grid, Box } from '@mui/material';
import { Container } from '@mui/system';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import config from '../../config';
import { isEmail, isRequired } from '../../utilites/validation';

type Profile = {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Profile>();

  const createUser = async (user: any) => {
    await axios.post(`${config.apiURL}users`, user);
  };

  const onSubmit = (data: Profile) => {
    const newUser = {
      email: data.email,
      password: data.password,
    }

    createUser(newUser);
  };

  const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100%', backgroundColor: 'bcbcbc'}}>
      <Typography variant='h4'>Hello</Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container sx={{gap: 2, mt: 1, mb: 2}}>
          <TextField
            id='email'
            label='Email'
            type='email'
            variant='outlined'
            fullWidth
            autoComplete='email'
            {...register('email', {
              required: isRequired,
              pattern: isEmail
            })}
            error={!!errors?.email}
            helperText={errors?.email ? errors.email.message : null}
          />
          <TextField
            id='password'
            label='Password'
            type='password'
            variant='outlined'
            autoComplete='password'
            fullWidth
            {...register('password', {
              required: 'Required',
            pattern: {
              value: mediumRegex,
              message: 'minimum 6 characters, at least one letter and one number',
            }})}
            error={!!errors?.password}
            helperText={errors?.password ? errors.password.message : null}
          />
        </Grid>
        <Button type='submit' variant='contained' color='primary' fullWidth>Login In</Button>
      </form>
    </Box>
  );
}

export default LoginPage;
