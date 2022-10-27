import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
// hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
// Async
import AuthAsync from 'store/auth/authAsync';
// Types
import UserRoles from 'types/UserRoles';
// components
import Title from 'components/Title';
import Phone from 'components/Phone';
// mui
import { LoadingButton } from '@mui/lab';
import {
  TextField, Grid, Button, DialogTitle, DialogContent, DialogActions, Box, Typography
} from '@mui/material';
import {
  VisibilityOutlined as VisibilityOutlinedIcon,
  VisibilityOffOutlined as VisibilityOffOutlinedIcon
} from '@mui/icons-material';
// utilites
import { isEmail, isPassword, isRequired } from 'utilites/validation';
import SuccessRegistarion from 'components/SuccessRegistarion';
// style
import classes from './style.module.scss';
import Benefits from 'pages/ListYourProperty/Benefits';
import HowItWorks from 'pages/ListYourProperty/HowItWorks';
import useScrollIntoView from 'hooks/useScrollIntoView';

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  role: UserRoles;
}

const ListYourProperty:React.FC = () => {
  const dispatch = useAppDispatch();
  const { scrollTo } = useScrollIntoView();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successRegistration, setSuccessRegistration] = useState(false);

  const handeShowPassword = () => setShowPassword(!showPassword);

  const { control, handleSubmit, formState: { errors } } = useForm<IForm>({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      password: '',
      role: UserRoles.Owner,
    }
  });

  const onSubmit = handleSubmit((data: IForm) => {
    setIsLoading(true);

    dispatch(AuthAsync.signUp(data))
      .unwrap()
      .then(() => setSuccessRegistration(true))
      .finally(() => setIsLoading(false));
  });

  if (successRegistration) return <SuccessRegistarion />;

  return (
    <React.Fragment>
      <Box className={classes.form_content}>
        <Box className={[classes.form_container, "container"].join(' ')} data-container="sign-up">
          <Box className={classes.form_info}>
            <Typography className={classes.title}>
              Rent your timeshare weeks
            </Typography>
            <Typography className={classes.text}>
            Hotels will handle all aspects of the rental process. We will advertise your rental at fair market value. We pride ourselves on the personal touch, so you will always be able to communicate directly with an agent
            </Typography>
            <Button
              className={classes.form_btn}
              variant='contained'
              onClick={() => scrollTo('how-it-works')}
            >Learn More</Button>
          </Box>
          <form className={classes.form} onSubmit={onSubmit} noValidate>
            <DialogTitle>
              <Title>Create owner account</Title>
            </DialogTitle>
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
                loading={isLoading}
                type='submit'
                variant='contained'
              >Sign up</LoadingButton>
            </DialogActions>
          </form>
        </Box>
      </Box>
      <Benefits />
      <HowItWorks />
      <Box className={classes.lastBlock}>
        <Typography className={classes.lastBlockTitle}>
          Ready to list your property?
        </Typography>
        <Button className={classes.btn} variant='contained' onClick={() => scrollTo('sign-up')}>Sign Up</Button>
      </Box>
    </React.Fragment>
  );
}

export default ListYourProperty;
