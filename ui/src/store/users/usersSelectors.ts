import { RootState } from "..";

export const selectUsers = (state: RootState) => state.users.users;