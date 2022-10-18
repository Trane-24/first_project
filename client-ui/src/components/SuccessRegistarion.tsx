import React from 'react';
// MUI
import { Box, Button, Typography } from '@mui/material';
import Title from './Title';

type Props = {
  onClose: () => void;
}

const SuccessRegistarion:React.FC<Props> = ({ onClose }) => {
  return (
    <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <Title>You are successfully registered!</Title>
      <Typography>Sign In, please!</Typography>
      <Button
        onClick={onClose}
        variant="contained"
      >Close</Button>
    </Box>
  );
}

export default SuccessRegistarion;
