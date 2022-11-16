import { RootState } from "store";

export const selectHotelTypes = (state: RootState) => state.hotelTypes.hotelTypes;
