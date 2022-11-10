import SearchBanner from 'components/SearchBanner';
import React from 'react';
import TopHotels from './TopHotels';

const HomePage:React.FC = () => {
  return (
    <section>
      <SearchBanner />
      <TopHotels />
    </section>
  );
}

export default HomePage;
