import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/authSlice'
import appReducer from './app/appSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch']; 
