import { RootState } from "..";

export const selectDrawerOpen = (state:RootState) => state.app.drawerOpen;
export const selectNotifications = (state:RootState) => state.app.notifications;
