import { Box, Button, Typography } from '@mui/material';
import { StyledTextField } from 'components/Controls';
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
      <Box>
        <Typography>Dash Realty Group presents DashWeek, our new rental platform</Typography>
        <Typography>Find your perfect Stay. We specialize in luxury vacation rentals. Let's get started on your next journey</Typography>
      </Box>

      <form onSubmit={onSubmit} noValidate className={classes.form}>
        <Controller
          control={control} name="search"
          render={({ field }) => (
            <StyledTextField
              {...field}
              placeholder="Search by name or location"
              error={Boolean(errors.search)}
              helperText={errors.search ? `${errors.search.message}` : ''}
            />
          )}
        />
        <Button variant='contained' sx={{ height: '56px', width: '166px'}}>
          Search
        </Button>
      </form>
    </Box>
  );
};

export default BannerForm;
