import { RootState } from "store";

export const selectReservations = (state: RootState) => state.reservations.reservations;
export const selectTotal = (state: RootState) => state.reservations.total;
export const selectParams = (state: RootState) => state.reservations.params;
