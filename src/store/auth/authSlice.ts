import { createSlice } from "@reduxjs/toolkit";
import { signIn } from "./authAsync";

interface IState {
  isAuthorization: boolean;
}

const initialState: IState = {
  isAuthorization: false,
}

const todosSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
    // Sign in
    .addCase(signIn.fulfilled, (state) => {
      state.isAuthorization = true;
    })
  }
})

export const todosActions = todosSlice.actions;
export default todosSlice.reducer;
