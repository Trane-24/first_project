import { Box, Grid, TablePagination, CircularProgress, Typography, MenuItem, Drawer } from '@mui/material';
import HotelItem from 'components/HotelItem';
import Title from 'components/Title';
import { useAppDispatch } from 'hooks/useAppDispatch';
import IHotel from 'models/Hotel';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchHotels } from 'store/hotels/hotelsAsync';
import { selectHotels, selectParams, selectTotal } from 'store/hotels/hotelsSelectors';
import { hotelsActions } from 'store/hotels/hotelsSlice';
import classes from './styles.module.scss';
import FilterListIcon from '@mui/icons-material/FilterList';
import HotelsFilter from '../HotelsFilter';

const HotelsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const [ searchParams ] = useSearchParams();
  const search = searchParams.get('search') || '';
  // Selectors
  const hotels = useSelector(selectHotels);
  const total = useSelector(selectTotal);
  const params = useSelector(selectParams);
  // State
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);
  const [stateParams, setStateParams] = useState(params);

  const handleOpenFilter = () => setIsOpenFilter(prev => !prev);

  const handleChangePage = (_:any, value: any) => {
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
  };

  useEffect(() => {
    setIsLoading(true);

    dispatch(fetchHotels({ ...stateParams, search: search }))
      .unwrap()
      .finally(() => setIsLoading(false));
  // eslint-disable-next-line
  }, [search, stateParams]);

  useEffect(() => {
    return () => {
      dispatch(hotelsActions.setInitialField('params'));
    }
  // eslint-disable-next-line
  }, [])

  if (isLoading) return (
    <Box sx={{ display: 'flex', margin: '0 auto'}}>
      <CircularProgress />
    </Box>
  )

  return (
    <Box>
      <Drawer anchor='right' open={isOpenFilter} onClose={handleOpenFilter}>
        <HotelsFilter />
      </Drawer>

      <Box className={classes.listHeader}>
        <Box>
          <Title>Available hotels</Title>
          <Typography className={classes.subtitle}>{`${total} hotels found`}</Typography>
        </Box>
        
        <MenuItem className={classes.filterBtn} onClick={handleOpenFilter}>
          <FilterListIcon />
        </MenuItem>
      </Box>

      <Grid container spacing={2}>
        {hotels?.map((hotel: IHotel) => (
          <Grid item className={classes.card} key={hotel._id}>
            <HotelItem hotel={hotel} />
          </Grid>
        ))}
      </Grid>

      <TablePagination
        component="div"
        count={total}
        page={stateParams.page - 1}
        onPageChange={handleChangePage}
        rowsPerPage={stateParams.limit}
        onRowsPerPageChange={handleChangeLimit}
        rowsPerPageOptions={[20, 50, 100]}
      />
    </Box>
  );
};

export default HotelsList;
