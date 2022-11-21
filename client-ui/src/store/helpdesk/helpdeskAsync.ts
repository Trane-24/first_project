import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "config";
// Services
import HttpService from "services/HttpService";

const url = `${config.apiURL}/helpdesk`;

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
