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
import { makeStyles } from '@mui/styles';

const HotelHeader:React.FC = () => {
  const dispatch = useAppDispatch();
  // State
  const hotelTypes = useSelector(selectHotelTypes);
  const params = useSelector(selectParams);
  // Styles
  const classes = useStyles();

  const onChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: hotelType } = e.target;
    dispatch(fetchHotels({ ...params, hotelType, page: 1 }));
  }

  const onChangeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: verified } = e.target;
    // setStatus(verified);
    dispatch(fetchHotels({
      ...params,
      verified,
      page: 1
    }));
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

      <Box className={classes.header}>
        <Typography variant='h5' className={classes.title}>Hotels</Typography>
        <Box className={classes.headerContent}>
          <TextField
            select
            label="Hotel Types"
            className={classes.textFild}
            size='small'
            value={params.hotelType}
            onChange={onChangeType}
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

          <TextField
            select
            label="Verified"
            className={classes.textFild}
            size='small'
            value={params.verified}
            onChange={onChangeStatus}
          >
            <MenuItem value=" ">
              All
            </MenuItem>
              
            <MenuItem value={'true'}>
              Verified
            </MenuItem>

            <MenuItem value={'false'}>
              Unverified
            </MenuItem>
          </TextField>

          <Button
            sx={{ height: '40px' }}
            size='small'
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

const useStyles = makeStyles({
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    '@media (min-width: 700px)': {
      flexDirection: 'row',
    }
  },
  title: {
    alignSelf: 'flex-start',
    marginBottom: '10px',
    '@media (min-width: 700px)': {
      marginBottom: '0',
      alignSelf: 'center',
    }
  },
  headerContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'stretch',
    gap: '10px',
    '@media (min-width: 700px)': {
      flexDirection: 'row',
      width: 'max-content',
    }
  },
  textFild: {
    width: '100%',
    paddingRight: '0',
    '@media (min-width: 700px)': {
      width: '200px',
      paddingRight: '8px',
    }
  }
});
