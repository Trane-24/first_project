import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "config";
import IFile from "models/File";
import StorageService from "services/StorageService";
import { RootState } from "store";
import myAxios from "utilites/myAxios";

const url = `${config.apiURL}/assets`;

const AssetsAsync = {
  createAsset: createAsyncThunk('assets/createAsset', async (files: IFile[], thunkApi) => {
    const formData = new FormData();
    Array.from(files).forEach((file: IFile) => {
      formData.append('files', file.file, file.file.name);
    })
    // const {data} = await myAxios.post(url, formData);
    const {data} = await axios.post(url, formData, {headers: {Authorization: `Barrer ${StorageService.getToken()}`}});
    return data;
  }),
  validateAssets: createAsyncThunk('assets/validateAssets', async (_: any, thunkApi) => {
    const state = thunkApi.getState() as RootState;

    const { files, assets, assetsIdsToDelete } = state.assets;

    let result = [...assets];

    if (files.length) {
      const { payload } = await thunkApi.dispatch(AssetsAsync.createAsset(files));
      result = [...result, ...payload];
    }

    if (assetsIdsToDelete.length) {
      result = result.filter(asset => !assetsIdsToDelete.includes(asset._id));
    }

    return result;
  }),
  deleteAsset: createAsyncThunk('asset/deleteAsset', async (id: string, thunkApi) => {
    await myAxios.delete(url, id);
  }),
}

export default AssetsAsync;
