import { RootState } from "store";

export const selectHotelsTypes = (state: RootState) => state.hotelTypes.hotelTypes;
