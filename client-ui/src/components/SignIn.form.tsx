import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
// hooks
import { useAppDispatch } from '../hooks/useAppDispatch';
// Async
import { signIn } from '../store/auth/authAsync';
// components
import Title from './Title';
// mui
import { LoadingButton } from '@mui/lab';
import { TextField, Grid, Button, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
// utilites
import { isEmail, isPassword, isRequired } from '../utilites/validation';

interface IForm {
  email: string;
  password: string;
}

const SignInForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handeShowPassword = () => setShowPassword(!showPassword);

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
    <React.Fragment>
      <DialogTitle>
        <Title>Sign In</Title>
      </DialogTitle>
      <form onSubmit={onSubmit} noValidate>
        <DialogContent dividers>
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
                onClick={handeShowPassword}
              >
                {showPassword
                  ? <VisibilityOffOutlinedIcon />
                  : <VisibilityOutlinedIcon />
                }
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            fullWidth
            loading={isLoading}
            type='submit'
            variant='contained'
            color='primary'
          >Sign In</LoadingButton>
        </DialogActions>
      </form>
    </React.Fragment>
  );
}

export default SignInForm;
