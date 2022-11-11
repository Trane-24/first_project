import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IHotelType from 'models/HotelType';
import { createHotelType, deleteHotelType, fetchHotelTypes, updateHotelType } from './hotelTypesAsync';

interface IState {
  hotelTypes: any;
}

const initialState: IState = {
  hotelTypes: null,
};

const hotelTypesSlice = createSlice({
  name: 'hotelTypes',
  initialState,
  reducers: {
    setInitialField: (state, action: PayloadAction<keyof IState>) => {
      state[action.payload] = initialState[action.payload];
    }
  },
  extraReducers: (builder) => {
    builder
    // fetch hotels types
    .addCase(fetchHotelTypes.fulfilled, (state, action) => {
      state.hotelTypes = action.payload;
    })
    // create hotel types
    .addCase(createHotelType.fulfilled, (state, action) => {
      state.hotelTypes = state.hotelTypes ? [action.payload, ...state.hotelTypes] : [action.payload];
    })
    // delete hotel types
    .addCase(deleteHotelType.fulfilled, (state, action) => {
      state.hotelTypes = state.hotelTypes
        ? state.hotelTypes.filter((hotelType: IHotelType) => hotelType._id !== action.payload)
        : null;
    })
    // update hotel types
    .addCase(updateHotelType.fulfilled, (state, action) => {
      state.hotelTypes = state.hotelTypes
        ? state.hotelTypes.map((hotelType: IHotelType) => hotelType._id === action.payload._id ? action.payload : hotelType)
        : null
    })
  }
});

export const hotelActions = hotelTypesSlice.actions;
export default hotelTypesSlice.reducer;
