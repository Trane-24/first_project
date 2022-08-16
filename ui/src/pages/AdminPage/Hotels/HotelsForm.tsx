import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
// hooks
import { useAppDispatch } from "hooks/useAppDispatch";
// models
import IHotel from "models/Hotel";
// Async
import { fetchUsers } from "store/users/usersAsync";
import { createHotel, updateHote } from "store/hotels/hotelsAsync";
// selectors
import { selectParams as selectUsersParams, selectUsers } from "store/users/usersSelectors";
// Mui
import { LoadingButton } from "@mui/lab";
import { Autocomplete, Box, Button, Grid, TextField, Typography } from "@mui/material";
import { appActions } from "store/app/appSlice";
// untiles
import { v4 as uuid } from "uuid";
import { isRequired } from "utilites/validation";


interface Props {
  onClose: () => void;
  hotel?: IHotel | null;
}

interface IForm {
  name: string;
  country?: string;
  city?: string;
  imgUrl?: string;
  description?: string;
  ownerId: string | null;
}

const HotelsForm: React.FC<Props> = ({ onClose, hotel }) => {
  const dispatch = useAppDispatch();

  const users = useSelector(selectUsers);
  const usersParams = useSelector(selectUsersParams);

  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState(hotel
    ? `${hotel.owner.firstName} ${hotel.owner.lastName}`
    : '');

    console.log(inputValue)
  
  const changeInputValue = (value: string) => setInputValue(value);

  const {handleSubmit, control, formState: {errors}} = useForm<IForm>({
    defaultValues: {
      name: hotel?.name ? hotel.name : '',
      country: hotel?.country ? hotel.country : '',
      city: hotel?.city ? hotel.city : '',
      imgUrl: hotel?.imgUrl ? hotel.imgUrl : '',
      description: hotel?.description ? hotel.description : '',
      ownerId: hotel?.owner ? hotel.owner._id.toString() : null,
    }
  });

  const onSubmit = handleSubmit((data: IForm) => {
    console.log(data);
    setIsLoading(true);

    if (hotel) {
      const params = {
        hotelId: hotel._id,
        hotel: data,
      }

      dispatch(updateHote(params))
        .unwrap()
        .then(() => dispatch(appActions.enqueueSnackbar({
          key: uuid(),
          message: 'Hotel was updated',
        })))
        .then(() => onClose())
        .finally(() => setIsLoading(false))
    } else {
      dispatch(createHotel(data))
      .unwrap()
      .then(() => dispatch(appActions.enqueueSnackbar({ key: uuid(), message: 'Hotel was created'})))
      .then(() => onClose())
      .finally(() => setIsLoading(false))
    }
  });

  useEffect(() => {
    dispatch(fetchUsers({ ...usersParams, role: 'owner' }))
  }, [])

  return (
    <Box sx={{p: 5, width: '100%'}}>
      <Typography variant="h5">
        {`${hotel ? 'Update' : 'Create'} Hotel`}
      </Typography>

      <form onSubmit={onSubmit} noValidate>
        <Grid container spacing={2} sx={{ pt: 4, pb: 4 }}>
          {/* name */}
          <Grid item xs={12}>
            <Controller
              control={control} name="name"
              rules={{ required: isRequired}}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Hotel name"
                  fullWidth
                  required
                  error={!!errors?.name}
                  helperText={errors?.name ? errors.name.message : null}
                />
              )}
            />
          </Grid>
          {/* owner */}
          <Grid item xs={12}>
            {users ? (
              <Controller
              control={control} name="ownerId"
              rules={{ required: isRequired}}
              render={({ field: {onChange} }) => {
                return (
                  <Autocomplete
                    id="owner-id"
                    options={users}
                    sx={{ width: 300 }}
                    inputValue={inputValue}
                    renderInput={(params) => <TextField onChange={(e) => changeInputValue(e.target.value)} {...params} label="Owner" />}
                    getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                    onChange={(_, data) => {
                      changeInputValue(data
                        ? `${data?.firstName} ${data?.lastName}` : '')
                      onChange(data?._id);
                      return data?._id;
                    }}
                  />
                )
              }}
            />
            ) : ''}
          </Grid>
          {/* country */}
          <Grid item xs={12} md={6}>
            <Controller
              control={control} name="country"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Country"
                  fullWidth
                />
              )}
            />
          </Grid>
          {/* city */}
          <Grid item xs={12} md={6}>
            <Controller
              control={control} name="city"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="City"
                  fullWidth
                />
              )}
            />
          </Grid>
          {/* images url */}
          <Grid item xs={12}>
            <Controller
              control={control} name="imgUrl"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Images url"
                  fullWidth
                />
              )}
            />
          </Grid>
          {/* description */}
          <Grid item xs={12}>
            <Controller
              control={control} name="description"
              render={({ field }) => (
                <TextField
                  fullWidth
                  {...field}
                  multiline
                  rows={4}
                  label="Description"
                />
              )}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2}}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton
            loading={isLoading}
            type="submit"
            variant="contained"
          >
            {`${hotel ? 'Update' : 'Create'} Hotel`}
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
};

export default HotelsForm;
