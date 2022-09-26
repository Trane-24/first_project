import React, { useEffect, useState }  from "react";
import ReservationHeader from "./ReservationsHeader";
import ReservationList from "./ReservationsList";
// Components

const ReservationsPage: React.FC = () => {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if(!loaded) return null;

  return (
    <React.Fragment>
      <ReservationHeader />
      <ReservationList />
    </React.Fragment>
  )
};

export default ReservationsPage;
