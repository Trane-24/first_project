import SearchBanner from 'components/SearchBanner';
import React from 'react';
import HotelsByTypes from './HotelsByTypes';
import TopHotels from './TopHotels';

const HomePage:React.FC = () => {
  return (
    <section>
      <SearchBanner />
      <TopHotels />
      <HotelsByTypes />
    </section>
  );
}

export default HomePage;
