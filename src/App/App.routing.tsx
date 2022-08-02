import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
// selectors
import { selectIsAuthorization } from '../store/auth/authSelectors';
// components
import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';
// pages
import SignInPage from '../pages/signIn';
import SignUpPage from '../pages/signUp';
import AdminPage from '../pages/AdminPage';

const AppRouting: React.FC = () => {
  const isAuthorization = useSelector(selectIsAuthorization);

  const navigateTo = isAuthorization ? '/' : '/sign-in';

  return (
    <Routes>
      <Route path="/sign-in" element={
        <PublicRoute>
          <SignInPage />
        </PublicRoute>
      } />
      <Route path="/sign-up" element={
        <PublicRoute>
          <SignUpPage />
        </PublicRoute>
      } />

      <Route path="/" element={
        <PrivateRoute>
          <AdminPage />
        </PrivateRoute>
      } />

      <Route path="*" element={<Navigate to={navigateTo} />} />
    </Routes>
  )
}

export default AppRouting;
