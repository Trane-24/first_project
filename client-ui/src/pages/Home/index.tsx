import SearchBanner from 'components/SearchBanner';
import React from 'react';
import ContactUs from './ContactUs';
import HotelsByTypes from './HotelsByTypes';
import TopHotels from './TopHotels';

const HomePage:React.FC = () => {
  return (
    <section>
      <SearchBanner />
      <TopHotels />
      <HotelsByTypes />
      <ContactUs />
    </section>
  );
}

export default HomePage;
