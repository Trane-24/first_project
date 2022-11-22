import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IReservation from "models/Reservation";
import { createReservation, fetchReservation } from "./reservationsAsync";

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
    setInitialField: (state, action: PayloadAction<keyof IState>) => {
      state[action.payload] = initialState[action.payload]
    }
  },
  extraReducers: (builder) => {
    builder
    // fetch current user reservations
    .addCase(fetchReservation.pending, (state, action) => {
      state.params = action.meta.arg;
    })
    .addCase(fetchReservation.fulfilled, (state, action) => {
      state.reservations = action.payload.data;
      state.total = action.payload.total;
    })
    // create reservation
    .addCase(createReservation.fulfilled, (state, action) => {
      if (!state.params.status || state.params.status === action.payload.status) {
        state.reservations = state.reservations
          ? [action.payload, ...state.reservations]
          : [action.payload];
          state.total = state.total + 1
      }
    })
  }
});

export const reservationAction = reservationSlice.actions;
export default reservationSlice.reducer;