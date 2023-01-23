import { combineReducers, configureStore } from "@reduxjs/toolkit";
// Store
import authReducer from './auth/authSlice';
import usersReducer from "./users/usersSlice";
import appReducer from "./app/appSlice";
import hotelsReducer from "./hotels/hotelsSlice";
import hotelTypesReducer from "./hotelTypes/hotelTypesSlice";
import assetsReducer from "./assets/assetsSlice";
<<<<<<< HEAD
=======
import reservationsReducer from "./reservations/reservationsSlice";
>>>>>>> 474d7eafdaa64ab7a428c77c19c7e61ce5f44261
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
<<<<<<< HEAD
=======
  reservations: reservationsReducer,
>>>>>>> 474d7eafdaa64ab7a428c77c19c7e61ce5f44261
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
