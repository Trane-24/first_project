import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config";

const url = `${config.apiURL}/auth`;

export const signIn = createAsyncThunk('auth/signIn', async (data:any, thunkApi) => {
  try {
    const response = await axios.post(`${url}/login`, data);
    return response.data;
  } catch {
    return thunkApi.rejectWithValue(null);
  }
});

export const signUp = createAsyncThunk('auth/signUp', async (data:any, thunkApi) => {
  try {
    await axios.post(`${url}/registration`, data);
  } catch {
    return thunkApi.rejectWithValue(null);
  }
});
