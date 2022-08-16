import React  from "react";
// Components
import HotelHeader from "./HotelHeader";
import HotelList from "./HotelList";

const HotelsPage: React.FC = () => {
  return (
    <React.Fragment>
      <HotelHeader />
      <HotelList />
    </React.Fragment>
  )
};

export default HotelsPage;
