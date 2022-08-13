import React from 'react';
import { useSelector } from 'react-redux';
// Models
import IUser from 'models/User';
// Selectors
import { selectUsers } from 'store/users/usersSelectors';
// Components
import UserItem from './UserItem';
// MUI
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const UsersList:React.FC = () => {
  const classes = useStyles();
  const users = useSelector(selectUsers);

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
