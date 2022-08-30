import { createSlice } from "@reduxjs/toolkit";
import IReservation from "models/Reservation";
import { createReservation, deleteReservation, fetchReservation, updateReservation } from "./reservationAsunc";

interface IState {
  reservations: IReservation[] | null,
  total: number;
  params: any;
}

const initialState: IState = {
  reservations: null,
  total: 0,
  params: {
    limit: 20,
    page: 1,
  }
}

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
    // fetch reservation
    .addCase(fetchReservation.fulfilled, (state, action) => {
      state.reservations = action.payload.data;
      state.total = action.payload.total;
    })
    // delete reservation
    .addCase(deleteReservation.fulfilled, (state, action) => {
      state.reservations = state.reservations
        ? state.reservations.filter((res: IReservation) => res._id !== action.payload)
        : null;
    })
    // create reservation
    .addCase(createReservation.fulfilled, (state, action) => {
      state.reservations = state.reservations
        ? [action.payload, ...state.reservations]
        : [action.payload]
    })
    // update reservation
    .addCase(updateReservation.fulfilled, (state, action) => {
      state.reservations = state.reservations
        ? state.reservations.map(reservation => 
          reservation._id === action.payload._id
          ? action.payload : reservation
          )
        : null;
    })
  }
});

export const reservationAction = reservationSlice.actions;
export default reservationSlice.reducer;