import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import todosReducer from './todo/todosSlice'

const rootReducer = combineReducers({
  todos: todosReducer,
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
