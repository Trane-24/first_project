import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import UserRoles from '../../types/UserRoles';
// Pages
import UsersPage from './UsersPage';

const AdminRouting:React.FC = () => {
  return (
    <Routes>
      <Route path="owners" element={
        <OwnersWraper>
          <UsersPage role={UserRoles.Owner} />
        </OwnersWraper>
      } />
      
      <Route path="guests" element={
        <GuestsWraper>
          <UsersPage role={UserRoles.Guest} />
        </GuestsWraper>
      } />
      
      <Route path="*" element={<Navigate to="/admin/owners" />} />
    </Routes>
  )
}

export default AdminRouting;

const GuestsWraper: React.FC<any> = ({ children }) => <>{children}</>
const OwnersWraper: React.FC<any> = ({ children }) => <>{children}</>
