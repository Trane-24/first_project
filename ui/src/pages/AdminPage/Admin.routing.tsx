import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import UserRoles from '../../types/UserRoles';
// Pages
import UsersPage from './Users';

const AdminRouting:React.FC = () => {
  return (
    <Routes>
      <Route path="agents" element={
        <AgentsWrapper>
          <UsersPage role={UserRoles.Admin} />
        </AgentsWrapper>
      } />

      <Route path="owners" element={
        <OwnersWrapper>
          <UsersPage role={UserRoles.Owner} />
        </OwnersWrapper>
      } />
      
      <Route path="guests" element={
        <GuestsWrapper>
          <UsersPage role={UserRoles.Guest} />
        </GuestsWrapper>
      } />
      
      <Route path="*" element={<Navigate to="/admin/agents" />} />
    </Routes>
  )
}

export default AdminRouting;

const GuestsWrapper: React.FC<any> = ({ children }) => <React.Fragment>{children}</React.Fragment>;
const OwnersWrapper: React.FC<any> = ({ children }) => <React.Fragment>{children}</React.Fragment>;
const AgentsWrapper: React.FC<any> = ({ children }) => <React.Fragment>{children}</React.Fragment>;
