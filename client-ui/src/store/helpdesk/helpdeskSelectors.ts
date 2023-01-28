import { RootState } from "store";

export const selectMessages = (state: RootState) => state.helpdesk.messages;
export const selectParams = (state: RootState) => state.helpdesk.params;
export const selectTotal = (state: RootState) => state.helpdesk.total;
export const selecIsConnected = (state: RootState) => state.helpdesk.isConnected;
