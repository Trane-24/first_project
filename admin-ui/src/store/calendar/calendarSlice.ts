import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs, { Dayjs } from "dayjs";

interface State {
  selectedDate: Dayjs;
  params: {
    start: string | null;
    end: string | null;
  },
  selectedDay: string;
}

const selectedDate:Dayjs = dayjs();

const initialState:State = {
  selectedDate: selectedDate.startOf('month'),
  params: {
    start: selectedDate.startOf('month').format('YYYY-MM-DD'),
    end: selectedDate.endOf('month').format('YYYY-MM-DD'),
  },
  selectedDay: '',
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
      state.params = {
        ...state.params,
        start: dayjs(action.payload).format('YYYY-MM-DD'),
        end: dayjs(action.payload).endOf('month').format('YYYY-MM-DD')
      }
    },
    setSelectedDay: (state, action) => {
      state.selectedDay = action.payload;
    },
    setInitialField: <StateKey extends keyof State>(state: State, action: PayloadAction<StateKey>) => {
      state[action.payload] = initialState[action.payload];
    },
  },
});

export const CalendarActions = calendarSlice.actions;

export default calendarSlice.reducer;
