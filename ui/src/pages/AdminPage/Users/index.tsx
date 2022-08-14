import React from 'react';
// Types
import UserRoles from 'types/UserRoles';
// Components
import UsersHeader from './UsersHeader';
import UsersList from './UsersList';
interface Props {
  role: UserRoles;
}

const UsersPage: React.FC<Props> = ({ role }) => {
  return (
    <React.Fragment>
      <UsersHeader role={role} />
      <UsersList role={role} />
    </React.Fragment>
  );
};

export default UsersPage;
