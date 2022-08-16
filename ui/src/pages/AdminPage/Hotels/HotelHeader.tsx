import React from 'react';
// hooks
import useDialog from 'hooks/useDialog';
// Types
import UserRoles from 'types/UserRoles';
// Components
// import UsersForm from './UsersForm';
// MUI
import { Box, Button, Typography } from '@mui/material';
// utilites
import { capitalizeFirstLetter } from 'utilites/getString';
import HotelsForm from './HotelsForm';

const HotelHeader:React.FC = () => {
  const { Dialog, openDialog, closeDialog } = useDialog();

  return <React.Fragment>
  <Dialog>
    <HotelsForm onClose={closeDialog} />
  </Dialog>

  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
    <Typography variant='h5'>Hotels</Typography>
    <Button variant='contained' onClick={openDialog}>Create hotel</Button>
  </Box>
  </React.Fragment>;
}

export default HotelHeader;
