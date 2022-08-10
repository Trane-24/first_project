import { createSlice } from "@reduxjs/toolkit";
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
    setAuthorization: (state, action) => {
      state.isAuthorization = action.payload;
    },
    checkIsAuthorization: (state) => {
      state.isAuthorization = StorageService.getToken() ? true : false;
    },
    signOut: (state) => {
      state.isAuthorization = false;
      StorageService.removeToken();
      state.currentUser = null;
    }
  }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;
