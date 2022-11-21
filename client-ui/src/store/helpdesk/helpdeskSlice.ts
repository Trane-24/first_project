import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IMessage from 'models/Message';
import HelpdeskAsync from './helpdeskAsync';

interface IState {
  messages: IMessage[] | null;
  total: number;
  params: any;
  connected: boolean;
}

const initialState: IState = {
  messages: null,
  total: 0,
  params: {
    limit: 50,
    page: 1,
  },
  connected: false,
};

const helpdeskSlice = createSlice({
  name: 'helpdesk',
  initialState,
  reducers: {
    setInitialField: <IStateKey extends keyof IState>(state: IState, action: PayloadAction<IStateKey>) => {
      state[action.payload] = initialState[action.payload];
    },
    addMessage: (state, action) => {
      state.messages = state.messages ? [...state.messages, action.payload] : [action.payload];
    },
    connect: (state) => {
      state.connected = true;
    },
    disconnect: (state) => {
      state.connected = false;
    },
    sendMessage: (state, action) => {

    }
  },
  extraReducers: (builder) => {
    builder
    // fetch messages
    .addCase(HelpdeskAsync.fetchMessages.pending, (state, action) => {
      state.params = action.meta.arg;
    })
    .addCase(HelpdeskAsync.fetchMessages.fulfilled, (state, action) => {
      state.messages = action.payload.data.reverse();
      state.total = action.payload.total;
    })
  }
});

export const helpdeskActions = helpdeskSlice.actions;
export default helpdeskSlice.reducer;
