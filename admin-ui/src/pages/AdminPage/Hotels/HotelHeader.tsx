import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
// hooks
import useDialog from 'hooks/useDialog';
import { useAppDispatch } from 'hooks/useAppDispatch';
// Async
import { fetchHotels } from 'store/hotels/hotelsAsync';
import { fetchHotelTypes } from 'store/hotelTypes/hotelTypesAsync';
// Selectors
import { selectParams } from 'store/hotels/hotelsSelectors';
import { selectHotelTypes } from 'store/hotelTypes/hotelTypesSelectors';
// Models
import IHotelType from 'models/HotelType';
// MUI
import {
  Box, Button, MenuItem, TextField, Typography,
} from '@mui/material';
// Components
import HotelsForm from './HotelsForm';

const HotelHeader:React.FC = () => {
  const dispatch = useAppDispatch();
  // State
  const hotelTypes = useSelector(selectHotelTypes);
  const params = useSelector(selectParams);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: hotelType } = e.target;
    dispatch(fetchHotels({ ...params, hotelType, page: 1 }));
  }

  useEffect(() => {
    dispatch(fetchHotelTypes({}))
    // eslint-disable-next-line
  }, []);

  const { Dialog, openDialog, closeDialog } = useDialog();

  return (
    <React.Fragment>
      <Dialog maxWidth="md">
        <HotelsForm onClose={closeDialog} />
      </Dialog>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography variant='h5'>Hotels</Typography>
        <Box>
          <TextField
            select
            label="Hotel Types"
            sx={{ width: '200px', pr: 1}}
            size='small'
            value={params.hotelType}
            onChange={onChange}
          >
            <MenuItem value=" ">
              Any
            </MenuItem>
            {hotelTypes?.map((hotelType: IHotelType) => (
              <MenuItem value={hotelType._id} key={hotelType._id}>
                {hotelType.name}
              </MenuItem>
            ))}
          </TextField>

          <Button
            sx={{ height: '40px' }}
            variant='contained'
            onClick={openDialog}
          >
            Create hotel
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default HotelHeader;
