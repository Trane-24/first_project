import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../config";
// Async
import UsersAsync from "../users/usersAsync";
// Actions
import { authActions } from "./authSlice";
// Services
import HttpService from "../../services/HttpService";
import StorageService from "../../services/StorageService";

const url = `${config.apiURL}/auth`;

const AuthAsync = {
  signIn: createAsyncThunk('auth/signIn', async (data:any, thunkApi) => {
    try {
      const { data: token } = await HttpService.post(`${url}/login`, data);
      StorageService.setToken(token);
      thunkApi.dispatch(UsersAsync.fetchMe({}));
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }),
  signUp: createAsyncThunk('auth/signUp', async (data:any, thunkApi) => {
    try {
      await HttpService.post(`${url}/registration`, data);
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }),
  checkIsAuthorization: createAsyncThunk('auth/checkIsAuthorization', async (_:any, thunkApi) => {
    if ( StorageService.getToken() ){
      thunkApi.dispatch(UsersAsync.fetchMe({}));
    } else {
      StorageService.removeToken();
      thunkApi.dispatch(authActions.setAuthorization(false));
    }
  }),
}

export default AuthAsync;
