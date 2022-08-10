import { createSlice } from "@reduxjs/toolkit";
import IUser from "../../models/User";
import { createUser, deleteUser, fetchUsers, updateUser } from "./usersAsync";

interface IState {
  users: IUser[];
}

const initialState: IState = {
  users: [],
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      // fetch users
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      // create user
      .addCase(createUser.fulfilled, (state, action) => {
        state.users = [action.payload, ...state.users];
      })
      // delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user._id !== action.payload._id)
      })
      // updatee user
      .addCase(updateUser.fulfilled, (state, action) => {
        state.users = state.users.map(user => {
          if (user._id !== action.payload._id) {
            return user;
          }
          return action.payload;
        })
      })
  }
})

export const usersActions = usersSlice.actions;
export default usersSlice.reducer;