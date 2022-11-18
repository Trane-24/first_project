import React from 'react';
// Components
import SearchBanner from 'components/SearchBanner';
import ContactUs from './ContactUs';
import HotelsByTypes from './HotelsByTypes';
import TopHotels from './TopHotels';
import WhyHotels from './WhyHotels';

const HomePage:React.FC = () => {
  return (
    <section>
      <SearchBanner />
      <TopHotels />
      <HotelsByTypes />
      <ContactUs />
      <WhyHotels />
    </section>
  );
}

export default HomePage;
