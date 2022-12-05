import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IHotel from '../../models/Hotel';
import { createHotel, deleteHotel, fetchCurrentUserHotels, fetchHotel, fetchHotels, fetchTopHotels, updateHotel } from './hotelsAsync';

interface IState {
  hotels: IHotel[] | null;
  myHotels: IHotel[] | null;
  hotel: IHotel | null;
  total: number;
  myHotelsTotal: number;
  params: any;
}

const initialState: IState = {
  hotels: null,
  myHotels: null,
  hotel: null,
  total: 0,
  myHotelsTotal: 0,
  params: {
    limit: 15,
    page: 1,
    hotelType: [],
    search: '',
  }
};

const hotelsSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    setInitialField: (state, action: PayloadAction<keyof IState>) => {
      state[action.payload] = initialState[action.payload];
    },
    changeHotelType: (state, action) => {
      state.params.hotelType = state.params.hotelType.includes(action.payload)
        ? state.params.hotelType.filter((type: string) => type !== action.payload)
        : [...state.params.hotelType, action.payload]
    },
    changeSearch: (state, action) => {
      state.params.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    // fetch hotel
    .addCase(fetchHotel.fulfilled, (state, action) => {
      state.hotel = action.payload;
    })
    // fetch hotels
    .addCase(fetchHotels.pending, (state, action) => {
      state.params = action.meta.arg;
    })
    .addCase(fetchHotels.fulfilled, (state, action) => {
      state.hotels = action.payload.data;
      state.total = action.payload.total;
    })
    // fetch top hotels
    .addCase(fetchTopHotels.fulfilled, (state, action) => {
      state.hotels = action.payload.data;
    })
    // fetch curren user hotels
    .addCase(fetchCurrentUserHotels.fulfilled, (state, action) => {
      state.myHotels = action.payload.data;
      state.myHotelsTotal = action.payload.total;
    })
    // create hotel
    .addCase(createHotel.fulfilled, (state, action) => {
      if (state.params.verified === false) {
        state.hotels = state.hotels ? [action.payload, ...state.hotels] : [action.payload];
        state.total = state.total + 1;
      }
    })
    // update hotel
    .addCase(updateHotel.fulfilled, (state, action) => {
      state.hotels = state.hotels
        ? state.hotels.map((hotel: IHotel) => hotel._id !== action.payload._id ? hotel : action.payload)
        : null;
    })
    // delte hotels
    .addCase(deleteHotel.fulfilled, (state, action) => {
      state.hotels = state.hotels
        ? state.hotels.filter(hotel => hotel._id !== action.payload)
        : null;
      state.total = state.total - 1;
    })
  }
});

export const hotelsActions = hotelsSlice.actions;
export default hotelsSlice.reducer;
