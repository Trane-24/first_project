import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "config";
import IAsset from "models/Asset";
import IHotel from "models/Hotel";
import { RootState } from "store";
import AssetsAsync from "store/assets/assetsAsync";
import { selectFile } from "store/assets/assetsSelectors";
import myAxios from "utilites/myAxios";

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

    const response = await myAxios.get(url, nextParams);
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
    
    const { data: hotel } = await myAxios.post(url, nextData);
    return hotel;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
});
// delete hotel
export const deleteHotel = createAsyncThunk('hotels/Delete hotel', async (hotelId: string, thunkApi) => {
  try {
    await myAxios.delete(url,hotelId);
    return hotelId;
  } catch(e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
});
// update hotel
export const updateHote = createAsyncThunk('hotes/Update hotel', async (params: any, thunkApi) => {
  try {
    const { hotelId, hotel } = params;
    const nextData: any = { ...hotel };

    const { payload: images } : any = await thunkApi.dispatch(AssetsAsync.validateAssets({}));

    if (images.length) {
      nextData['imagesIds'] = images.map((asset: IAsset) => asset._id);
    }

    const { data } = await myAxios.put(url, hotelId, nextData)
    return data;
  } catch(e: any) {
    return thunkApi.rejectWithValue(e.response.data)
  }
});