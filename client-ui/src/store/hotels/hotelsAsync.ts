import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "config";
// Services
import HttpService from "services/HttpService";

const url = `${config.apiURL}/hotels`;

// fetch hotels list
export const fetchHotels = createAsyncThunk('hotels/Fetch hotels list', async (params:any, thunkApi) => {
  try {
    const response = await HttpService.get(`${url}/search`, params);
    return response.data;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
});
// fetch top hotels
export const fetchTopHotels = createAsyncThunk('hotels/Fetch top hotels', async (params:any, thunkApi) => {
  try {
    const response = await HttpService.get(`${url}/topHotels`, params);
    return response.data;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
});
