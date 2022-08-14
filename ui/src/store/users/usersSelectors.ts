import { RootState } from "..";

export const selectCurrentUser = (state: RootState) => state.users.currentUser;
export const selectUsers = (state: RootState) => state.users.users;
export const selectTotal = (state: RootState) => state.users.total;
export const selectParams = (state: RootState) => state.users.params;
