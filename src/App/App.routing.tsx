import React from 'react';
import { Routes, Route } from 'react-router-dom';
// pages
import SignInPage from '../pages/signIn';
import SignUpPage from '../pages/signUp';

const AppRouting: React.FC = () => {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
    </Routes>
  )
}

export default AppRouting;
