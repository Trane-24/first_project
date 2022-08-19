import React, { useCallback, useEffect, useState } from 'react';
// hooks
import useDialog from 'hooks/useDialog';
// Types
import UserRoles from 'types/UserRoles';
// Components
import UsersForm from './UsersForm';
// MUI
import { Box, Button, TextField, Typography, debounce } from '@mui/material';
// utilites
import { capitalizeFirstLetter } from 'utilites/getString';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { usersActions } from 'store/users/usersSlice';
import { fetchUsers } from 'store/users/usersAsync';
import { useSelector } from 'react-redux';
import { selectParams } from 'store/users/usersSelectors';

type Props = {
  role: UserRoles
}

const UsersHeader:React.FC<Props> = ({ role }) => {
  // dispatch
  const dispatch = useAppDispatch();
  // State
  const [queryValue, setQueryValue] = useState('');
  // Selectors
  const params = useSelector(selectParams);
  //Dialog
  const { Dialog, openDialog, closeDialog } = useDialog();

  const changeQueryValue = (value: string) => setQueryValue(value);

  const debouncedChangeHandler = useCallback(
    debounce(changeQueryValue, 1000)
  , []);

  useEffect(() => {
    dispatch(fetchUsers({ ...params, search: queryValue}))
  }, [queryValue]);

  return (
    <React.Fragment>
      <Dialog>
        <UsersForm onClose={closeDialog} role={role} />
      </Dialog>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography variant='h5'>
          {`${capitalizeFirstLetter(role)}s`}
        </Typography>
        <Box sx={{ display: 'flex' ,  alignItems: 'center', gap: 2}}>
          <TextField
            sx={{ height: '100%', position: 'relative', bottom: '6px'}}
            variant="standard"
            label="Search by name"
            placeholder='...'
            onChange={(e) => {
              debouncedChangeHandler(e.target.value);
            }}
          />
          <Button variant="contained" onClick={openDialog}>
            {`Create ${role}`}
          </Button>
        </Box>
        
      </Box>
    </React.Fragment>
  )
}

export default UsersHeader;
