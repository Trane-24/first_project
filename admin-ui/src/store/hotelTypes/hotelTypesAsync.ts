import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "config";
// Async
import AssetsAsync from "store/assets/assetsAsync";
// Models
import IAsset from "models/Asset";
import IHotel from "models/Hotel";
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
// create hotel types
export const createHotelType = createAsyncThunk('hotelsTypes/Create hotel type', async (data: Omit<IHotel, '_id'>, thunkApi) => {
  try {
    const nextData: any = { ...data };
    nextData['imageId'] = null;

    const { payload: images } : any = await thunkApi.dispatch(AssetsAsync.validateAssets({}));

    if (images.length) {
      nextData['imageId'] = images[0]._id;
    }

    const { data: hotelType } = await HttpService.post(url, nextData);
    return hotelType;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
});
// delete hotel type
export const deleteHotelType = createAsyncThunk('hotelsTypes/Delete hotel type', async (hotelTypeId: string, thunkApi) => {
  try {
    await HttpService.delete(`${url}/${hotelTypeId}`);
    return hotelTypeId;
  } catch(e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
});
// update hotel type
export const updateHotelType = createAsyncThunk('hotelsTypes/Update hotel type', async (data: any, thunkApi) => {
  try {
    const { hotelTypeId, hotelTypeData } = data;
    const nextData: any = { ...hotelTypeData };

    const { payload: images } : any = await thunkApi.dispatch(AssetsAsync.validateAssets({}));

    nextData['imageId'] = images.length ? images[0]._id : null;

    const { data: hotel } = await HttpService.put(`${url}/${hotelTypeId}`, nextData)
    return hotel;
  } catch(e: any) {
    return thunkApi.rejectWithValue(e.response.data)
  }
});