import { RootState } from "store";

export const selectHotels = (state: RootState) => state.hotels.hotels;
export const selectTotal = (state: RootState) => state.hotels.total;
export const selectParams = (state: RootState) => state.hotels.params;
