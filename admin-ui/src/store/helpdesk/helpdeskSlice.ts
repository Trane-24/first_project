import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IConversation from 'models/Conversation';
import IMessage from 'models/Message';
import HelpdeskAsync from './helpdeskAsync';

interface IState {
  messages: IMessage[] | null;
  conversations: IConversation[] | null;
  conversationsTotal: number;
  conversationsParams: any;
  total: number;
  params: any;
  connected: boolean;
}

const initialState: IState = {
  messages: null,
  conversations: null,
  conversationsTotal: 0,
  conversationsParams: {
    limit: 50,
    page: 1,
  },
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
    sendMessage: (state, action) => { }
  },
  extraReducers: (builder) => {
    builder
    // fetch conversations
    .addCase(HelpdeskAsync.fetchConversations.pending, (state, action) => {
      state.conversationsParams = action.meta.arg;
    })
    .addCase(HelpdeskAsync.fetchConversations.fulfilled, (state, action) => {
      state.conversations = action.payload.data;
      state.conversationsTotal = action.payload.total;
    })
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
