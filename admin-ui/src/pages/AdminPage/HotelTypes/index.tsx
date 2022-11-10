import React from 'react';
// 
import HotelTypesHeader from './HotelTypesHeader';
import HotelTypesList from './HotelTypesList';

const HotelTypes: React.FC = () => {
  return (
    <React.Fragment>
      <HotelTypesHeader />
      <HotelTypesList />
    </React.Fragment>
  );
};

export default HotelTypes;
