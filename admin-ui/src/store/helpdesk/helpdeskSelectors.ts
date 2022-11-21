import { RootState } from "store";

export const selectMessages = (state: RootState) => state.helpdesk.messages;
export const selectTotal = (state: RootState) => state.helpdesk.total;
export const selectParams = (state: RootState) => state.helpdesk.params;

export const selectConversations = (state: RootState) => state.helpdesk.conversations;
export const selectConversationsTotal = (state: RootState) => state.helpdesk.conversationsTotal;
export const selectConversationsParams = (state: RootState) => state.helpdesk.conversationsParams;
