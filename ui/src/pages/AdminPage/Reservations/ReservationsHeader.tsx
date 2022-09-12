import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// Hooks
import { useAppDispatch } from "hooks/useAppDispatch";
import useDialog from "hooks/useDialog";
// Store
import { reservationAction } from "store/reservation/reservationSlice";
// Async
import { fetchReservation } from "store/reservation/reservationAsunc";
// Selectors
import { selectParams } from "store/reservation/reservationSelectors";
// Type
import ReservationStatus from "types/ReservationStatus";
// MUI
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
// Components
import ReservationForm from "./ReservationsForm";

const ReservationHeader: React.FC = () => {
  // dispath
  const dispatch = useAppDispatch();
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
  }, []);

  return (
    <React.Fragment>
    <Dialog>
      <ReservationForm onClose={closeDialog}/>
    </Dialog>

    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '48px'}}>
      
      <Typography variant='h5'>Reservations</Typography>
      <Box sx={{ display: 'flex', gap: 2}}>
        <TextField
          sx={{ width: '150px'}}
          select
          size="small"
          label="Status"
          value={status}
          onChange={(e) => handleChangeStatus(e)}
        >
          <MenuItem value={'all'}>All</MenuItem>
          {Object.entries(ReservationStatus).map((status) => {
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
