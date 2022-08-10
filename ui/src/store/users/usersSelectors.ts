import { RootState } from "..";

export const selectUsers = (state: RootState) => state.users.users;
// export const selectIsLoading = (state: RootState) => state.users.isLoading;