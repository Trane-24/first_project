import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "config";
// Services
import HttpService from "services/HttpService";

const url = `${config.apiURL}/hotelTypes`;

// fetch hotel types
export const fetchHotelTypes = createAsyncThunk('hotelsTypes/Fetch hotel types', async (params:any, thunkApi) => {
  try {
    const response = await HttpService.get(url, params);
    return response.data;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
});
