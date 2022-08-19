import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
// Async
import { fetchHotels } from 'store/hotels/hotelsAsync';
// Models
import IHotel from 'models/Hotel';
// Selectors
import { selectHotels, selectParams, selectTotal } from 'store/hotels/hotelsSelectors';
// Components
import HotelItem from './HotelItem';
// MUI
import { Box, LinearProgress, TablePagination } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { hotelsActions } from 'store/hotels/hotelsSlice';

const HotelList:React.FC = () => {
  const classes = useStyles();
  // dispatch
  const dispatch = useAppDispatch();

  const hotels = useSelector(selectHotels);
  const total = useSelector(selectTotal);
  const params = useSelector(selectParams);
  // state
  const [isLoading, setIsLoading] = useState(false);
  const [stateParams, setStateParams] = useState(params);

  const handleChangePage = (_: any, value: any) => {
    setStateParams({
      ...stateParams,
      page: value + 1,
    })
  };

  const handleChangeLimit = (event:any) => {
    const { value } = event.target;
    setStateParams({
      ...stateParams,
      limit: value,
      page: 1,
    })
  }

  useEffect(() => {
    setIsLoading(true);

    dispatch(fetchHotels({ ...stateParams }))
      .unwrap()
      .finally(() => setIsLoading(false));

    // eslint-disable-next-line
  }, [stateParams]);

  useEffect(() => {
    return () => {
      dispatch(hotelsActions.setInitialField('params'));
    }

    // eslint-disable-next-line
  }, [])

  if (isLoading) return <LinearProgress />
  if (!hotels) return null;

  return (
    <Box className={classes.list}>
      <Box className={classes.items}>
        {hotels.map((hotel: IHotel) => (
          <HotelItem key={hotel._id} hotel={hotel} />
        ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <TablePagination
          className={classes.pagination}
          component="div"
          count={total}
          page={stateParams.page - 1}
          onPageChange={handleChangePage}
          rowsPerPage={stateParams.limit}
          onRowsPerPageChange={handleChangeLimit}
          rowsPerPageOptions={[20, 50, 100]}
        />
      </Box>
    </Box>
  )
}

export default HotelList;

const useStyles = makeStyles({
  list: {
    marginTop: '20px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0px 0px 0px 1px #E0E0E0',
    overflow: 'hidden',
  },
  items: {
    maxHeight: 'calc(100vh - 196px)',
    overflowY: 'scroll',
    '@media (min-width: 600px)': {
      maxHeight: 'calc(100vh - 216px)',
    },
  },
  pagination: {
    boxShadow: '0px -3px 6px -1px rgb(0 0 0 / 8%)',
  },
})
