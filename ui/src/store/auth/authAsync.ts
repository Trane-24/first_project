import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import StorageService from "services/StorageService";
import { fetchMe } from "store/users/usersAsync";
import config from "../../config";

const url = `${config.apiURL}/auth`;

export const signIn = createAsyncThunk('auth/signIn', async (data:any, thunkApi) => {
  try {
    const response = await axios.post(`${url}/login`, data);
    StorageService.setToken(response.data);
    thunkApi.dispatch(fetchMe({}));
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
});

export const signUp = createAsyncThunk('auth/signUp', async (data:any, thunkApi) => {
  try {
    await axios.post(`${url}/registration`, data);
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
});
