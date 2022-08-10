import { createSlice } from "@reduxjs/toolkit";
import IUser from "../../models/User";
import { createUser, deleteUser, fetchUsers } from "./usersAsync";

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
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users = [...state.users, action.payload];
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload)
      })
  }
})

export const usersActions = usersSlice.actions;
export default usersSlice.reducer;