import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IMessage from "models/Message";
import { fetchMessages, sendMessasges } from "./helpdeskAsync";

interface IState {
  messages: IMessage[] | null;
  total: number;
  params: {
    page: number;
    limit: number;
  }
}

const initialState: IState = {
  messages: null,
  total: 0,
  params: {
    page: 1,
    limit: 20,
  }
};

const helpdeskSlice = createSlice({
  name: 'helpdesk',
  initialState,
  reducers: {
    setInitialField: (state, action: PayloadAction<keyof IState>) => {
      return {
        ...state,
        [action.payload]: initialState[action.payload]
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state, actions) => {
        state.params = actions.meta.arg;
      })
      .addCase(fetchMessages.fulfilled, (state, actions) => {
        state.messages = state.messages
          ? [...actions.payload.data.reverse(), ...state.messages]
          : actions.payload.data.reverse();
        state.total = actions.payload.total;
      })
      .addCase(sendMessasges.fulfilled, (state, actions) => {
        state.messages = state.messages && state.messages.length < state.total
          ? [...state.messages.slice(1), actions.payload]
          : state.messages && state.messages.length === state.total
            ? [...state.messages, actions.payload]
            : [actions.payload];
        state.total = state.total + 1;
      })
  }
})

export const helpdeskActions = helpdeskSlice.actions;
export default helpdeskSlice.reducer;

