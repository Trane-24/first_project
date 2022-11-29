import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "config";
import IAsset from "models/Asset";
// Services
import HttpService from "services/HttpService";
import AssetsAsync from "store/assets/assetsAsync";

const url = `${config.apiURL}/hotels`;
// fetch hotel
export const fetchHotel = createAsyncThunk('hotels/Fetch hotel', async (hotelId: string, thunkApi) => {
  try {
    const response = await HttpService.get(`${url}/search/${hotelId}`);
    return response.data;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
})
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
// fetch current user hotels
export const fetchCurrentUserHotels = createAsyncThunk('hotels/Fetch current user hotels', async (params: any, thunkApi) => {
  try {
    const response = await HttpService.get(url, params);
    return response.data;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
})
// create hotel
export const createHotel = createAsyncThunk('hotels/Create hotel', async (data: any, thunkApi) => {
  try {
    const nextData: any = { ...data };

    const { payload: images } : any = await thunkApi.dispatch(AssetsAsync.validateAssets({}));

    if (images.length) {
      nextData['imagesIds'] = images.map((asset: IAsset) => asset._id);
    }

    const { data: hotel } = await HttpService.post(url, nextData);
    return hotel;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data)
  }
})
// update hotel
export const updateHotel = createAsyncThunk('hotels/Update hotels', async (data: any, thunkApi) => {
  try {
    const { hotelId, hotelData } = data;
    const nextData: any = { ...hotelData };

    const { payload: images } : any = await thunkApi.dispatch(AssetsAsync.validateAssets({}));
    
    if (images.length) {
      nextData['imagesIds'] = images.map((asset: IAsset) => asset._id);
    }
    console.log(nextData)
    const { data: hotel } = await HttpService.put(`${url}/${hotelId}`, nextData)
    return hotel;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
})
// delete hotel
export const deleteHotel = createAsyncThunk('hotels/Delete hotel', async (hotelId: string, thunkApi) => {
  try {
    await HttpService.delete(`${url}/${hotelId}`);
    return hotelId;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
})
