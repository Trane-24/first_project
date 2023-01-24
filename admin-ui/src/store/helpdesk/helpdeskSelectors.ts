import { RootState } from "store";

export const selectMessages = (state: RootState) => state.helpdesk.messages;
export const selectConversations = (state: RootState) => state.helpdesk.conversations;
export const selectCurrentConversation = (state: RootState) => state.helpdesk.currentConversation;
export const selectParams = (state: RootState) => state.helpdesk.params;
export const selectTotal = (state: RootState) => state.helpdesk.total;
