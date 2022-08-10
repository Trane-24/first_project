import React from 'react';
// hooks
import useDialog from '../../../hooks/useDialog';
// Types
import UserRoles from '../../../types/UserRoles';
// Components
import UsersForm from './UsersForm';
// MUI
import { Box, Button, Typography } from '@mui/material';
// utilites
import { capitalizeFirstLetter } from '../../../functions';

type Props = {
  role: UserRoles
}

const UsersHeader:React.FC<Props> = ({ role }) => {
  const {Dialog, openDialog, closeDialog} = useDialog();

  return (
    <React.Fragment>
      <Dialog>
        <UsersForm user={null} onClose={closeDialog} role={role} />
      </Dialog>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography variant='h5'>
          {`${capitalizeFirstLetter(role)}s`}
        </Typography>
        <Button variant='contained' onClick={openDialog}>{`create ${role}`}</Button>
      </Box>
    </React.Fragment>
  )
}

export default UsersHeader;
