import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "config";

const url = `${config.apiURL}/hotels`;
// fetch hotels
export const fetchHotels = createAsyncThunk('hotels/Fetch hotels', async (params:any, thunkApi) => {
  try {
    const nextParams = new URLSearchParams();

    Object.keys(params).forEach((key: string) => {
      if (params[key]) {
        nextParams.append(key, params[key]);
      }
    })

    const response = await axios.get(url);
    console.log(response.data)
    return response.data;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
});
// create hotel
export const createHotel = createAsyncThunk('hotels/Create hotel', async (hotel: any, thunkApi) => {
  try {
    const { data } = await axios.post(url, hotel);
    return data;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
});
// delete hotel
export const deleteHotel = createAsyncThunk('hotels/Delete hotel',async (hotelId: string, thunkApi) => {
  try {
    await axios.delete(`${url}/${hotelId}`);
    return hotelId;
  } catch(e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
});
// update hotel
export const updateHote = createAsyncThunk('hotes/Update hotel', async (params: any, thunkApi) => {
  try {
    const { data } = await axios.put(`${url}/${params.hotelId}`, params.hotel)
    return data;
  } catch(e: any) {
    return thunkApi.rejectWithValue(e.response.data)
  }
});