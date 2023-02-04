import { RootState } from "..";

export const selectSelectedDate = (state: RootState) => state.calendar.selectedDate;
export const selectParams = (state: RootState) => state.calendar.params;
export const selectSelectedDay = (state: RootState) => state.calendar.selectedDay;
