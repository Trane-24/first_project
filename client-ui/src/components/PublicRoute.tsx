import React from 'react';
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
// Selectors
import { selectIsAuthorization } from '../store/auth/authSelectors';
import { selectCurrentUser } from 'store/users/usersSelectors';
import IUser from 'models/User';
import UserRoles from 'types/UserRoles';

type Props = {
  children: JSX.Element;
}

const PublicRoute:React.FC<Props> = ({ children }) => {
  const isAuthorization:boolean | null = useSelector(selectIsAuthorization);
  const currentUser: IUser | null = useSelector(selectCurrentUser);

  const navigateTo = currentUser?.role === UserRoles.Guest ? '/my-hotels' : 'reservation';

  if ( isAuthorization ) return <Navigate to={navigateTo} replace />;

  return children;
};

export default PublicRoute;
