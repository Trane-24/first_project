import React from 'react';
//Components
import Banner from 'components/SearchBanner';
import HotelsFilter from './HotelsFilter';
import HotelsList from './HotelsList';
// MUI
import { Box } from '@mui/material';
// Styles
import classes from './styles.module.scss';

const HotelsPage: React.FC = () => {
  return (
    <section className={classes.hotelsPage}>
      <Banner />
      <Box className={[classes.wrapperList, 'container'].join(' ')}>
        <Box className={classes.wrapperForm}>
          <HotelsFilter />
        </Box>

        <HotelsList />
      </Box>
    </section>
  );
};

export default HotelsPage;
