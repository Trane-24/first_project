import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// Hooks
import { useAppDispatch } from "hooks/useAppDispatch";
// MUI
import { Box, Tab, Tabs, LinearProgress, TablePagination } from "@mui/material";
// Asyncs
import { fetchCurrentUserHotels } from "store/hotels/hotelsAsync";
// Selectors
import { selectMyHotels, selectMyHotelsTotal } from "store/hotels/hotelsSelectors";
// Components
import MyHotelItem from "../MyHotelItem";
// Styles
import classes from './styles.module.scss';
import { hotelsActions } from "store/hotels/hotelsSlice";
import IHotel from "models/Hotel";
import NoData from "components/NoData";

const MyHotelsList: React.FC = () => {
  const dispatch = useAppDispatch();
  // State
  const [tabValue, setTabValue] = useState<string>('true');
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);
  // Selectors
  const total = useSelector(selectMyHotelsTotal);

  const handleTabValue = (_: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
    setPage(1);
    setLimit(20);
  };

  const handleChangePage = (_: any, num: number) => {
    setPage(num + 1);
  };

  const handleChangeLimit = (event: any) => {
    setLimit(event.target.value)
    setPage(1);
  }

  const hotels = useSelector(selectMyHotels);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchCurrentUserHotels({
      verified: tabValue,
      limit: limit,
      page: page,
    }))
      .unwrap()
      .finally(() => setIsLoading(false))
  // eslint-disable-next-line
  }, [tabValue, page, limit])

  useEffect(() => {
    return () => {
      dispatch(hotelsActions.setInitialField('myHotels'));
      dispatch(hotelsActions.setInitialField('myHotelsTotal'));
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <Tabs value={tabValue} onChange={handleTabValue} centered>
        <Tab label="Verified" value="true" />
        <Tab label="Not verified" value="false" />
      </Tabs>

      {isLoading ? (
        <LinearProgress sx={{mt: 3, mb: 3}} />
      ) : (
        <React.Fragment>
          {!hotels?.length ? (
            <NoData />
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
          
        </React.Fragment>
      )}

    </div>
  );
};

export default MyHotelsList;
