import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../config";
// Async
import { fetchMe } from "../users/usersAsync";
// Actions
import { authActions } from "./authSlice";
// Services
import HttpService from "../../services/HttpService";
import StorageService from "../../services/StorageService";

const url = `${config.apiURL}/auth`;

export const signIn = createAsyncThunk('auth/signIn', async (data:any, thunkApi) => {
  try {
    const response = await HttpService.post(`${url}/login`, data);
    StorageService.setToken(response.data);
    thunkApi.dispatch(fetchMe({}));
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
});

export const signUp = createAsyncThunk('auth/signUp', async (data:any, thunkApi) => {
  try {
    await HttpService.post(`${url}/registration`, data);
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
});

 // Check authenticated
 export const checkIsAuthorization = createAsyncThunk('auth/checkIsAuthorization', async (_:any, thunkApi) => {
  if ( StorageService.getToken() ){
    thunkApi.dispatch(fetchMe({}));
  } else {
    StorageService.removeToken();
    thunkApi.dispatch(authActions.setAuthorization(false));
  }
});
