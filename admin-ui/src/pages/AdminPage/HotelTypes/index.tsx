import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectHotelsTypes } from 'store/hotelTypes/hotelTypesSelectors';
import HotelTypesHeader from './HotelTypesHeader';
import HotelTypesList from './HotelTypesList';

const HotelTypes: React.FC = () => {
  const hotelTypes = useSelector(selectHotelsTypes);
  console.log(hotelTypes);

  return (
    <React.Fragment>
      <HotelTypesHeader />
      <HotelTypesList />
    </React.Fragment>
  );
};

export default HotelTypes;
