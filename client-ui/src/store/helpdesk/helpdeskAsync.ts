import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "config";
// Services
import HttpService from "services/HttpService";

const url = `${config.apiURL}/helpdesk`;

// fetch messages
export const fetchMessages = createAsyncThunk('helpdesk/Fetch messages', async (params:any, thunkApi) => {
  try {
    const response = await HttpService.get(`${url}/messages`, params);
    return response.data;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
});
