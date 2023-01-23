<<<<<<< HEAD
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IMessage from 'models/Message';
import HelpdeskAsync from './helpdeskAsync';
=======
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IMessage from "models/Message";
import { fetchMessages, sendMessasges } from "./helpdeskAsync";
>>>>>>> 474d7eafdaa64ab7a428c77c19c7e61ce5f44261

interface IState {
  messages: IMessage[] | null;
  total: number;
<<<<<<< HEAD
  params: any;
  connected: boolean;
=======
  params: {
    page: number;
    limit: number;
  }
>>>>>>> 474d7eafdaa64ab7a428c77c19c7e61ce5f44261
}

const initialState: IState = {
  messages: null,
  total: 0,
  params: {
<<<<<<< HEAD
    limit: 50,
    page: 1,
  },
  connected: false,
=======
    page: 1,
    limit: 20,
  }
>>>>>>> 474d7eafdaa64ab7a428c77c19c7e61ce5f44261
};

const helpdeskSlice = createSlice({
  name: 'helpdesk',
  initialState,
  reducers: {
<<<<<<< HEAD
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
=======
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

>>>>>>> 474d7eafdaa64ab7a428c77c19c7e61ce5f44261
