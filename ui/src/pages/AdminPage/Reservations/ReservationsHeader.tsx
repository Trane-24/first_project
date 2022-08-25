import { Box, Button, Typography } from "@mui/material";
import { useAppDispatch } from "hooks/useAppDispatch";
import useDialog from "hooks/useDialog";
import React, { useEffect }  from "react";
import { fetchReservation } from "store/reservation/reservationAsunc";
import ReservationForm from "./ReservationsForm";
// Components

const ReservationHeader: React.FC = () => {
  const dispatch = useAppDispatch();

  const {Dialog, openDialog, closeDialog} = useDialog();

  useEffect(() => {
    dispatch(fetchReservation({}))
  }, [])

  return (
    <React.Fragment>
    <Dialog>
      <ReservationForm onClose={closeDialog}/>
    </Dialog>

    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '48px'}}>
      <Typography variant='h5'>Reservations</Typography>
      <Button variant='contained' onClick={openDialog}>Add reservation</Button>
    </Box>
  </React.Fragment>
  )
};

export default ReservationHeader;
