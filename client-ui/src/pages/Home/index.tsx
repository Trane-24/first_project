import React, { useEffect } from 'react';
// Components
import SearchBanner from 'components/SearchBanner';
import HotelsByTypes from './HotelsByTypes';
import TopHotels from './TopHotels';
import WhyHotels from './WhyHotels';
import SendMessage from './SendMessage';
// utilites
import { toTop } from 'utilites/utilites';

const HomePage:React.FC = () => {

  useEffect(() => {
    toTop();
  }, []);

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
