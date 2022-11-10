import { combineReducers, configureStore } from "@reduxjs/toolkit";
// Store
import authReducer from 'store/auth/authSlice';
import appReducer from 'store/app/appSlice';
import usersReducer from 'store/users/usersSlice';
import hotelsReducer from 'store/hotels/hotelsSlice';
import hotelTypesReducer from 'store/hotelTypes/hotelTypesSlice';
import reservationReducer from 'store/reservation/reservationSlice';
import assetsReducer from 'store/assets/assetsSlice';
// middlewares
import errorMiddleware from "middlewares/errorMiddelware";

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  users: usersReducer,
  hotels: hotelsReducer,
  hotelTypes: hotelTypesReducer,
  reservations: reservationReducer,
  assets: assetsReducer,
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
