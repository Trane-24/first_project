import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// Hooks
import { useAppDispatch } from "hooks/useAppDispatch";
import useDialog from "hooks/useDialog";
// Store
import { reservationAction } from "store/reservation/reservationSlice";
// Async
import { fetchReservation } from "store/reservation/reservationAsync";
// Selectors
import { selectParams } from "store/reservation/reservationSelectors";
// Type
import ReservationStatuses from "types/ReservationStatuses";
// MUI
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
// Components
import ReservationForm from "./ReservationsForm";
import { makeStyles } from "@mui/styles";

const ReservationHeader: React.FC = () => {
  // dispath
  const dispatch = useAppDispatch();
  // Styles
  const classes = useStyles();
  // Selectors
  const params = useSelector(selectParams);
  // State
  const [status, setStatus] = useState('');
  const [stateParams, setStateParams] = useState(params);
  // Dialog
  const {Dialog, openDialog, closeDialog} = useDialog();

  const handleChangeStatus = (e: any) => {
    const { value } = e.target
    setStatus(value);

    setStateParams({
      ...stateParams,
      status: value !== 'all' ? value : '',
      page: 1,
    })
  };

  useEffect(() => {
    dispatch(fetchReservation({ ...stateParams}))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateParams]);

  useEffect(() => {
    return () => {
      dispatch(reservationAction.setInitialField('params'));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
    <Dialog>
      <ReservationForm onClose={closeDialog}/>
    </Dialog>

    <Box className={classes.header}>
      <Typography className={classes.title} variant='h5' sx={{ pr: 1 }}>Reservations</Typography>
      <Box className={classes.headeContent}>
        <TextField
          sx={{ minWidth: '150px'}}
          select
          size="small"
          label="Status"
          value={status}
          onChange={(e) => handleChangeStatus(e)}
        >
          <MenuItem value={'all'}>All</MenuItem>
          {Object.entries(ReservationStatuses).map((status) => {
            const [title, value] = status;

            return (<MenuItem key={value} value={value} >{title}</MenuItem>)
          })}
        </TextField>
        <Button sx={{ height: '40px' }} variant='contained' onClick={openDialog}>Add reservation</Button>
      </Box>
    </Box>
  </React.Fragment>
  )
};

export default ReservationHeader;

const useStyles = makeStyles({
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    wrap: 'flex-wrap',
    '@media (min-width: 600px)': {
      flexDirection: 'row',
    }
  },
  title: {
    alignSelf: 'flex-start',
    marginBottom: '10px',
    '@media (min-width: 600px)': {
      alignSelf: 'center',
      marginBottom: '0',
    }
  },
  headeContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '8px',
    '@media (min-width: 600px)': {
      flexDirection: 'row',
      width: 'max-content',
    }
  }
});
