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
  // Selectors
  const params = useSelector(selectParams);
  // State
  const [search, setSearch] = useState('');
  const [stateParams, setStateParams] = useState(params);
  //Dialog
  const { Dialog, openDialog, closeDialog } = useDialog();

  const handleChangeSearch = (e: any) => {
    const { value } = e.target
    setSearch(value);
    debouncedChangeHandler(value);
  };

  // eslint-disable-next-line
  const debouncedChangeHandler = useCallback(
    debounce((value: string) => {
      setStateParams({
        ...stateParams,
        search: value
      })
    }, 1000)
  , []);

  useEffect(() => {
    dispatch(fetchUsers({ ...stateParams, role }));
    // eslint-disable-next-line
  }, [stateParams])

  useEffect(() => {
    return () => {
      dispatch(usersActions.setInitialField('params'));
    }
    // eslint-disable-next-line
  }, [])

  return (
    <React.Fragment>
      <Dialog>
        <UsersForm onClose={closeDialog} role={role} />
      </Dialog>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography variant='h5'>
          {`${capitalizeFirstLetter(role)}s`}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2}}>
          <TextField
            size="small"
            label="Search"
            placeholder="Search by name"
            value={search}
            onChange={handleChangeSearch}
          />
          <Button sx={{ height: '40px' }} variant="contained" onClick={openDialog}>
            {`Create ${role}`}
          </Button>
        </Box>
        
      </Box>
    </React.Fragment>
  )
}

export default UsersHeader;
