import { RootState } from "store";

export const selectHotels = (state: RootState) => state.hotels.hotels;