import React, { useState } from 'react';
// Models
import IReservation from 'models/Reservation';
// Types
import ReservationStatuses from 'types/ReservationStatuses';
// MUI
import {
  Accordion, AccordionDetails, AccordionSummary,
  Chip, Divider, Grid, Typography
} from '@mui/material';
import {
  Done as DoneIcon,
  DoneAll as DoneAllIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
  // utilites
import { formatStartAndEndDates } from 'utilites/dateFormatter';
import config from 'config';
// Styles
import classes from './styles.module.scss';

interface Props {
  reservation: IReservation;
}

const ReservationsItem: React.FC<Props> = ({ reservation }) => {
  const [isActive, setIsActive] = useState(false);

  const handleIsActive = (e: any) => {
    setIsActive(!isActive);
  };

  const { images, name, city, country, hotelType} = reservation.hotel;
  const imgUrl = images?.length !== 0 ? images[0].path : '/img/hotel-no-available.png';


  return (
    <React.Fragment>
      <Accordion disableGutters>
        <AccordionSummary
          sx={{
            userSelect: 'text',
            backgroundColor: isActive ? '#ededed' : '#fff',
          }}
          onClick={handleIsActive}
        >
          <Grid container sx={{ display: 'flex', alignItems: 'center'}} spacing={2}>
            <Grid item xs={12} sm={5} className={classes.row}>
              <Typography className={classes.title}>Hotel name</Typography>
              <Typography className={classes.text}>{name}</Typography>
            </Grid>

            <Grid item xs={12} sm={4} className={classes.row}>
              <Typography className={classes.title}>Hotel type</Typography>
              <Typography className={classes.text}>{hotelType.name}</Typography>
            </Grid>

            <Grid item xs={12} sm={3} className={classes.row}>
              <Typography className={classes.title}>
                Date
              </Typography>
              <Typography className={classes.text}>
                {formatStartAndEndDates(reservation.startDate, reservation.endDate)}
              </Typography>
              {reservation.status === ReservationStatuses.Submitted && <Chip size="small" color="info" label="Submitted" icon={<DoneIcon />} />}
              {reservation.status === ReservationStatuses.Cancelled && <Chip size="small" color="error" label="Cancelled" icon={<CloseIcon />} />}
              {reservation.status === ReservationStatuses.Completed && <Chip size="small" color="success" label="Completed" icon={<DoneAllIcon />} />}
            </Grid>

            <Grid item xs={12}>
              <Typography className={classes.title}>Notes</Typography>
              <Typography className={classes.text}>{reservation.notes}</Typography>
            </Grid>
          </Grid>
        </AccordionSummary>

        <AccordionDetails sx={{ backgroundColor: isActive ? '#ededed' : '#fff' }}>
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={5}>
              <img src={imgUrl} alt={name} className={classes.img}/>
            </Grid>

            <Grid item xs={12} sm={4} className={classes.row}>
              <Typography className={classes.title}>Country</Typography>
              <Typography className={classes.text}>{country}</Typography>
            </Grid>

            <Grid item xs={12} sm={3} className={classes.row}>
              <Typography className={classes.title}>City</Typography>
              <Typography className={classes.text}>{city}</Typography>
            </Grid>

          </Grid>
        </AccordionDetails>
      </Accordion>

    </React.Fragment>
  );
};

export default ReservationsItem;
