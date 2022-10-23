import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// Pages
import HomePage from 'pages/Home';
import ListYourProperty from '../pages/ListYourProperty';
import ProfilePage from 'components/ProfilePage';
import PublicRoute from 'components/PublicRoute';
import PrivateRoute from 'components/PrivateRoute';

const AppRouting:React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<></>} />
      <Route path="/contact-us" element={<></>} />

      <Route path="/list-your-property" element={
        <PublicRoute>
          <ListYourProperty />
        </PublicRoute>
      } />

      <Route path="/my-profile" element={
        <PrivateRoute>
          <ProfilePage />
        </PrivateRoute>
      } />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRouting;
