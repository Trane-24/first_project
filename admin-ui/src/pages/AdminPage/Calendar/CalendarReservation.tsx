import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import useDialog from 'hooks/useDialog';
import IReservation from 'models/Reservation';
import React from 'react';
import ReservationsItem from '../Reservations/ReservationsItem';

interface Props {
  reservation: IReservation;
}

const CalendarReservation: React.FC<Props> = ({ reservation }) => {
  const classes = useStyles();
  const fullName = `${reservation.guest.firstName} ${reservation.guest.lastName}`;

  const {Dialog, openDialog, closeDialog} = useDialog();

  return (
      <React.Fragment>
        <Dialog>
          <ReservationsItem reservation={reservation} onClose={closeDialog} defaultExpanded={true}/>
        </Dialog>

        <div
          className={classes.reservationItem}
          onClick={(e) => {
            e.stopPropagation();
            openDialog();
          }}
        >
          <span className={classes.itemText}>
              {fullName}
          </span>
        </div>
      </React.Fragment>
  )
}

export default CalendarReservation;

const useStyles = makeStyles({
  reservationItem: {
    width: '100%',
    height: '30px',
    padding: '3px 8px',
    backgroundColor: '#48A8D0',
    color: '#ddd',
    borderRadius: '8px',
    transition: 'all 0.3s',

    '&:hover': {
      paddingLeft: '12px',
      color: '#fff',
    }
  },
  itemText: {
    display: 'block',
    overflowX: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
});
