import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "config";
// Services
import HttpService from "services/HttpService";

const url = `${config.apiURL}/helpdesk`;

const HelpdeskAsync = {
  // Fetch conversations
  fetchConversations: createAsyncThunk('hotels/fetchConversations', async (params:any, thunkApi) => {
    try {
      const { data: { data, total } } = await HttpService.get(`${url}/conversations`, params);
      return { data, total };
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }),
  // Fetch messages
  fetchMessages: createAsyncThunk('hotels/fetchMessages', async (params:any, thunkApi) => {
    try {
      const { clientId, ...nextParams } = params;
      const { data: { data, total } } = await HttpService.get(`${url}/messages/${clientId}`, nextParams);
      return { data, total };
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }),
}

export default HelpdeskAsync;
