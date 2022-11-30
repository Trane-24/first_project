import { Box, Grid, TablePagination, LinearProgress,
  Typography, MenuItem, Drawer, Chip, Pagination
} from '@mui/material';
import HotelItem from 'components/HotelItem';
import Title from 'components/Title';
import { useAppDispatch } from 'hooks/useAppDispatch';
import IHotel from 'models/Hotel';
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { fetchHotels } from 'store/hotels/hotelsAsync';
import { selectHotels, selectParams, selectTotal } from 'store/hotels/hotelsSelectors';
import { hotelsActions } from 'store/hotels/hotelsSlice';
import classes from './styles.module.scss';
import FilterListIcon from '@mui/icons-material/FilterList';
import HotelsFilter from '../HotelsFilter';
import { selectHotelTypes } from 'store/hotelTypes/hotelTypesSelectors';
import IHotelType from 'models/HotelType';

const HotelsList: React.FC = () => {
  const dispatch = useAppDispatch();
  // Selectors
  const hotels = useSelector(selectHotels);
  const total = useSelector(selectTotal);
  const params = useSelector(selectParams);
  const hotelTypes = useSelector(selectHotelTypes);
  // State
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);

  const isEmptyFilter = useMemo(() => !params.hotelType?.length && !params.search, [params.hotelType ,params.search]);

  const totalPages = Math.ceil(total / params.limit);

  const isShowPagination = useMemo(() => totalPages > 1, [params, total]);

  const handleOpenFilter = () => setIsOpenFilter(prev => !prev);

  const deleteHotelType = (value: string) => {
    dispatch(hotelsActions.changeHotelType(value));
  }

  const handleChangePage = (_: any, page: any) => {
    setIsLoading(true);

    dispatch(fetchHotels({ ...params, page }))
      .unwrap()
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);

    dispatch(fetchHotels({ ...params, page: 1 }))
      .unwrap()
      .finally(() => setIsLoading(false));
  // eslint-disable-next-line
  }, [params.hotelType, params.search]);

  useEffect(() => {
    return () => {
      dispatch(hotelsActions.setInitialField('params'));
    }
  // eslint-disable-next-line
  }, [])

  return (
    <Box sx={{ width: '100%'}}>
      <Drawer anchor='right' open={isOpenFilter} onClose={handleOpenFilter}>
        <HotelsFilter modal={true} onClose={handleOpenFilter} />
      </Drawer>

      <Box className={classes.listHeader}>
        <Box>
          <Title>Available hotels</Title>
          <Typography className={classes.subtitle}>
            {`${isLoading ? '...' : total} hotels found`}
          </Typography>

          <Box className={classes.chips}>
            {hotelTypes?.map((hotelType: IHotelType) => {
              if (params.hotelType.includes(hotelType._id)) {
                return (
                  <Chip
                    size='small'
                    key={hotelType._id}
                    label={hotelType.name}
                    onDelete={() => deleteHotelType(hotelType._id)}
                  />
                )
              } else {
                return null;
              }
            })}
          </Box>
        </Box>
        
        <MenuItem className={classes.filterBtn} onClick={handleOpenFilter}>
          <FilterListIcon />
        </MenuItem>
      </Box>
      
      {isLoading ? (
        <Box sx={{width: '100%'}}>
          <LinearProgress />
        </Box>
      ) : (
        <Box>
          {isEmptyFilter && !hotels?.length ? (
            <p>Empty List</p>
          ) : !isEmptyFilter && !hotels?.length ? (
            <p>No data matching your search or filter criteria</p>
          ) : (
            <Grid container spacing={2}>
            {hotels?.map((hotel: IHotel) => (
              <Grid item className={classes.card} key={hotel._id}>
                <HotelItem hotel={hotel} />
              </Grid>
            ))}
          </Grid>
          )}

          {isShowPagination && (
            <Box className={classes.paginationWrap}>
              <Pagination
                count={totalPages}
                color="primary"
                page={params.page}
                onChange={handleChangePage}
              />
            </Box>
          )}

        </Box>
      )}
    </Box>
  );
};

export default HotelsList;
