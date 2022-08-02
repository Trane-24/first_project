import { RootState } from "..";

export const selectTodos = (state: RootState) => state.todos.todos;
