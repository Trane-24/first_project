import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// Pages
import HomePage from 'pages/Home';
import ListYourProperty from 'pages/ListYourProperty';

const AppRouting:React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<></>} />
      <Route path="/contact-us" element={<></>} />
      <Route path="/list-your-property" element={<ListYourProperty />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRouting;
