import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// Hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
// Async
import { fetchUsers } from 'store/users/usersAsync';
// Models
import IUser from 'models/User';
// Selectors
import { selectParams, selectTotal, selectUsers } from 'store/users/usersSelectors';
// Components
import UserItem from './UserItem';
// MUI
import { Box, LinearProgress, TablePagination } from '@mui/material';
import { makeStyles } from '@mui/styles';

const UsersList:React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  // state
  const users = useSelector(selectUsers);
  const params = useSelector(selectParams);
  const total = useSelector(selectTotal);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [page, setPage] = useState<number>(params.page);
  const [limit, setLimit] = useState<number>(params.limit);

  // When we change params from outside, page don't changed
  useEffect(() => {
    setPage(params.page)
  }, [params.page]);

  const handleChangePage = (_: any, value: any) => {
    setIsLoading(true);
    setPage(value + 1);
    dispatch(fetchUsers({ ...params, page: value + 1 }))
      .unwrap()
      .finally(() => setIsLoading(false))
  };

  const handleChangeLimit = (event:any) => {
    setIsLoading(true);
    const { value } = event.target;
    setLimit(value);
    setPage(1);
    dispatch(fetchUsers({ ...params, limit: value, page: 1 }))
      .unwrap()
      .finally(() => setIsLoading(false))
  }

  if (isLoading) return <LinearProgress />;
  if (!users) return null;

  return (
    <Box className={classes.list}>
      {users.length ? (
        <Box>
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
              page={page - 1}
              onPageChange={handleChangePage}
              rowsPerPage={limit}
              onRowsPerPageChange={handleChangeLimit}
              rowsPerPageOptions={[20, 50, 100]}
              labelRowsPerPage="Items: "
            />
          </Box>
        </Box>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center'}}>
          {params.search ? (
            <p style={{ position: 'absolute'}}>No users found for the specified search keyword</p>
          ) : (
            <p style={{ position: 'absolute'}}>List is empty</p>
          )}
          <img
            className={classes.image}
            src="/images/list_is_empty.jpg"
            alt="reservation_is_empty"
          />
        </div>
      )}
      
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
  image: {
    // objectFit: 'contain',
    maxHeight: 'calc(100vh - 202px)',
    '@media (min-width: 600px)': {
      maxHeight: 'calc(100vh - 222px)',
    },
  }
})
