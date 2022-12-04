import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
// Async
import { fetchHotels } from 'store/hotels/hotelsAsync';
// Actions
import { hotelsActions } from 'store/hotels/hotelsSlice';
// Models
import IHotel from 'models/Hotel';
// Selectors
import { selectHotels, selectParams, selectTotal } from 'store/hotels/hotelsSelectors';
// Components
import HotelItem from './HotelItem';
// MUI
import { Box, LinearProgress, TablePagination } from '@mui/material';
import { makeStyles } from '@mui/styles';

type Props = {
  ownerId?: string;
}

const HotelList:React.FC<Props> = ({ ownerId }) => {
  const classes = useStyles();
  // dispatch
  const dispatch = useAppDispatch();

  const hotels = useSelector(selectHotels);
  const total = useSelector(selectTotal);
  const params = useSelector(selectParams);
  // state
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePage = (_: any, value: any) => {
    dispatch(fetchHotels({...params, page: value + 1}))
  };

  const handleChangeLimit = (event:any) => {
    const { value: limit } = event.target;

    dispatch(fetchHotels({...params, page: 1, limit}))
  }

  useEffect(() => {
    setIsLoading(true);

    dispatch(fetchHotels({ ...params, owner: ownerId }))
      .unwrap()
      .finally(() => setIsLoading(false));

    // eslint-disable-next-line
  }, []);

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
      {!!hotels.length ? (
        <React.Fragment>
          <Box className={classes.items}>
            {hotels.map((hotel: IHotel) => (
              <HotelItem key={hotel._id} hotel={hotel} />
            ))}
          </Box>
          <Box>
            <TablePagination
              className={classes.pagination}
              component="div"
              labelRowsPerPage="Items"
              count={total}
              page={params.page - 1}
              onPageChange={handleChangePage}
              rowsPerPage={params.limit}
              onRowsPerPageChange={handleChangeLimit}
              rowsPerPageOptions={[20, 50, 100]}
            />
          </Box>
        </React.Fragment>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center'}}>
          <p style={{ position: 'absolute'}}>List is empty</p>
          <img
            className={classes.image}
            src="/images/list_is_empty.jpg"
            alt="reservation_is_empty"
          />
        </div>
      )}
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
    maxHeight: 'calc(100vh - 335px)',
    overflowY: 'scroll',
    '@media (min-width: 700px)': {
      maxHeight: 'calc(100vh - 222px)',
    },
  },
  pagination: {
    marginTop: '6px',
    boxShadow: '0px -3px 6px -1px rgb(0 0 0 / 8%)',
  },
  image: {
    maxHeight: 'calc(100vh - 277px)',
    '@media (min-width: 600px)': {
      maxHeight: 'calc(100vh - 156px)',
    },
  }
})
