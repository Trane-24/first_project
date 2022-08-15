import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// Hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
// Async
import { fetchUsers } from 'store/users/usersAsync';
// Models
import IUser from 'models/User';
// Types
import UserRoles from 'types/UserRoles';
// Selectors
import { selectParams, selectTotal, selectUsers } from 'store/users/usersSelectors';
// Components
import UserItem from './UserItem';
// MUI
import { Box, LinearProgress, Pagination, TablePagination } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { usersActions } from 'store/users/usersSlice';

type Props = {
  role: UserRoles,
}

const UsersList:React.FC<Props> = ({ role }) => {
  const classes = useStyles();
  //dispatch
  const dispatch = useAppDispatch();

  const users = useSelector(selectUsers);
  const params = useSelector(selectParams);
  const total = useSelector(selectTotal);

  // state
  const [isLoading, setIsLoading] = useState(false);
  const [stateParams, setStateParams] = useState(params);

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
    <React.Fragment>
      <Box className={classes.list}>
        {users.map((user: IUser) => (
          <UserItem key={user._id} user={user} />
        ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <TablePagination
          component="div"
          count={total}
          page={stateParams.page - 1}
          onPageChange={handleChangePage}
          rowsPerPage={stateParams.limit}
          onRowsPerPageChange={handleChangeLimit}
          rowsPerPageOptions={[20, 50, 100]}
        />
      </Box>
    </React.Fragment>
  )
}

export default UsersList;

const useStyles = makeStyles({
  list: {
    padding: '0 5px',
    boxShadow: '0 0 10px 1px rgba(0,0,0,0.2)',
    borderRadius: '8px',
    marginTop: '40px',
    maxHeight: 'calc(100vh - 224px)',
    overflowY: 'scroll'
  }
})
