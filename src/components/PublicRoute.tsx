import React from 'react';
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
// Selectors
import { selectIsAuthorization } from '../store/auth/authSelectors';

type Props = {
  children: JSX.Element;
}

const PublicRoute:React.FC<Props> = ({ children }) => {
  const isAuthorization:boolean = useSelector(selectIsAuthorization);

  if ( isAuthorization ) return <Navigate to="/admin" replace />;

  return children;
};

export default PublicRoute;
