import React  from "react";
import ReservationHeader from "./ReservationsHeader";
import ReservationList from "./ReservationsList";
// Components

const ReservationsPage: React.FC = () => {
  return (
    <React.Fragment>
      <ReservationHeader />
      <ReservationList />
    </React.Fragment>
  )
};

export default ReservationsPage;
