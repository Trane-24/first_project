import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
// hooks
import { useAppDispatch } from "hooks/useAppDispatch";
// models
import IHotel from "models/Hotel";
import IUser from "models/User";
// Async
import { fetchUsers } from "store/users/usersAsync";
import { createHotel, updateHote } from "store/hotels/hotelsAsync";
// Actions
import { appActions } from "store/app/appSlice";
// selectors
import { selectParams as selectUsersParams, selectUsers } from "store/users/usersSelectors";
// Mui
import { LoadingButton } from "@mui/lab";
import { Autocomplete, Box, Button, Grid, TextField, Typography } from "@mui/material";
// untiles
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
  ownerId: any;
}

const HotelsForm: React.FC<Props> = ({ onClose, hotel }) => {
  const dispatch = useAppDispatch();

  const users = useSelector(selectUsers);
  const usersParams = useSelector(selectUsersParams);

  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, control, formState: {errors} } = useForm<IForm>({
    defaultValues: {
      name: hotel?.name ? hotel.name : '',
      country: hotel?.country ? hotel.country : '',
      city: hotel?.city ? hotel.city : '',
      imgUrl: hotel?.imgUrl ? hotel.imgUrl : '',
      description: hotel?.description ? hotel.description : '',
      ownerId: hotel?.owner || null,
    }
  });

  const onSubmit = handleSubmit((data: IForm) => {
    setIsLoading(true);
    const nextData:any = { 
      ...data,
      ownerId: data.ownerId._id,
     };

    if (hotel) {
      dispatch(updateHote({ hotelId: hotel._id, hotel: nextData }))
        .unwrap()
        .then(() => dispatch(appActions.enqueueSnackbar({ key: uuid(), message: 'Hotel was updated' })))
        .then(() => onClose())
        .finally(() => setIsLoading(false))
    } else {
      dispatch(createHotel(nextData))
      .unwrap()
      .then(() => dispatch(appActions.enqueueSnackbar({ key: uuid(), message: 'Hotel was created'})))
      .then(() => onClose())
      .finally(() => setIsLoading(false))
    }
  });

  useEffect(() => {
    dispatch(fetchUsers({ ...usersParams, role: 'owner' }));
    // eslint-disable-next-line
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
            <Controller
              control={control} name="ownerId"
              rules={{ required: isRequired}}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  disablePortal
                  options={users || []}
                  isOptionEqualToValue={(option, value) => option._id === value._id}
                  onChange={(_, owner: IUser | null) => onChange(owner)}
                  value={value || null}
                  getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                  filterOptions={(options) => options}
                  // loadingText
                  // loading
                  // noOptionsText
                  renderOption={(props, option) => (
                    <li {...props} key={option._id} >
                      {`${option.firstName} ${option.lastName}`}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Owner"
                      required
                      error={Boolean(errors.ownerId)}
                      helperText={errors.ownerId ? `${errors.ownerId.message}` : ''}
                      // onChange
                    />
                  )}
                />
              )}
            />
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
