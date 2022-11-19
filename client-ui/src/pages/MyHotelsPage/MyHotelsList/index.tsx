import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// Hooks
import { useAppDispatch } from "hooks/useAppDispatch";
// MUI
import { Box, Tab, Tabs, Pagination, LinearProgress } from "@mui/material";
// Asyncs
import { fetchCurrentUserHotels } from "store/hotels/hotelsAsync";
// Selectors
import { selectHotels, selectTotal } from "store/hotels/hotelsSelectors";
// Components
import MyHotelItem from "../MyHotelItem";
// Styles
import classes from './styles.module.scss';

const MyHotelsList: React.FC = () => {
  const dispatch = useAppDispatch();
  // State
  const [tabValue, setTabValue] = useState('true');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  // Selectors
  const total = useSelector(selectTotal);

  const itemsInOnePage = 10;
  const pages = Math.ceil(total / itemsInOnePage);

  const handleTabValue = (_: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
    setPage(1);
  }

  const hotels = useSelector(selectHotels);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchCurrentUserHotels({
      verified: tabValue,
      limit: itemsInOnePage,
      page: page,
    }))
      .unwrap()
      .finally(() => setIsLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabValue, page])

  return (
    <div>
      <Tabs value={tabValue} onChange={handleTabValue} centered>
        <Tab label="Verified" value="true" />
        <Tab label="Not varified" value="false" />
      </Tabs>

      {isLoading ? (
        <LinearProgress sx={{mt: 3, mb: 3}} />
      ) : (
        <Box className={classes.list_content}>
        <ul className={classes.list}>
          {hotels?.map(hotel => (
            <MyHotelItem hotel={hotel} key={hotel._id}/>
          ))}
        </ul>

        {pages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: '10px 0', borderTop: '1px solid grey'}}>
            <Pagination
              onChange={(_: any, page) => setPage(page)}
              count={pages}
              page={page}
              color="primary"
            />
          </Box>
        )}
      </Box>
      )}

    </div>
  );
};

export default MyHotelsList;
