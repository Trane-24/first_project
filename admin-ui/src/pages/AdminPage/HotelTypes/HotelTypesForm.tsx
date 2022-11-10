import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
// hooks
import { useAppDispatch } from "hooks/useAppDispatch";
// models
import { IHotelType } from "models/HotelType";
// Async
import { createHotelType, updateHotelType } from "store/hotelTypes/hotelTypesAsync";
// Actions
import { appActions } from "store/app/appSlice";
// Mui
import { LoadingButton } from "@mui/lab";
import { Box, Grid, TextField, Typography } from "@mui/material";
// untiles
import { isRequired } from "utilites/validation";
import Uploader from "components/Uploader";


interface Props {
  onClose: () => void;
  hotelType?: IHotelType | null;
}

interface IForm {
  name: string;
  description: string;
}

const HotelTypesForm: React.FC<Props> = ({ hotelType, onClose }) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, control, formState: {errors} } = useForm<IForm>({
    defaultValues: {
      name: hotelType?.name ? hotelType.name : '',
      description: hotelType?.description ? hotelType.description : '',
    }
  });

  const onSubmit = handleSubmit((data: IForm) => {
    setIsLoading(true);

    const nextData:any = {
      ...data,
    };

    if (hotelType) {
      dispatch(updateHotelType({ hotelTypeId: hotelType._id, hotelTypeData: nextData }))
        .unwrap()
        .then(() => dispatch(appActions.enqueueSnackbar({ key: uuid(), message: 'Hotel was updated' })))
        .then(() => onClose())
        .finally(() => setIsLoading(false))
    } else {
      dispatch(createHotelType(nextData))
      .unwrap()
      .then(() => dispatch(appActions.enqueueSnackbar({ key: uuid(), message: 'Hotel was created'})))
      .then(() => onClose())
      .finally(() => setIsLoading(false))
    }
  });

  useEffect(() => {
  }, []);

  return (
    <Box sx={{p: 5, width: '100%'}}>
      <Typography variant="h5">
        {`${hotelType ? 'Update' : 'Create'} hotel type`}
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
                  label="Hotel type name"
                  fullWidth
                  required
                  error={!!errors?.name}
                  helperText={errors?.name ? errors.name.message : null}
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
                  {...field}
                  label="Description"
                  fullWidth
                  error={!!errors?.description}
                  helperText={errors?.description ? errors.description.message : null}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Uploader assets={hotelType?.image ? [hotelType?.image] : undefined} />
          </Grid>

        </Grid>

          <LoadingButton
            loading={isLoading}
            type="submit"
            variant="contained"
          >
            {`${hotelType ? 'Update' : 'Create'} hotel type`}
          </LoadingButton>
      </form>
    </Box>
  );
};

export default HotelTypesForm;
