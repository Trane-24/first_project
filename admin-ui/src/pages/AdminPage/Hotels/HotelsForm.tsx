import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
// hooks
import { useAppDispatch } from "hooks/useAppDispatch";
// models
import IHotel from "models/Hotel";
import IUser from "models/User";
import IHotelType from "models/HotelType";
// Async
import { fetchUsers } from "store/users/usersAsync";
import { createHotel, updateHotel } from "store/hotels/hotelsAsync";
// Actions
import { appActions } from "store/app/appSlice";
// selectors
import { selectParams as selectUsersParams, selectUsers } from "store/users/usersSelectors";
import { selectHotelTypes } from "store/hotelTypes/hotelTypesSelectors";
// Mui
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete, Box, Button, Grid, TextField,
  Typography, debounce, MenuItem, DialogTitle, DialogActions, DialogContent,
} from "@mui/material";
// Utilites
import { isRequired } from "utilites/validation";
// Components
import Uploader from "components/Uploader";

interface Props {
  onClose: () => void;
  hotel?: IHotel | null;
}

interface IForm {
  name: string;
  country?: string;
  city?: string;
  description?: string;
  ownerId: any;
  hotelTypeId: string;
}

const HotelsForm: React.FC<Props> = ({ hotel, onClose }) => {
  const dispatch = useAppDispatch();

  const users = useSelector(selectUsers);
  const usersParams = useSelector(selectUsersParams);
  const hotelTypes = useSelector(selectHotelTypes);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInp, setIsLoadingInp] = useState(false);
  const [queryValue, setQueryValue] = useState('');

  const { handleSubmit, control, formState: {errors} } = useForm<IForm>({
    defaultValues: {
      name: hotel?.name ? hotel.name : '',
      country: hotel?.country ? hotel.country : '',
      city: hotel?.city ? hotel.city : '',
      description: hotel?.description ? hotel.description : '',
      ownerId: hotel?.owner || null,
      hotelTypeId: hotel?.hotelType._id || '',
    }
  });

  const changeQueryValue = (e: any) => {
    setQueryValue(e.target.value)
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedChangeHandler = useCallback(
    debounce(changeQueryValue, 1000)
  , []);

  const onSubmit = handleSubmit((data: IForm) => {
    setIsLoading(true);
    const nextData:any = { 
      ...data,
      ownerId: data.ownerId._id,
    };

    if (hotel) {
      dispatch(updateHotel({ hotelId: hotel._id, hotelData: nextData }))
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
    dispatch(fetchUsers({ ...usersParams, role: 'owner', search: queryValue }))
      .unwrap()
      .finally(() => setIsLoadingInp(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryValue]);

  return (
    <React.Fragment>
      <DialogTitle>
        <Typography variant="h5">
          {`${hotel ? 'Update' : 'Create'} Hotel`}
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <form noValidate>
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
                    loadingText='Please wait'
                    loading={isLoadingInp}
                    noOptionsText='Dont have owners'
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
                        onChange={(e) => {
                          setIsLoadingInp(true);
                          debouncedChangeHandler(e)
                        }}
                      />
                    )}
                  />
                )}
              />
            </Grid>
            {/* hotel type */}
            <Grid item xs={12}>
              <Controller
                rules={{ required: isRequired}}
                control={control} name="hotelTypeId"
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    select
                    label="Hotel Types"
                    error={!!errors?.hotelTypeId}
                    helperText={errors?.hotelTypeId ? errors.hotelTypeId.message : null}
                  >
                    {hotelTypes ? (
                      hotelTypes?.map((hotelType: IHotelType) => (
                        <MenuItem value={hotelType._id} key={hotelType._id}>
                          {hotelType.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value="">
                        Loading...
                      </MenuItem>
                    )}
                  </TextField>
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
            <Grid item xs={12}>
              <Uploader assets={hotel?.images} multiple={true} />
            </Grid>
          </Grid>
        </form>
      </DialogContent>

      <DialogActions>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton
            loading={isLoading}
            variant="contained"
            onClick={onSubmit}
          >
            {hotel ? 'Save' : 'Create'}
          </LoadingButton>
        </Box>
      </DialogActions>
    </React.Fragment>
  );
};

export default HotelsForm;
