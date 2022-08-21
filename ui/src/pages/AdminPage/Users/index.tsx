import React, { useEffect, useState } from 'react';
// Types
import UserRoles from 'types/UserRoles';
// Components
import UsersHeader from './UsersHeader';
import UsersList from './UsersList';
interface Props {
  role: UserRoles;
}

const UsersPage: React.FC<Props> = ({ role }) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    setLoaded(true);
  }, [])

  if (!loaded) return null;

  return (
    <React.Fragment>
      <UsersHeader role={role} />
      <UsersList />
    </React.Fragment>
  );
};

export default UsersPage;
