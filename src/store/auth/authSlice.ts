import { createSlice } from "@reduxjs/toolkit";
import { signIn } from "./authAsync";
// services
import StorageService from "../../services/StorageService";

interface IState {
  isAuthorization: boolean;
}

const initialState: IState = {
  isAuthorization: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkIsAuthorization: (state) => {
      state.isAuthorization = StorageService.getIsAuthorization() ? true : false;
    },
    signOut: (state) => {
      state.isAuthorization = false;
      StorageService.removeIsAuthorization();
    }
  },
  extraReducers: (builder) => {
    builder
    // Sign in
    .addCase(signIn.fulfilled, (state) => {
      StorageService.setIsAuthorization();
      state.isAuthorization = true;
    })
  }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;
