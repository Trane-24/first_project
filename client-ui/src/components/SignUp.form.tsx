import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
// hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
// Async
import AuthAsync from 'store/auth/authAsync';
// Types
import UserRoles from 'types/UserRoles';
// components
import Title from './Title';
import Phone from './Phone';
// mui
import { LoadingButton } from '@mui/lab';
import {
  TextField, Grid, Button, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import {
  VisibilityOutlined as VisibilityOutlinedIcon,
  VisibilityOffOutlined as VisibilityOffOutlinedIcon
} from '@mui/icons-material';
// utilites
import { isEmail, isPassword, isRequired } from '../utilites/validation';
import SuccessRegistarion from './SuccessRegistarion';

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  role: UserRoles;
}

type Props = {
  onClose: () => void;
}

const SignUpForm:React.FC<Props> = ({ onClose }) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successRegistration, setSuccessRegistration] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);

  const { control, handleSubmit, formState: { errors } } = useForm<IForm>({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      password: '',
      role: UserRoles.Guest,
    }
  });

  const onSubmit = handleSubmit((data: IForm) => {
    setIsLoading(true);

    dispatch(AuthAsync.signUp(data))
      .unwrap()
      .then(() => setSuccessRegistration(true))
      .finally(() => setIsLoading(false));
  });

  if (successRegistration) return <SuccessRegistarion onClose={onClose} />;

  return (
    <React.Fragment>
      <DialogTitle>
        <Title>Sign up</Title>
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
                    helperText={errors?.firstName?.message || ''}
                  />
                )}
              />
            </Grid>
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
                    helperText={errors?.lastName?.message || ''}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control} name="phone"
                rules={{ required: isRequired }}
                render={({ field: { value, onChange } }) => (
                  <Phone
                    value={value || ''}
                    onChange={onChange}
                    label="Phone"
                    required
                    error={!!errors?.phone}
                    helperText={errors?.phone?.message || ''} 
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
                onClick={handleShowPassword}
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
          >Sign up</LoadingButton>
        </DialogActions>
      </form>
    </React.Fragment>
  );
}

export default SignUpForm;
