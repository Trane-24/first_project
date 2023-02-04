import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IReservation from "models/Reservation";
import { createReservation, deleteReservation, fetchReservation, updateReservation } from "./reservationAsync";

interface IState {
  reservations: IReservation[] | null;
  total: number;
  params: any;
  activeReservation: IReservation | null;
  isLoading: boolean;
}

const initialState: IState = {
  reservations: null,
  total: 0,
  params: {
    limit: 20,
    page: 1,
  },
  activeReservation: null,
  isLoading: false,
}

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    setInitialField: (state, action: PayloadAction<keyof IState>) => {
      return {
        ...state,
        [action.payload]: initialState[action.payload],
      }
    },
    changeReservation: (state, action: PayloadAction<IReservation | null>) => {
      state.activeReservation = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
    // fetch reservation
    .addCase(fetchReservation.pending, (state, action) => {
      state.params = action.meta.arg;
      state.isLoading = true;
    })
    .addCase(fetchReservation.fulfilled, (state, action) => {
      state.reservations = action.payload.data;
      state.total = action.payload.total;
      state.isLoading = false;
    })
    // delete reservation
    .addCase(deleteReservation.fulfilled, (state, action) => {
      state.reservations = state.reservations
        ? state.reservations.filter((res: IReservation) => res._id !== action.payload)
        : null;
      state.total = state.total - 1;
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