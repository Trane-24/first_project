import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { StyledTextField } from 'components/Controls';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { Controller, useForm } from 'react-hook-form';
import classes from './styles.module.scss';
import { useNavigate } from 'react-router-dom';

interface IForm {
  search: string;
}

const BannerForm: React.FC = () => {
  const navigate = useNavigate();

  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      search: '',
    }
  });

  const onSubmit = handleSubmit((data: IForm) => {
    data.search
      ? navigate(`/hotels?search=${data.search}`)
      : navigate('/hotels')
  })

  return (
    <Box className={classes.form_container}>
      <form onSubmit={onSubmit} noValidate className={classes.form}>
        <Controller
          control={control} name="search"
          render={({ field }) => (
            <StyledTextField
              {...field}
              fullWidth
              placeholder="Search by name or location"
              error={Boolean(errors.search)}
              helperText={errors.search ? `${errors.search.message}` : ''}
            />
          )}
        />
        <Button variant='contained' sx={{ height: '56px', width: '220px' }} type='submit'>
          Search
        </Button>
      </form>
    </Box>
  );
};

export default BannerForm;
