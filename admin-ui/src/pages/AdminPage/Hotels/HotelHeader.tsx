import React, { useEffect, useState } from 'react';
// hooks
import useDialog from 'hooks/useDialog';
// Components
import HotelsForm from './HotelsForm';
// MUI
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { selectHotelTypes } from 'store/hotelTypes/hotelTypesSelectors';
import { IHotelType } from 'models/HotelType';
import { fetchHotelTypes } from 'store/hotelTypes/hotelTypesAsync';
import { fetchHotels } from 'store/hotels/hotelsAsync';

const HotelHeader:React.FC = () => {
  const dispatch = useAppDispatch();
  // Selector
  const hotelTypes = useSelector(selectHotelTypes);

  const handleHotelType = (e: any) => {
    dispatch(fetchHotels({ hotelType: e.target.value}))
  }

  const { Dialog, openDialog, closeDialog } = useDialog();

  useEffect(() => {
    dispatch(fetchHotelTypes({}))
  }, []);

  return (
    <React.Fragment>
      <Dialog>
        <HotelsForm onClose={closeDialog} />
      </Dialog>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography variant='h5'>Hotels</Typography>
        <Box>
          <TextField
            select
            label="Hotel Types"
            sx={{ width: '150px', pr: 1}}
            size='small'
            onChange={handleHotelType}
          >
            <MenuItem value="">
              All
            </MenuItem>
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
