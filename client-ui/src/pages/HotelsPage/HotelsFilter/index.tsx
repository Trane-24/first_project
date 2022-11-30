import React, { useEffect, useState } from 'react';
// MUI
import { Divider, MenuItem, Paper, Typography, Box, FormControlLabel, Checkbox, FormGroup, Skeleton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { selectHotelTypes } from 'store/hotelTypes/hotelTypesSelectors';
import IHotelType from 'models/HotelType';
import { fetchHotelTypes } from 'store/hotelTypes/hotelTypesAsync';
import { selectParams } from 'store/hotels/hotelsSelectors';
import { hotelsActions } from 'store/hotels/hotelsSlice';

interface Props {
  modal?: boolean;
  onClose?: () => void;
}

const HotelsFilter: React.FC<Props> = ({ modal = false, onClose }) => {
  const dispatch = useAppDispatch();
  const hotelTypes = useSelector(selectHotelTypes);
  const params = useSelector(selectParams);

  // State
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: any) => {
    const { value } = e.target;

    dispatch(hotelsActions.changeHotelType(value))
  }

  useEffect(() => {
    setIsLoading(true);

    dispatch(fetchHotelTypes({}))
      .finally(() => setIsLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Paper style={{ minWidth: '280px', padding: '30px 0', boxShadow: 'rgb(0 0 0 / 8%) 0px 4px 32px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <Typography sx={{ pb: 1, pl: 2, fontSize: '22px', fontWeight: 500 }}>
          Filters
        </Typography>

        {modal && (
          <MenuItem onClick={onClose}>
            <CloseIcon />
          </MenuItem>
        )}
      </Box>

      <Divider />

      <Typography sx={{ pt: 2, pb: 1, pl: 2, fontSize: '14px', color: 'rgba(0, 0, 0, 0.5)', fontWeight: 500 }}>
        Property types
      </Typography>

      {isLoading ? (
        <Box sx={{ margin: '0 auto', p: 2}}>
          <Box>
            <Skeleton height="45px"/>
            <Skeleton animation="wave" height="45px"/>
            <Skeleton height="45px"/>
            <Skeleton height="45px"/>
            <Skeleton animation="wave" height="45px"/>
            <Skeleton height="45px"/>
          </Box>
        </Box>
      ) : (
        <FormGroup sx={{ pl: 2 }}>
          {hotelTypes?.map((hotelType: IHotelType) => (
            <FormControlLabel
              control={
                <Checkbox
                  value={hotelType._id}
                  onClick={handleChange}
                  checked={params.hotelType.includes(hotelType._id)}
                />
              }
              label={hotelType.name}
              key={hotelType._id}
            />
          ))}
        </FormGroup>
      )}
    </Paper>
  );
};

export default HotelsFilter;
