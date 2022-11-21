import { createAsyncThunk } from "@reduxjs/toolkit";
import { authActions } from "store/auth/authSlice";
import config from "config";
// Services
import HttpService from "services/HttpService";

const url = `${config.apiURL}/users`;

export const fetchMe = createAsyncThunk('users/Fetch me', async (_:any , thunkApi) => {
  try {
    const response: any = await HttpService.get(`${url}/fetchMe`);
    thunkApi.dispatch(authActions.setAuthorization(true));
    return response.data;
  } catch (e: any) {
    thunkApi.dispatch(authActions.setAuthorization(false));
    return thunkApi.rejectWithValue(e.response.data);
  }
});

export const fetchUsers = createAsyncThunk('users/Fetch users', async(params:any , thunkApi) => {
  try {
    const { data } = await HttpService.get(url, params);
    return data;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
});

export const createUser = createAsyncThunk('users/Create user', async(user: any, thunkApi) => {
  try {
    const { data } = await HttpService.post(url, user);
    return data;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
});

export const deleteUser = createAsyncThunk('users/Delete user', async (userId: string, thunkApi) => {
  try {
    await HttpService.delete(`${url}/${userId}`);
    return userId;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
});

export const updateUser = createAsyncThunk('users/Update user', async (data: any, thunkApi) => {
  try {
    const { userId, userData } = data;
    const { data: user } = await HttpService.put(`${url}/${userId}`, userData);
    return user;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
});
