import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// Mui
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, IconButton } from '@mui/material';
import HotelList from '../Hotels/HotelList';

const UserHotels: React.FC = () => {
  const { ownerId } = useParams();
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <React.Fragment>
      <Box>
        <IconButton onClick={goBack}>
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <HotelList ownerId={ownerId} />
    </React.Fragment>
  );
};

export default UserHotels;
