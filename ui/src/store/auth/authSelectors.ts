import { RootState } from "..";

export const selectIsAuthorization = (state: RootState) => state.auth.isAuthorization;
export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
