import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// hooks
import useDialog from 'hooks/useDialog';
import { useAppDispatch } from 'hooks/useAppDispatch';
// Store
import { usersActions } from 'store/users/usersSlice';
import { selectParams, selectUsers } from 'store/users/usersSelectors';
// Async
import { fetchUsers } from 'store/users/usersAsync';
// Types
import UserRoles from 'types/UserRoles';
// Components
import UsersForm from './UsersForm';
// MUI
import { Box, Button, TextField, Typography, debounce, Grid } from '@mui/material';
// utilites
import { capitalizeFirstLetter } from 'utilites/stringFormatter';
import { makeStyles } from '@mui/styles';

type Props = {
  role: UserRoles
}

const UsersHeader:React.FC<Props> = ({ role }) => {
  // dispatch
  const dispatch = useAppDispatch();
  // Selectors
  const params = useSelector(selectParams);
  const users = useSelector(selectUsers);
  // State
  const [search, setSearch] = useState('');
  const [stateParams, setStateParams] = useState(params);
  //Dialog
  const { Dialog, openDialog, closeDialog } = useDialog();

  const classes = useStyle();

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

  const inputIsVisible = Boolean(users?.length || params.search);

  return (
    <React.Fragment>
      <Dialog>
        <UsersForm onClose={closeDialog} role={role} />
      </Dialog>

      <Box className={classes.header}>
        <Typography className={classes.title} variant='h5' sx={{ pr: 1}}>
          {`${capitalizeFirstLetter(role)}s`}
        </Typography>

        <Box className={classes.headeContent}>
          {inputIsVisible && (
            <TextField
              size="small"
              label="Search"
              placeholder="Search by name"
              value={search}
              onChange={handleChangeSearch}
            />
          )}

          <Button sx={{ height: '40px'}} variant="contained" onClick={openDialog}>
            {`Create ${role}`}
          </Button>
        </Box>

      </Box>

    </React.Fragment>
  )
}

export default UsersHeader;

const useStyle = makeStyles({
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    wrap: 'flex-wrap',
    '@media (min-width: 600px)': {
      flexDirection: 'row',
    }
  },
  title: {
    alignSelf: 'flex-start',
    marginBottom: '10px',
    '@media (min-width: 600px)': {
      alignSelf: 'center',
      marginBottom: '0',
    }
  },
  headeContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '8px',
    '@media (min-width: 600px)': {
      flexDirection: 'row',
      width: 'max-content',
    }
  }
});
