import { Box, LinearProgress, TablePagination } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { useAppDispatch } from "hooks/useAppDispatch";
import React, { useEffect, useState }  from "react";
import { useSelector } from "react-redux";
import { fetchReservation } from "store/reservation/reservationAsunc";
import { selectParams, selectReservations, selectTotal } from "store/reservation/reservationSelectors";
import ReservationsItem from "./ReservationsItem";
// Components

const ReservationList: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  

  const reservations = useSelector(selectReservations);
  const params = useSelector(selectParams);
  const total = useSelector(selectTotal);

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
  };

  useEffect(() => {
    setIsLoading(true);

    dispatch(fetchReservation({...stateParams}))
      .unwrap()
      .finally(() => setIsLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateParams]);

  if (isLoading) return <LinearProgress />
  if (!reservations) return null;

  return (
    <Box className={classes.list}>
      <Box className={classes.items}>
        {reservations?.map((reservation: any) => (
          <ReservationsItem reservation={reservation} key={reservation._id} />
        ))}
      </Box>
      <Box>
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
};

export default ReservationList;

const useStyles = makeStyles({
  list: {
    marginTop: '20px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0px 0px 0px 1px #E0E0E0',
    overflow: 'hidden',
  },
  items: {
    maxHeight: 'calc(100vh - 202px)',
    overflowY: 'scroll',
    '@media (min-width: 600px)': {
      maxHeight: 'calc(100vh - 222px)',
    },
  },
  pagination: {
    marginTop: '6px',
    boxShadow: '0px -3px 6px -1px rgb(0 0 0 / 8%)',
  },
})
