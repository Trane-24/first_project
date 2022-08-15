import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import StorageService from "services/StorageService";
import { authActions } from "store/auth/authSlice";
import config from "../../config";

const url = `${config.apiURL}/users`;

export const fetchMe = createAsyncThunk('users/Fetch me', async (_:any , thunkApi) => {
  try {
    const response: any = await axios.get(`${url}/fetchMe`, {
      headers: {Authorization: `Barrer ${StorageService.getToken()}`}
    });
    thunkApi.dispatch(authActions.setAuthorization(true));
    return response.data;
  } catch (e: any) {
    thunkApi.dispatch(authActions.setAuthorization(false));
    return thunkApi.rejectWithValue(e.response.data);
  }
});

export const fetchUsers = createAsyncThunk('users/Fetch users', async(params:any , thunkApi) => {
  try {
    const nextParams = new URLSearchParams();

    Object.keys(params).forEach((key: string) => {
      if (params[key]) {
        nextParams.append(key, params[key])
      }
    })

    const { data } = await axios.get(`${url}?${nextParams}`);
    return data;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
});

export const createUser = createAsyncThunk('users/Create user', async(user: any, thunkApi) => {
  try {
    const { data } = await axios.post(url, user);
    return data;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
});

export const deleteUser = createAsyncThunk('users/Delete user', async (userId: number, thunkApi) => {
  try {
    await axios.delete(`${url}/${userId}`);
    return userId;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
});

export const updateUser = createAsyncThunk('users/Update user', async (params: any, thunkApi) => {
  try {
    const { data } = await axios.put(`${url}/${params.userId}`, params.user)
    return data;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
});
