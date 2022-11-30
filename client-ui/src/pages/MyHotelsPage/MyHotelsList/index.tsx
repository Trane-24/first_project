import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
// Hooks
import { useAppDispatch } from "hooks/useAppDispatch";
// MUI
import { Box, Tab, Tabs, LinearProgress, TablePagination } from "@mui/material";
// Asyncs
import { fetchCurrentUserHotels } from "store/hotels/hotelsAsync";
// Selectors
import { selectHotels, selectParams, selectTotal } from "store/hotels/hotelsSelectors";
// Components
import MyHotelItem from "../MyHotelItem";
// Styles
import classes from './styles.module.scss';
import { hotelsActions } from "store/hotels/hotelsSlice";
import IHotel from "models/Hotel";

const MyHotelsList: React.FC = () => {
  const dispatch = useAppDispatch();
  // State
  const [tabValue, setTabValue] = useState<string>('verified');
  const params = useSelector(selectParams);
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(params.page);
  const [limit, setLimit] = useState<number>(params.limit);
  // Selectors
  const total = useSelector(selectTotal);

  const handleTabValue = (_: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
    setPage(1);
  };

  const handleChangePage = (_: any, num: number) => {
    setPage(num + 1);
  };

  const handleChangeLimit = (event: any) => {
    setLimit(event.target.value)
    setPage(1);
  }

  const hotels = useSelector(selectHotels);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchCurrentUserHotels({
      verified: tabValue === 'verified',
      limit: limit,
      page: page,
    }))
      .unwrap()
      .finally(() => setIsLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabValue, page, limit])

  useEffect(() => {
    return () => {
      dispatch(hotelsActions.setInitialField('params'));
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <Tabs value={tabValue} onChange={handleTabValue} centered>
        <Tab label="Verified" value="verified" />
        <Tab label="Not verified" value="notVerified" />
      </Tabs>

      {isLoading ? (
        <LinearProgress sx={{mt: 3, mb: 3}} />
      ) : (
        <Box className={classes.list_content}>
        <ul className={classes.list}>
          {hotels?.map((hotel: IHotel) => (
            <MyHotelItem hotel={hotel} key={hotel._id}/>
          ))}
        </ul>

        <Box>
          <TablePagination
            className={classes.pagination}
            component="div"
            labelRowsPerPage="Items"
            count={total}
            page={page - 1}
            onPageChange={handleChangePage}
            rowsPerPage={limit}
            onRowsPerPageChange={handleChangeLimit}
            rowsPerPageOptions={[15, 30, 50]}
          />
        </Box>
      </Box>
      )}

    </div>
  );
};

export default MyHotelsList;
