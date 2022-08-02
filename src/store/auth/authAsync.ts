import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config";

export const signIn = createAsyncThunk('signIn/signIn', async (_:any, thunkApi) => {
  try {
    await axios.get(`${config.apiURL}/login`);
  } catch {
    return thunkApi.rejectWithValue(null);
  }
});

export const signUp = createAsyncThunk('signUp/signUp', async (params:any, thunkApi) => {
  try {
    await axios.post(`${config.apiURL}/registration`, params);
  } catch {
    return thunkApi.rejectWithValue(null);
  }
});
