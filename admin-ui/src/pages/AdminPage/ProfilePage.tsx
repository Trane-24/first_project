import React, { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
// hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
// components
import Title from 'components/Title';
import Phone from 'components/Phone';
import MessageInfo from 'components/MessageInfo';
// actions
import { appActions } from 'store/app/appSlice';
// async
import { updateUser } from 'store/users/usersAsync';
// selectors
import { selectCurrentUser } from 'store/users/usersSelectors';
// types
import UserRoles from 'types/UserRoles';
// MUI
import { LoadingButton } from '@mui/lab';
import { Box, Grid, IconButton, Paper, TextField } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
// utilites
import { isEmail, isMatch, isRequired } from 'utilites/validation';

interface IForm {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: UserRoles;
  newPassword?: string;
  confirmPassword?: string;
}

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handeShowPassword = () => setShowPassword(!showPassword);
  const handeShowPassword2 = () => setShowPassword2(!showPassword2);

  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useSelector(selectCurrentUser);

  const { handleSubmit, watch, control, resetField, formState: {errors}} = useForm<IForm>({
    defaultValues: {
      email: currentUser?.email,
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      phone: currentUser?.phone,
      role: currentUser?.role,
      newPassword: '',
      confirmPassword: '',
    }
  });

  const newPass = watch('newPassword');
  const confirmPass = watch('confirmPassword');

  const passwordIsEmpty = useMemo(() => {
    return !newPass && !confirmPass;
  }, [newPass, confirmPass]);

  const newPassIsTrue = useMemo(() => {
    return newPass === confirmPass;
  }, [newPass, confirmPass]);

  const passwordHas8Characters = useMemo(() => {
    return newPass ? newPass?.length >= 8 : false;
  },[newPass]);

  const passwordHas1UpperChar = useMemo(() => {
    return newPass ? newPass.replace(/[^A-Z]/g, '').length > 0 : false;
  }, [newPass]);

  const passwrdHas1SpecialChar = useMemo(() => {
    // eslint-disable-next-line
    const isSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(newPass || '');
    return newPass ? isSpecial : false;
  }, [newPass]);

  const passwordIsCorrect = useMemo(() => {
    return passwordHas8Characters && passwordHas1UpperChar && passwrdHas1SpecialChar;
    // eslint-disable-next-line
  }, [newPass]);

  const onSubmit = handleSubmit((data: IForm) => {
    if (!passwordIsCorrect && newPass) {
      return;
    }

    const { phone, ...nextData } = data;
    const newData: any = { 
      firstName: nextData.firstName,
      lastName: nextData.lastName,
      email: nextData.email,
      role: nextData.role,
     };

    if (phone) newData['phone'] = phone;
    if (!passwordIsEmpty && newPassIsTrue) {
      newData['password'] = newPass;
    }

    setIsLoading(true);
    dispatch(updateUser({ userId: currentUser?._id, userData: newData }))
      .unwrap()
      .then(() => {
        resetField('newPassword');
        resetField('confirmPassword');
      })
      .then(() => dispatch(appActions.enqueueSnackbar({ key: uuid(), message: 'Profile was updated' })))
      .finally(() => setIsLoading(false))
  });

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Paper variant="outlined" sx={{ margin: '0 auto', maxWidth: '600px', p: {xs: 1, sm: 3}}}>
        <Title>Profile</Title>
        <form onSubmit={onSubmit} noValidate style={{ paddingTop: '20px' }}>
            <Grid container spacing={2} sx={{ pb: 4 }}>
              {/* firstName */}
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
                      label="Last name"
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
                  render={({ field: { onChange, value } }) => (
                    <Phone value={value || ''} onChange={onChange} label="Phone" margin="none" />
                  )}
                />
              </Grid>

              {/* newPassword */}
              <Grid item xs={12} md={6} sx={{ position: 'relative'}}>
                <Controller
                  control={control} name="newPassword"
                  rules={{ required: {...isRequired, value: !!confirmPass} }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id='new-password'
                      autoComplete="new-password"
                      type={showPassword ? "text" : "password"}
                      label="New password"
                      fullWidth
                      required={!!confirmPass}
                      error={Boolean((errors.newPassword && confirmPass !== '') || (!passwordIsCorrect && newPass !== '' ))}
                      helperText={errors.newPassword && confirmPass !== '' && errors.newPassword.type === 'required'
                        ? errors.newPassword.message : ''
                      }
                      InputProps={{
                        endAdornment: (
                          <IconButton onClick={handeShowPassword}>
                            {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                          </IconButton>
                        )
                      }}
                    />
                  )}
                />
              </Grid>

              {/* confirmPassword */}
              <Grid item xs={12} md={6} sx={{ position: 'relative'}}>
                <Controller
                  control={control} name="confirmPassword"
                  rules={{
                    required: { ...isRequired, value: !!newPass },
                    validate: (val: string | undefined) => isMatch(val, newPass, 'Password doesn\'t match')
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id='confirm-password'
                      type={showPassword2 ? "text" : "password"}
                      label="Confirm password"
                      fullWidth
                      required={!!newPass}
                      error={Boolean(errors.confirmPassword && newPass !== '')}
                      helperText={errors.confirmPassword && newPass !== '' && errors.confirmPassword.type === 'required'
                        ? errors.confirmPassword.message : ''
                      }
                      InputProps={{
                        endAdornment: (
                          <IconButton onClick={handeShowPassword2}>
                            {showPassword2 ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                          </IconButton>
                        )
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>

                <MessageInfo
                  value={newPass}
                  isDone={passwordHas8Characters}
                  message={'Must be 8 or more characters in length.'}
                />

                <MessageInfo
                  value={newPass}
                  isDone={passwordHas1UpperChar}
                  message={'Must contain 1 or more uppercase and lowecase characters.'}
                />

                <MessageInfo
                  value={newPass}
                  isDone={passwrdHas1SpecialChar}
                  message={'Must contain 1 or more special characters.'}
                />

              </Grid>
            </Grid>
            <LoadingButton
              fullWidth
              loading={isLoading}
              type='submit'
              variant='contained'
              color='primary'
            >Save</LoadingButton>
          </form>
      </Paper>
    </Box>
  );
};

export default ProfilePage;
