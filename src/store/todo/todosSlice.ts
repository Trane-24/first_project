import { createSlice } from "@reduxjs/toolkit";
import TodosAsynk from "./todosAsync";

interface IState {
  todos: any[] | null;
}

const initialState: IState = {
  todos: null,
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
    //Fetch todos
    .addCase(TodosAsynk.fetchTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
    })
  }
})

export const todosActions = todosSlice.actions;
export default todosSlice.reducer;
