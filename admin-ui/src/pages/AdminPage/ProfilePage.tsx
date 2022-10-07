import React, { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
// hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
// components
import Title from 'components/Title';
import Phone from 'components/Phone';
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
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
// utilites
import { isEmail, isMatch, isRequired } from 'utilites/validation';
import MessageInfo from 'components/MessageInfo';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

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
    const isSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(newPass || '');
    return newPass ? isSpecial : false;
  }, [newPass]);

  const passwordIsCorrect = useMemo(() => {
    return passwordHas8Characters && passwordHas1UpperChar && passwrdHas1SpecialChar;
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
    dispatch(updateUser({ userId: currentUser?._id, user: newData }))
      .unwrap()
      .then(() => {
        resetField('newPassword');
        resetField('confirmPassword');
      })
      .then(() => dispatch(appActions.enqueueSnackbar({ key: uuid(), message: 'Profile was updated' })))
      .finally(() => setIsLoading(false))
  });

  return (
    <Paper variant="outlined" sx={{ margin: '80px auto 0', maxWidth: '600px', p: 5}}>
      <Title>Profile</Title>
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
                    label="First name"
                    margin="normal"
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
                    margin="normal"
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
                    margin="normal"
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
                  <Phone value={value || ''} onChange={onChange} label="Phone" />
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
                    margin="normal"
                    fullWidth
                    required={!!confirmPass}
                    error={Boolean((errors.newPassword && confirmPass !== '') || (!passwordIsCorrect && newPass !== '' ))}
                    helperText={errors.newPassword && confirmPass !== '' && errors.newPassword.type === 'required'
                      ? errors.newPassword.message : ''
                    }
                  />
                )}
              />
              <Button
                sx={{ position: 'absolute', right: '0', top: '32px', height: '56px'}}
                onClick={handeShowPassword}
              >
                {showPassword
                  ? <VisibilityOffOutlinedIcon />
                  : <VisibilityOutlinedIcon />
                }
              </Button>
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
                    margin="normal"
                    fullWidth
                    required={!!newPass}
                    error={Boolean(errors.confirmPassword && newPass !== '')}
                    helperText={errors.confirmPassword && newPass !== '' && errors.confirmPassword.type === 'required'
                      ? errors.confirmPassword.message : ''
                    }
                  />
                )}
              />
              <Button
                sx={{ position: 'absolute', right: '0', top: '32px', height: '56px'}}
                onClick={handeShowPassword2}
              >
                {showPassword2
                  ? <VisibilityOffOutlinedIcon />
                  : <VisibilityOutlinedIcon />
                }
              </Button>
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
  );
};

export default ProfilePage;
