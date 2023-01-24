import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import IConversation from "models/Conversation";
import IMessage from "models/Message";
import { fetchConversations, fetchMessages, sendMessasges } from "./helpdeskAsync";

interface IState {
  messages: IMessage[] | null;
  conversations: IConversation[] | null;
  currentConversation: any | null;
  total: number;
  params: {
    page: number;
    limit: number;
  }
}

const initialState: IState = {
  messages: null,
  conversations: null,
  currentConversation: null,
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
    chnageConversation: (state, actions) => {
      state.currentConversation = actions.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      //Fetch conversations
      .addCase(fetchConversations.fulfilled, (state, actions) => {
        state.conversations = actions.payload.data;
      })
      //Fetch messages
      .addCase(fetchMessages.pending, (state, actions) => {
        state.params = actions.meta.arg.data;
      })
      .addCase(fetchMessages.fulfilled, (state, actions) => {
        state.messages = state.messages
          ? [...actions.payload.data.reverse(), ...state.messages]
          : actions.payload.data.reverse();
        state.total = actions.payload.total;
      })
      //Send messasges
      .addCase(sendMessasges.fulfilled, (state, actions) => {
        const { message, updatedAt} = actions.payload;

        state.messages = state.messages && state.messages.length < state.total
          ? [...state.messages.slice(1), actions.payload]
          : state.messages && state.messages.length === state.total
            ? [...state.messages, actions.payload]
            : [actions.payload];
        state.total = state.total + 1;
        state.conversations = state.conversations
          ? state.conversations.map(converstation =>
            converstation._id !== state.currentConversation._id
              ? converstation
              : {...converstation, message: message, updatedAt: updatedAt}
            ).sort((el1, el2) => (dayjs(el1.updatedAt).isAfter(dayjs(el2.updatedAt)) ? -1 : 1))
          : null;
      })
  }
})

export const helpdeskActions = helpdeskSlice.actions;
export default helpdeskSlice.reducer;

