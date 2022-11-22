import React, { useEffect, useState } from "react";
// Components
import MyHotelsHeader from "./MyHotelsHeader";
import MyHotelsList from "./MyHotelsList";

const MyHotelsPage: React.FC = () => {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    setLoaded(true);
  }, [])

  if (!loaded) return null;

  return (
    <section className="container">
      <MyHotelsHeader />
      <MyHotelsList />
    </section>
  );
};

export default MyHotelsPage;
