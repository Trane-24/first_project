import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// Hooks
import { useAppDispatch } from "hooks/useAppDispatch";
// Async
import { fetchCurrentUserHotels } from "store/hotels/hotelsAsync";
// Selectors
import { selectHotels } from "store/hotels/hotelsSelectors";
// Mui
import { Box } from "@mui/material";
// Styles
import classes from './styles.module.scss';
import Title from "components/Title";
import MyHotelsHeader from "./MyHotelsHeader";
import MyHotelsList from "./MyHotelsList";

const MyHotelsPage: React.FC = () => {
  // const dispatch = useAppDispatch();
  // State
  const [loaded, setLoaded] = useState<boolean>(false);

  // const hotels = useSelector(selectHotels);
  // console.log(hotels)

  // useEffect(() => {
  //   dispatch(fetchCurrentUserHotels({}));
  // }, [])

  useEffect(() => {
    setLoaded(true);
  }, [])

  if (!loaded) return null;

  return (
    // <section className={classes.myHotelsPage}>
    <section className="container">
      <MyHotelsHeader />
      <MyHotelsList />
    </section>
  );
};

export default MyHotelsPage;
