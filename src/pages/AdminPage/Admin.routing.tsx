import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
// Pages
import UsersPage from './UsersPage';

const AdminRouting:React.FC = () => {
  return (
    <Routes>
      <Route path="owners" element={<UsersPage />} />
      
      <Route path="*" element={<Navigate to="/admin/owners" />} />
    </Routes>
  )
}

export default AdminRouting;
