import { Box } from "@mui/material";
import Title from "components/Title";
import React, { useEffect, useState } from "react";
import ReservationsList from "./ReservationsList";
// Components

const Reservations: React.FC = () => {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    setLoaded(true);
  }, [])

  if (!loaded) return null;

  return (
    <section className="container">
      <Box sx={{padding: '20px 0 5px'}}>
        <Title>Reservations</Title>
      </Box>

      <ReservationsList />
    </section>
  );
};

export default Reservations;
