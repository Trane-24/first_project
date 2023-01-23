import React, { useEffect, useState } from "react";
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
// Actions
import { appActions } from "store/app/appSlice";
// selectors
import { selectCurrentUser } from "store/users/usersSelectors";
import { selectHotelTypes } from "store/hotelTypes/hotelTypesSelectors";
// Mui
import { LoadingButton } from "@mui/lab";
import {
  Box, Button, Grid, TextField,
  Typography, MenuItem,
} from "@mui/material";
// Utilites
import { isRequired } from "utilites/validation";
// Components
import Uploader from "components/Uploader";
import { fetchHotelTypes } from "store/hotelTypes/hotelTypesAsync";
import { createHotel, updateHotel } from "store/hotels/hotelsAsync";

interface Props {
  onClose: () => void;
  hotel?: IHotel | null;
}

interface IForm {
  name: string;
  country?: string;
  city?: string;
  description?: string;
  hotelTypeId: string;
}

const MyHotelsForm: React.FC<Props> = ({ hotel, onClose }) => {
  const dispatch = useAppDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const hotelTypes = useSelector(selectHotelTypes);

  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, control, formState: {errors} } = useForm<IForm>({
    defaultValues: {
      name: hotel?.name ? hotel.name : '',
      country: hotel?.country ? hotel.country : '',
      city: hotel?.city ? hotel.city : '',
      description: hotel?.description ? hotel.description : '',
      hotelTypeId: hotel?.hotelType._id || '',
    }
  });

  const onSubmit = handleSubmit((data: IForm) => {
    setIsLoading(true);
    const nextData:any = {
      ...data,
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
    dispatch(fetchHotelTypes({}))
  }, []);

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

export default MyHotelsForm;
