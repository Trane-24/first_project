import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
// Hooks
import { useAppDispatch } from "hooks/useAppDispatch";
// Models
import IHotelType from "models/HotelType";
// Async
import { createHotelType, updateHotelType } from "store/hotelTypes/hotelTypesAsync";
// Actions
import { appActions } from "store/app/appSlice";
// Mui
import { LoadingButton } from "@mui/lab";
import { Button, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from "@mui/material";
// Utilites
import { isRequired } from "utilites/validation";
// Components
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
    <React.Fragment>
      <DialogTitle>
        <Typography variant="h5">
          {`${hotelType ? 'Update' : 'Create'} hotel type`}
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
        </form>
      </DialogContent>

      <DialogActions sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2}}>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>

        <LoadingButton
          loading={isLoading}
          variant="contained"
          onClick={onSubmit}
        >
          {hotelType ? 'Update' : 'Create'}
        </LoadingButton>
      </DialogActions>
    </React.Fragment>
  );
};

export default HotelTypesForm;
