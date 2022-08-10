import React, { useEffect, useState } from 'react';
// hooks
import { useAppDispatch } from '../../../hooks/useAppDispatch';
// Types
import UserRoles from '../../../types/UserRoles';
// Async
import { fetchUsers } from '../../../store/users/usersAsync';
// Components
import UsersHeader from './UsersHeader';
import UsersList from './UsersList';
// Mui
import { LinearProgress } from '@mui/material';

interface Props {
  role: UserRoles;
}

const UsersPage: React.FC<Props> = ({ role }) => {
  //dispatch
  const dispatch = useAppDispatch();
  // state
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchUsers({role}))
      .unwrap()
      .finally(() => setIsLoading(false));

    // eslint-disable-next-line
  }, []);

  if (isLoading) return <LinearProgress />;
  return (
    <React.Fragment>
      <UsersHeader role={role} />
      <UsersList />
    </React.Fragment>
  );
};

export default UsersPage;
