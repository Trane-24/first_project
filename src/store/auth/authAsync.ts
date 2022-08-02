import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config";

export const signIn = createAsyncThunk('todos/fetchTodos', async (_:any, thunkApi) => {
  try {
    await axios.get(`${config.apiURL}/login`);
  } catch {
    return thunkApi.rejectWithValue(null);
  }
});
