import { combineReducers, configureStore } from "@reduxjs/toolkit";
// Store
import authReducer from './auth/authSlice';
import usersReducer from "./users/usersSlice";
import appReducer from "./app/appSlice";
import hotelsReducer from "./hotels/hotelsSlice";
import hotelTypesReducer from "./hotelTypes/hotelTypesSlice";
import assetsReducer from "./assets/assetsSlice";
import helpdeskReducer from "./helpdesk/helpdeskSlice";
// middlewares
import errorMiddleware from "../middlewares/errorMiddelware";
import messagesMiddelware from "middlewares/messagesMiddelware";

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  users: usersReducer,
  hotels: hotelsReducer,
  hotelTypes: hotelTypesReducer,
  assets: assetsReducer,
  helpdesk: helpdeskReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat([errorMiddleware, messagesMiddelware])
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch']; 
