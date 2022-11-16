import React from 'react';
import { Box, Button } from '@mui/material';
import { StyledTextField } from 'components/Controls';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import classes from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { hotelsActions } from 'store/hotels/hotelsSlice';
import { useSelector } from 'react-redux';
import { selectParams } from 'store/hotels/hotelsSelectors';

interface Props {
  isHomePage?: boolean;
}
interface IForm {
  search: string;
}

const BannerForm: React.FC<Props> = ({ isHomePage = false}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const params = useSelector(selectParams);

  const { handleSubmit, control, formState: { errors }, setValue } = useForm({
    defaultValues: {
      search: isHomePage ? '' : params.search,
    }
  });

  const onSubmit = handleSubmit((data: IForm) => {
    const value = data.search.replace(/\s\s+/g, ' ').trim();

    setValue('search', value)
    dispatch(hotelsActions.changeSearch(value))
    navigate('/hotels')
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
