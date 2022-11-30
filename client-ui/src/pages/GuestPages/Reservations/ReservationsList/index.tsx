import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// Actions
import { reservationAction } from "store/reservations/reservationsSlice";
// Hooks
import { useAppDispatch } from "hooks/useAppDispatch";
// MUI
import { Box, Tab, Tabs, LinearProgress, TablePagination } from "@mui/material";
// Asyncs
import { fetchReservation } from "store/reservations/reservationsAsync";
// Selectors
import { selectParams, selectReservations, selectTotal } from "store/reservations/reservationsSelectors";
// Components
import ReservationsItem from "../ReservationItem";
// Styles
import classes from './styles.module.scss';
// Types
import ReservationStatuses from "types/ReservationStatuses";

const ReservationsList: React.FC = () => {
  const dispatch = useAppDispatch();
  // Selectors
  const total = useSelector(selectTotal);
  const params = useSelector(selectParams);
  // State
  const [tabValue, setTabValue] = useState('pending');
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(params.page);
  const [limit, setLimit] = useState<number>(params.limit);

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

  const reservations = useSelector(selectReservations);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchReservation({
      status: tabValue,
      limit: limit,
      page: page,
    }))
      .unwrap()
      .finally(() => setIsLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabValue, page, limit])

  useEffect(() => {
    return () => {
      dispatch(reservationAction.setInitialField('params'));
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <Tabs value={tabValue} onChange={handleTabValue} centered>
        {Object.entries(ReservationStatuses).map(status => {
          const [title, value] = status;

          return (<Tab label={title} value={value} key={value}/>)
        })}
      </Tabs>

      {isLoading ? (
        <LinearProgress sx={{mt: 3, mb: 3}} />
      ) : (
        <Box className={classes.list_content}>
        <ul className={classes.list}>
          {reservations?.map(reservation => (
            <ReservationsItem reservation={reservation} key={reservation._id}/>
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

export default ReservationsList;
