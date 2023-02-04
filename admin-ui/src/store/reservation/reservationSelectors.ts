import { createSelector } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import IReservation from "models/Reservation";
import { RootState } from "store";

export const selectReservations = (state: RootState) => state.reservations.reservations;
export const selectTotal = (state: RootState) => state.reservations.total;
export const selectParams = (state: RootState) => state.reservations.params;
export const selectActiveReservation = (state: RootState) => state.reservations.activeReservation;
export const selectIsLoading = (state: RootState) => state.reservations.isLoading;

export const selectReservationByStartDay = createSelector(
  [
    selectReservations,
    (_:any, props: { startDateString: string}) => props
  ],
  (reservations: IReservation[] | null, { startDateString }) => {
    if (!reservations) return null;

    return reservations
      .filter((reservation: IReservation) =>
        dayjs(reservation.startDate).format('YYYY-MM-DD') === startDateString
          && reservation.includeIntoCheckInCalendar === true);
  }
)