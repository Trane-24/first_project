import { RootState } from "store";

export const selectMessages = (state: RootState) => state.helpdesk.messages;
export const selectTotal = (state: RootState) => state.helpdesk.total;
export const selectParams = (state: RootState) => state.helpdesk.params;
