import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "config";
// Services
import HttpService from "services/HttpService";

const url = `${config.apiURL}/helpdesk`;

<<<<<<< HEAD
const HelpdeskAsync = {
  fetchMessages: createAsyncThunk('hotels/fetchMessages', async (params:any, thunkApi) => {
    try {
      const { data: { data, total } } = await HttpService.get(`${url}/messages`, params);
      return { data, total };
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  })
}

export default HelpdeskAsync;
=======
// fetch messages
export const fetchMessages = createAsyncThunk('helpdesk/Fetch messages', async (params:any, thunkApi) => {
  try {
    const response = await HttpService.get(`${url}/messages`, params);
    return response.data;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
});
// send message
export const sendMessasges = createAsyncThunk('helpdesk/Send message', async (params: any, thunkApi) => {
  try {
    const newMessage = { message: params };

    const response = await HttpService.post(`${url}/messages`, newMessage);
    return response.data;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
})
>>>>>>> 474d7eafdaa64ab7a428c77c19c7e61ce5f44261
