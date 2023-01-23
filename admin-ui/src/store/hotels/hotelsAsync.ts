import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "config";
// Async
import AssetsAsync from "store/assets/assetsAsync";
// Models
import IAsset from "models/Asset";
import IHotel from "models/Hotel";
// Services
import HttpService from "services/HttpService";

const url = `${config.apiURL}/hotels`;

// fetch hotels
export const fetchHotels = createAsyncThunk('hotels/Fetch hotels', async (params:any, thunkApi) => {
  try {
    const response = await HttpService.get(url, params);
    return response.data;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
});
// create hotel
export const createHotel = createAsyncThunk('hotels/Create hotel', async (data: Omit<IHotel, '_id'>, thunkApi) => {
  try {
    const nextData: any = { ...data };

    const { payload: images } : any = await thunkApi.dispatch(AssetsAsync.validateAssets({}));

    if (images.length) {
      nextData['imagesIds'] = images.map((asset: IAsset) => asset._id);
    }
    
    const { data: hotel } = await HttpService.post(url, nextData);
    return hotel;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
});
// delete hotel
export const deleteHotel = createAsyncThunk('hotels/Delete hotel', async (hotelId: string, thunkApi) => {
  try {
    await HttpService.delete(`${url}/${hotelId}`);
    return hotelId;
  } catch(e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
});
// update hotel
export const updateHotel = createAsyncThunk('hotes/Update hotel', async (data: any, thunkApi) => {
  try {
    const { hotelId, hotelData } = data;
    const nextData: any = { ...hotelData };

    const { payload: images } : any = await thunkApi.dispatch(AssetsAsync.validateAssets({}));
    
    if (images.length) {
      nextData['imagesIds'] = images.map((asset: IAsset) => asset._id);
    }

    const { data: hotel } = await HttpService.put(`${url}/${hotelId}`, nextData)
    return hotel;
  } catch(e: any) {
    return thunkApi.rejectWithValue(e.response.data)
  }
});
// verified hotel
export const markAsAerified = createAsyncThunk('hotels/Verified hotel', async (id: string, thunkApi) => {
  try {
    const { data: hotel } = await HttpService.put(`${url}/${id}/actions/markAsVerified`, {})
    return hotel._id;
  } catch(e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
})