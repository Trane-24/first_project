import { Box, Button, Typography } from '@mui/material';
import { StyledTextField } from 'components/Controls';
import Title from 'components/Title';
import { useAppDispatch } from 'hooks/useAppDispatch';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import classes from './styles.module.scss';

interface IForm {
  search: string;
}

const BannerForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      search: '',
    }
  });

  const onSubmit = handleSubmit((data: IForm) => {

  })

  return (
    <Box className={classes.form_container}>
      <Box sx={{ color: '#fff', textShadow: '0 0 5px rgba(0, 0, 0, 0.4)' }}>
        <Typography sx={{ fontSize: '40px' }}>Hotels, our new rental platform</Typography>
        <Typography sx={{ fontSize: '18px' }}>Find your perfect Stay. We specialize in luxury vacation rentals. Let's get started on your next journey</Typography>
      </Box>

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
        <Button variant='contained' sx={{ height: '56px', width: '220px' }}>
          Search
        </Button>
      </form>
    </Box>
  );
};

export default BannerForm;
