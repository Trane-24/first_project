import { createSlice } from "@reduxjs/toolkit";
// services
import StorageService from "../../services/StorageService";
import IUser from "../../models/User";

interface IState {
  isAuthorization: boolean | null;
}

const initialState: IState = {
  isAuthorization: null,
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
    }
  }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;
