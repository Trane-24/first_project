import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// Mui
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, IconButton } from '@mui/material';
import ReservationList from '../Reservations/ReservationsList';

const UserReservations: React.FC = () => {
  const { guestId } = useParams();
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <React.Fragment>
      <Box>
        <IconButton onClick={goBack}>
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <ReservationList guestId={guestId} />
    </React.Fragment>
  );
};

export default UserReservations;
