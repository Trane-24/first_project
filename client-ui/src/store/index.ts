import { combineReducers, configureStore } from "@reduxjs/toolkit";
// Store
import authReducer from './auth/authSlice';
import usersReducer from "./users/usersSlice";
import appReducer from "./app/appSlice";
// middlewares
import errorMiddleware from "../middlewares/errorMiddelware";

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  users: usersReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(errorMiddleware)
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch']; 
