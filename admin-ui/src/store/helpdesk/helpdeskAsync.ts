import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "config";
// Services
import HttpService from "services/HttpService";

const url = `${config.apiURL}/helpdesk`;

// fetch conversations
export const fetchConversations = createAsyncThunk('helpdesk/Fetch conversations', async (params:any, thunkApi) => {
  try {
    const response = await HttpService.get(`${url}/conversations`, params.data);
    return response.data;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
});

// fetch messages
export const fetchMessages = createAsyncThunk('helpdesk/Fetch user messages', async (params:any, thunkApi) => {
  try {
    console.log(params.data, 'params.data')
    const response = await HttpService.get(`${url}/messages/${params.userId}`, params.data);
    return response.data;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
});

// send message
export const sendMessasges = createAsyncThunk('helpdesk/Send message', async (params: any, thunkApi) => {
  try {
    const newMessage = { message: params.message };

    const response = await HttpService.post(`${url}/messages/${params.userId}`, newMessage);
    return response.data;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
})
