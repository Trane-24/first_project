import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchHotelTypes } from './hotelTypesAsync';

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
  }
});

export const hotelTypesActions = hotelTypesSlice.actions;
export default hotelTypesSlice.reducer;
