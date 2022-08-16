import { createSlice } from '@reduxjs/toolkit';
import IHotel from '../../models/Hotel';
import { createHotel, deleteHotel, fetchHotels, updateHote } from './hotelsAsync';

interface IState {
  hotels: IHotel[] | null;
  total: number;
}

const initialState: IState = {
  hotels: null,
  total: 0,
};

const hotelsSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
    // fetch hotels
    .addCase(fetchHotels.fulfilled, (state, action) => {
      state.hotels = action.payload.data;
      state.total = action.payload.total;
    })
    // create hotel
    .addCase(createHotel.fulfilled, (state, action) => {
      state.hotels = state.hotels ? [action.payload, ...state.hotels] : [action.payload]
    })
    // delete hotel
    .addCase(deleteHotel.fulfilled, (state, action) => {
      state.hotels = state.hotels
        ? state.hotels.filter(hotel => hotel._id !== action.payload)
        : null;
    })
    // update hotel
    .addCase(updateHote.fulfilled, (state, action) => {
      state.hotels = state.hotels
        ? state.hotels.map(hotel => hotel._id === action.payload._id ? action.payload : hotel)
        : null
    })
  }
});

export const hotelsActions = hotelsSlice.actions;
export default hotelsSlice.reducer;
