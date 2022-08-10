import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import IUser from '../../../models/User';
import { selectUsers } from '../../../store/users/usersSelectors';
import UserItem from './UserItem';

const UsersList:React.FC = () => {
  const users = useSelector(selectUsers);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '10px', pt: 5}}>
      {users.map((user: IUser) => (
        <UserItem key={user._id} user={user} />
      ))}
    </Box>
  )
}

export default UsersList;
