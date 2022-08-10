import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config";
import IUser from "../../models/User";

export const fetchUsers = createAsyncThunk('users/Fetch users', async(_:any , thunkApi) => {
  try {
    const response: any = await axios.get(`${config.apiURL}/users`);
    return response.data;
  } catch {
    return thunkApi.rejectWithValue(null);
  }
});

export const createUser = createAsyncThunk('user/Create user', async(user: any, thunkApi) => {
  try {
    const response: any = await axios.post(`${config.apiURL}/users`, user);
    return response.data;
  } catch {
    return thunkApi.rejectWithValue(null);
  }
});

export const deleteUser = createAsyncThunk('user/Delete user', async (userId: number, thunkApi) => {
  try {
    await axios.delete(`${config.apiURL}/users/${userId}`);
  } catch {
    return thunkApi.rejectWithValue(null);
  }
})