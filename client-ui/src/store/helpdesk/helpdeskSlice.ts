import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IMessage from "models/Message";
import { fetchMessages } from "./helpdeskAsync";

interface IState {
  messages: IMessage[] | null;
  total: number;
  params: {
    page: number;
    limit: number;
  },
}

const initialState: IState = {
  messages: null,
  total: 0,
  params: {
    page: 1,
    limit: 50,
  },
};

const helpdeskSlice = createSlice({
  name: 'helpdesk',
  initialState,
  reducers: {
    connect: (state:IState) => {},
    disconnect: (state:IState) => {},
    sendMessage: (state, action) => {},
    addMessage: (state, action) => {
      console.log('addMessage', action.payload)
      state.messages = state.messages && state.messages.length < state.total
      ? [...state.messages.slice(1), action.payload]
      : state.messages && state.messages.length === state.total
        ? [...state.messages, action.payload]
        : [action.payload];
      state.total = state.total + 1;
    },
    setInitialField: (state, action: PayloadAction<keyof IState>) => {
      return {
        ...state,
        [action.payload]: initialState[action.payload]
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state, action) => {
        state.params = action.meta.arg;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = state.messages
          ? [...action.payload.data.reverse(), ...state.messages]
          : action.payload.data.reverse();
        state.total = action.payload.total;
      })
  }
})

export const helpdeskActions = helpdeskSlice.actions;
export default helpdeskSlice.reducer;

