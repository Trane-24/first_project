import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config";

export const fetchUsers = createAsyncThunk('users/Fetch users', async(params:any , thunkApi) => {
  try {
    const { role } = params;
    const response: any = await axios.get(`${config.apiURL}/users?role=${role}`);
    return response.data;
  } catch {
    return thunkApi.rejectWithValue(null);
  }
});

export const createUser = createAsyncThunk('user/Create user', async(user: any, thunkApi) => {
  try {
    const { data } = await axios.post(`${config.apiURL}/users`, user);
    return data;
  } catch {
    return thunkApi.rejectWithValue(null);
  }
});

export const deleteUser = createAsyncThunk('user/Delete user', async (userId: number, thunkApi) => {
  try {
    const { data } = await axios.delete(`${config.apiURL}/users/${userId}`);
    return data;
  } catch {
    return thunkApi.rejectWithValue(null);
  }
});

export const updateUser = createAsyncThunk('user/Update user', async (params: any, thunkApi) => {
  try {
    const { data } = await axios.put(`${config.apiURL}/users/${params.userId}`, params.user)
    return data;
  } catch {
    return thunkApi.rejectWithValue(null);
  }
})