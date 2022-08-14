import { createSlice } from "@reduxjs/toolkit";
import StorageService from "services/StorageService";
import IUser from "../../models/User";
import { createUser, deleteUser, fetchMe, fetchUsers, updateUser } from "./usersAsync";

interface IState {
  currentUser: IUser | null;
  users: IUser[] | null;
  total: number;
}

const initialState: IState = {
  currentUser: null,
  users: null,
  total: 0,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    removeCurrentUser: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch me
      .addCase(fetchMe.pending, (state) => {
        state.currentUser = null;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(fetchMe.rejected, () => {
        StorageService.removeToken();
      })
      // fetch users
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload.data;
        state.total = action.payload.pages;
      })
      // create user
      .addCase(createUser.fulfilled, (state, action) => {
        state.users = state.users ? [action.payload, ...state.users] : [action.payload];
      })
      // delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users ? state.users.filter(user => user._id !== action.payload._id) : null;
      })
      // update user
      .addCase(updateUser.fulfilled, (state, action) => {
        state.currentUser = action.payload._id === state.currentUser?._id ? action.payload : state.currentUser;
        state.users = state.users
          ? state.users.map(user => user._id === action.payload._id ? action.payload : user)
          : null
      })
  }
})

export const usersActions = usersSlice.actions;
export default usersSlice.reducer;