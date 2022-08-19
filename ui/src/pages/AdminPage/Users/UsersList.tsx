import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// Hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
// Async
import { fetchUsers } from 'store/users/usersAsync';
// Actions
import { usersActions } from 'store/users/usersSlice';
// Models
import IUser from 'models/User';
// Types
import UserRoles from 'types/UserRoles';
// Selectors
import { selectParams, selectTotal, selectUsers } from 'store/users/usersSelectors';
// Components
import UserItem from './UserItem';
// MUI
import { Box, LinearProgress, TablePagination } from '@mui/material';
import { makeStyles } from '@mui/styles';

type Props = {
  role: UserRoles,
}

const UsersList:React.FC<Props> = ({ role }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  // state
  const users = useSelector(selectUsers);
  const params = useSelector(selectParams);
  const total = useSelector(selectTotal);
  
  const [isLoading, setIsLoading] = useState(false);
  const [stateParams, setStateParams] = useState(params);

  console.log(stateParams);

  const handleChangePage = (_: any, value: any) => {
    setStateParams({
      ...stateParams,
      page: value + 1,
    })
  };

  const handleChangeLimit = (event:any) => {
    const { value } = event.target;
    setStateParams({
      ...stateParams,
      limit: value,
      page: 1,
    })
  }

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchUsers({ ...stateParams, role}))
      .unwrap()
      .finally(() => setIsLoading(false))

    // eslint-disable-next-line
  }, [stateParams])

  useEffect(() => {
    return () => {
      dispatch(usersActions.setInitialField('params'));
    }
    // eslint-disable-next-line
  }, [])

  if (isLoading) return <LinearProgress />;
  if (!users) return null;

  return (
    <Box className={classes.list}>
      <Box className={classes.items}>
        {users.map((user: IUser) => (
          <UserItem key={user._id} user={user} />
        ))}
      </Box>
      <Box>
        <TablePagination
          className={classes.pagination}
          component="div"
          count={total}
          page={stateParams.page - 1}
          onPageChange={handleChangePage}
          rowsPerPage={stateParams.limit}
          onRowsPerPageChange={handleChangeLimit}
          rowsPerPageOptions={[20, 50, 100]}
        />
      </Box>
    </Box>
  )
}

export default UsersList;

const useStyles = makeStyles({
  list: {
    marginTop: '20px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0px 0px 0px 1px #E0E0E0',
    overflow: 'hidden',
  },
  items: {
    maxHeight: 'calc(100vh - 196px)',
    overflowY: 'scroll',
    '@media (min-width: 600px)': {
      maxHeight: 'calc(100vh - 216px)',
    },
  },
  pagination: {
    boxShadow: '0px -3px 6px -1px rgb(0 0 0 / 8%)',
  },
})
