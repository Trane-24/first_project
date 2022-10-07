import React, { useEffect, useState }  from "react";
// Components
import HotelHeader from "./HotelHeader";
import HotelList from "./HotelList";

const HotelsPage: React.FC = () => {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    setLoaded(true);
  }, [])

  if (!loaded) return null;
  return (
    <React.Fragment>
      <HotelHeader />
      <HotelList />
    </React.Fragment>
  )
};

export default HotelsPage;
