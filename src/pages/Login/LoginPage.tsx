import React from 'react';
import { TextField, Typography, Button, Grid } from '@mui/material';
import { Container } from '@mui/system';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import config from '../../config';

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
  }

  const onSubmit = (data: Profile) => {
    const newUser = {
      email: data.email,
      password: data.password,
    }

    createUser(newUser);
  };

  return (
    <Container maxWidth='xs' sx={{display: 'flax', justifyContent: 'center', alignItems: 'center'}}>
      <Typography variant='h4'>Hello</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container sx={{gap: 2, mt: 1, mb: 2}}>
          <TextField
            id='email'
            label='Email'
            type='email'
            variant='outlined'
            fullWidth
            autoComplete='email'
            {...register('email', {
              required: 'Required field',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Invalid email address'
              }
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
            {...register('password', {required: 'Required'})}
          />
        </Grid>
        <Button type='submit' variant='contained' color='primary' fullWidth>Login In</Button>
      </form>
    </Container>
  );
}

export default LoginPage;
