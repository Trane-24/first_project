import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IHotel from '../../models/Hotel';
import { createHotel, deleteHotel, fetchCurrentUserHotels, fetchHotel, fetchHotels, fetchTopHotels } from './hotelsAsync';

interface IState {
  hotels: IHotel[] | null;
  hotel: IHotel | null;
  total: number;
  params: any;
}

const initialState: IState = {
  hotels: null,
  hotel: null,
  total: 0,
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
    .addCase(fetchTopHotels.fulfilled, (state, action) => {
      state.hotels = action.payload.data;
    })
    // fetch curren user hotels
    .addCase(fetchCurrentUserHotels.pending, (state, action) => {
      state.params = action.meta.arg;
    })
    .addCase(fetchCurrentUserHotels.fulfilled, (state, action) => {
      state.hotels = action.payload.data;
      state.total = action.payload.total;
    })
    // create hotel
    .addCase(createHotel.fulfilled, (state, action) => {
      state.hotels = state.hotels ? [action.payload, ...state.hotels] : [action.payload];
      state.total = state.total + 1;
    })
    // delte hotel
    .addCase(deleteHotel.fulfilled, (state, action) => {
      state.hotels = state.hotels
        ? state.hotels.filter(hotel => hotel._id !== action.payload)
        : null;
    })
  }
});

export const hotelsActions = hotelsSlice.actions;
export default hotelsSlice.reducer;
