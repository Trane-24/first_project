import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import INotification from "../../models/Notification";

interface IState {
  drawerOpen: boolean;
  notifications: INotification[];
}

const initialState: IState = {
  drawerOpen: false,
  notifications: [],
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.drawerOpen = !state.drawerOpen;
    },
    enqueueSnackbar: (state, action:PayloadAction<INotification>) => {
      state.notifications = [ ...state.notifications, action.payload ]
    },
    closeSnackbar: (state, action:PayloadAction<{ key:string, dismissAll:boolean }>) => {
      state.notifications = state.notifications.map((notification:INotification) =>
        (action.payload.dismissAll || notification.key === action.payload.key)
          ? { ...notification, dismissed: true }
          : notification
      )
    },
    removeSnackbar: (state, action:PayloadAction<string>) => {
      state.notifications = state.notifications.filter((notification:INotification) =>
        notification.key !== action.payload
      )
    }
  }
})

export const appActions = appSlice.actions;
export default appSlice.reducer;
