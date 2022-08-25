import { Box } from "@mui/material";
import { makeStyles } from '@mui/styles';
import React  from "react";
import { useSelector } from "react-redux";
import { selectReservations } from "store/reservation/reservationSelectors";
import ReservationsItem from "./ReservationsItem";
// Components

const ReservationList: React.FC = () => {
  const classes = useStyles();

  const reservations = useSelector(selectReservations);

  return (
    <Box className={classes.list}>
    <Box className={classes.items}>
      {reservations?.map((reservation: any) => (
        <ReservationsItem reservation={reservation} key={reservation._id} />
      ))}
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
