import { Box, LinearProgress, TablePagination } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { useAppDispatch } from "hooks/useAppDispatch";
import React, { useEffect, useState }  from "react";
import { useSelector } from "react-redux";
import { fetchReservation } from "store/reservation/reservationAsunc";
import { selectParams, selectReservations, selectTotal } from "store/reservation/reservationSelectors";
import { reservationAction } from "store/reservation/reservationSlice";
import ReservationsItem from "./ReservationsItem";
// Components

type Props = {
  guestId?: string;
}

const ReservationList: React.FC<Props> = ({ guestId }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const reservations = useSelector(selectReservations);
  const params = useSelector(selectParams);
  const total = useSelector(selectTotal);

  const [page, setPage] = useState<number>(params.page);
  const [limit, setLimit] = useState<number>(params.limit);

  const handleChangePage = (_: any, value: any) => {
    setIsLoading(true);
    setPage(value + 1)
    dispatch(fetchReservation({ ...params, page: value + 1 }))
      .unwrap()
      .finally(() => setIsLoading(false))
  };

  const handleChangeLimit = (event:any) => {
    const { value } = event.target;
    setLimit(value);
    setPage(1);
    dispatch(fetchReservation({ ...params, limitm: value, page: 1 }))
      .unwrap()
      .finally(() => setIsLoading(false))
  };

  useEffect(() => {
    setPage(params.page)
  }, [params.page]);

  useEffect(() => {
    if (guestId) dispatch(fetchReservation({ ...params, guest: guestId }))

    return () => {
      dispatch(reservationAction.setInitialField('params'));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guestId]);

  if (isLoading) return <LinearProgress />
  if (!reservations) return null;

  return (
    <Box className={classes.list}>

      {reservations.length ? <>
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
            page={page - 1}
            onPageChange={handleChangePage}
            rowsPerPage={limit}
            onRowsPerPageChange={handleChangeLimit}
            rowsPerPageOptions={[20, 50, 100]}
          />
        </Box>
      </> : (
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
  image: {
    // objectFit: 'contain',
    maxHeight: 'calc(100vh - 202px)',
    '@media (min-width: 600px)': {
      maxHeight: 'calc(100vh - 222px)',
    },
  }
})
