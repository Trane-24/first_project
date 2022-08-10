import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from 'store/auth/authSlice';
import appReducer from 'store/app/appSlice';
import usersReducer from 'store/users/usersSlice'
import errorMiddleware from "middlewares/errorMiddelware";
import signInMiddleware from "middlewares/signInMeddelware";

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  users: usersReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(errorMiddleware).concat(signInMiddleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch']; 
