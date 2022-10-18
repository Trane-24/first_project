import { createAsyncThunk } from "@reduxjs/toolkit";
import { authActions } from "../auth/authSlice";
import config from "../../config";
// Services
import HttpService from "../../services/HttpService";

const url = `${config.apiURL}/users`;

const UsersAsync = {
  fetchMe: createAsyncThunk('users/Fetch me', async (_:any , thunkApi) => {
    try {
      const response: any = await HttpService.get(`${url}/fetchMe`);
      thunkApi.dispatch(authActions.setAuthorization(true));
      return response.data;
    } catch (e: any) {
      thunkApi.dispatch(authActions.setAuthorization(false));
      return thunkApi.rejectWithValue(e.response.data);
    }
  }),
  updateUser: createAsyncThunk('users/Update user', async (data: any, thunkApi) => {
    try {
      const { userId, userData } = data;
      const { data: user } = await HttpService.put(`${url}/${userId}`, userData);
      return user;
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  })
}

export default UsersAsync;
