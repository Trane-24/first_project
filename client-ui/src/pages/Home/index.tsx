import React from 'react';
// Components
import SearchBanner from 'components/SearchBanner';
import HotelsByTypes from './HotelsByTypes';
import TopHotels from './TopHotels';
import WhyHotels from './WhyHotels';
import SendMessage from './SendMessage';

const HomePage:React.FC = () => {
  return (
    <section>
      <SearchBanner />
      <TopHotels />
      <HotelsByTypes />
      <SendMessage />
      <WhyHotels />
    </section>
  );
}

export default HomePage;
