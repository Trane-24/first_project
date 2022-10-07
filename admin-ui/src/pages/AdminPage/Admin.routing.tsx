import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import UserRoles from '../../types/UserRoles';
// Pages
import UsersPage from './Users';
import ProfilePage from './ProfilePage';
import HotelsPage from './Hotels';
import ReservationPage from './Reservations';
import UserReservations from './Users/UserReservations';
import UserHotels from './Users/UserHotels';

const AdminRouting:React.FC = () => {
  return (
    <Routes>
      <Route path="agents" element={
        <AgentsWrapper>
          <UsersPage role={UserRoles.Admin} />
        </AgentsWrapper>
      } />

      {/* <Route path="owners" element={
        <OwnersWrapper>
          <UsersPage role={UserRoles.Owner} />
        </OwnersWrapper>
      } /> */}
      <Route path="owners">
        <Route index element={
          <OwnersWrapper>
            <UsersPage role={UserRoles.Owner} />
          </OwnersWrapper>
        } />
        <Route path={':ownerId/hotels'} element={<UserHotels />}/>
      </Route>

      
      <Route path="guests">
        <Route index element={
          <GuestsWrapper>
            <UsersPage role={UserRoles.Guest} />
          </GuestsWrapper>
        } />
        <Route path={':guestId/reservations'} element={<UserReservations />}/>
      </Route>

      <Route path='reservations' element={<ReservationPage />}/>

      <Route path="hotels" element={<HotelsPage />} />

      <Route path="my-profile" element={<ProfilePage />} />

      <Route path="*" element={<Navigate to="/admin/agents" />} />
    </Routes>
  )
}

export default AdminRouting;

const GuestsWrapper: React.FC<any> = ({ children }) => <React.Fragment>{children}</React.Fragment>;
const OwnersWrapper: React.FC<any> = ({ children }) => <React.Fragment>{children}</React.Fragment>;
const AgentsWrapper: React.FC<any> = ({ children }) => <React.Fragment>{children}</React.Fragment>;
