import { createSlice } from "@reduxjs/toolkit";
import { signIn } from "./authAsync";
// services
import StorageService from "../../services/StorageService";
import IUser from "../../models/User";

interface IState {
  isAuthorization: boolean | null;
  currentUser: IUser | null;
}

const initialState: IState = {
  isAuthorization: null,
  currentUser: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkIsAuthorization: (state) => {
      state.isAuthorization = StorageService.getToken() ? true : false;
    },
    signOut: (state) => {
      state.isAuthorization = false;
      StorageService.removeToken();
      state.currentUser = null;
    }
  },
  extraReducers: (builder) => {
    builder
    // Sign in
    .addCase(signIn.fulfilled, (state, action) => {
      StorageService.setToken(action.payload.token);
      state.isAuthorization = true;
      state.currentUser = action.payload.user;
    })
  }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;
