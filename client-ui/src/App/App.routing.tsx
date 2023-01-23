import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// Pages
import HomePage from 'pages/Home';
import ListYourProperty from '../pages/ListYourProperty';
import ProfilePage from 'pages/ProfilePage';
import PublicRoute from 'components/PublicRoute';
import PrivateRoute from 'components/PrivateRoute';
import HotelsPage from 'pages/HotelsPage';
import AboutPage from 'pages/AboutPage';
import HotelInfo from 'pages/HotelsPage/HotelInfo';
<<<<<<< HEAD
=======
import MyHotelsPage from 'pages/MyHotelsPage';
import Reservations from 'pages/GuestPages/Reservations';
import ContactUs from 'pages/ContactUs';
>>>>>>> 474d7eafdaa64ab7a428c77c19c7e61ce5f44261
import HelpdeskPage from 'pages/Helpdesk';

const AppRouting:React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact-us" element={<ContactUs />} />

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

<<<<<<< HEAD
      <Route path="/helpdesk" element={
        <PrivateRoute>
          <HelpdeskPage />
        </PrivateRoute>
      } />

      <Route path='/hotels' element={<HotelsPage />} />
      <Route path='/hotels/:hotelId' element={<HotelInfo />} />
=======
      <Route path="/reservations" element={
          <PrivateRoute>
            <Reservations />
          </PrivateRoute>
      } />

      <Route path="/my-hotels" element={
          <PrivateRoute>
            <MyHotelsPage />
          </PrivateRoute>
      } />

      
      <Route path="/helpdesk" element={
          <PrivateRoute>
            <HelpdeskPage />
          </PrivateRoute>
      } />

      <Route path="/hotels" element={<HotelsPage />} />
      <Route path="/hotels/:hotelId" element={<HotelInfo />} />
>>>>>>> 474d7eafdaa64ab7a428c77c19c7e61ce5f44261

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRouting;
