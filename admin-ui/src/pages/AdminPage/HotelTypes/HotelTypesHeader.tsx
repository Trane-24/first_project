import React from 'react';
// hooks
import useDialog from 'hooks/useDialog';
// Components
import HotelTypesForm from './HotelTypesForm';
// MUI
import { Box, Button, Typography } from '@mui/material';

const HotelTypesHeader:React.FC = () => {
  const { Dialog, openDialog, closeDialog } = useDialog();

  return (
    <React.Fragment>
      <Dialog>
        <HotelTypesForm onClose={closeDialog} />
      </Dialog>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography variant='h5'>Hotel types</Typography>
        <Button
          sx={{ height: '40px' }}
          variant='contained'
          onClick={openDialog}
        >
          Create hotel type
        </Button>
      </Box>
    </React.Fragment>
  );
}

export default HotelTypesHeader;
