import React from 'react';
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
// Selectors
import { selectIsAuthorization } from '../store/auth/authSelectors';

type Props = {
  children: JSX.Element;
}

const PrivateRoute:React.FC<Props> = ({ children }) => {
  const isAuthorization:boolean | null = useSelector(selectIsAuthorization);

  if ( !isAuthorization ) return <Navigate to="/" replace />;

  return children;
}

export default PrivateRoute;
