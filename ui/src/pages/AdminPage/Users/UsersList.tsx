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
import { selectUsers } from 'store/users/usersSelectors';
// Components
import UserItem from './UserItem';
// MUI
import { Box, LinearProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';

type Props = {
  role: UserRoles,
}

const UsersList:React.FC<Props> = ({ role }) => {
  const classes = useStyles();
  //dispatch
  const dispatch = useAppDispatch();
  // state
  const [isLoading, setIsLoading] = useState(false);
  const users = useSelector(selectUsers);
  
  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchUsers({role}))
      .unwrap()
      .finally(() => setIsLoading(false));

    // eslint-disable-next-line
  }, []);

  if (isLoading) return <LinearProgress />;
  if (!users) return null;

  return (
    <Box className={classes.list}>
      {users.map((user: IUser) => {
        return <UserItem key={user._id} user={user} />
      })}
    </Box>
  )
}

export default UsersList;

const useStyles = makeStyles({
  list: {
    padding: '0 5px',
    boxShadow: '0 0 10px 1px rgba(0,0,0,0.2)',
    borderRadius: '8px',
    marginTop: '40px',
    maxHeight: 'calc(100vh - 170px)',
    overflowY: 'scroll'
  }
})
