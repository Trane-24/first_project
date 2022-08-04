import { createSlice } from "@reduxjs/toolkit";

interface IState {
  drawerOpen: boolean;
}

const initialState: IState = {
  drawerOpen: false,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.drawerOpen = !state.drawerOpen;
    },
  }
})

export const appActions = appSlice.actions;
export default appSlice.reducer;
