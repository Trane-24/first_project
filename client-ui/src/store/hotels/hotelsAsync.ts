import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "config";
// Models
import IHotel from "models/Hotel";
// Services
import HttpService from "services/HttpService";

const url = `${config.apiURL}/hotels/search`;

// fetch hotels
export const fetchHotels = createAsyncThunk('hotels/Fetch hotels', async (params:any, thunkApi) => {
  try {
    const response = await HttpService.get(url, params);
    return response.data;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
});
