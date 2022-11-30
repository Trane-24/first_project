import React from 'react';
import { useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// Hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
// Actions
import { hotelsActions } from 'store/hotels/hotelsSlice';
// Selectors
import { selectParams } from 'store/hotels/hotelsSelectors';
// MUI
import { Box, Button, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
// Components
import { StyledTextField } from 'components/Controls';
// Styles
import classes from './styles.module.scss';

interface Props {
  isHomePage?: boolean;
}
interface IForm {
  search: string;
}

const BannerForm: React.FC<Props> = ({ isHomePage = false }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const params = useSelector(selectParams);

  const { handleSubmit, control, formState: { errors }, setValue, watch } = useForm({
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
  
  const searchWatcher = watch('search');

  const clear = () => setValue('search', '');

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
              InputProps={{
                endAdornment: !!searchWatcher ? (
                  <IconButton onClick={clear}>
                    <CloseIcon />
                  </IconButton>
                ) : null
              }}
            />
          )}
        />
        <Button
          sx={{ height: '56px', width: '220px' }}
          variant="contained"
          type="submit"
        >
          Search
        </Button>
      </form>
    </Box>
  );
};

export default BannerForm;
