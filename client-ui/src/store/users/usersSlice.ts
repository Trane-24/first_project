import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import StorageService from "../../services/StorageService";
import IUser from "../../models/User";
import UsersAsync from "./usersAsync";

interface IState {
  currentUser: IUser | null;
  users: IUser[] | null;
  total: number;
  params: any;
}

const initialState: IState = {
  currentUser: null,
  users: null,
  total: 0,
  params: {
    limit: 20,
    page: 1,
    search: '',
  }
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    removeCurrentUser: (state) => {
      state.currentUser = null;
    },
    setInitialField: (state, action: PayloadAction<keyof IState>) => {
      state[action.payload] = initialState[action.payload]
    },
    setQueryValue: (state, action) => {
      state.params = {...state.params, search: action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      // fetch me
      .addCase(UsersAsync.fetchMe.pending, (state) => {
        state.currentUser = null;
      })
      .addCase(UsersAsync.fetchMe.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(UsersAsync.fetchMe.rejected, () => {
        StorageService.removeToken();
      })
      // update user
      .addCase(UsersAsync.updateUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
  }
})

export const usersActions = usersSlice.actions;
export default usersSlice.reducer;