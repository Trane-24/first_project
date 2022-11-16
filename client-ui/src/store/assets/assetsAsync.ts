import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "config";
import { RootState } from "store";
// Models
import IFile from "models/File";
// Service
import HttpService from "services/HttpService";

const url = `${config.apiURL}/assets`;

const AssetsAsync = {
  createAsset: createAsyncThunk('assets/createAsset', async (files: IFile[], thunkApi) => {
    const formData = new FormData();
    Array.from(files).forEach((file: IFile) => {
      formData.append('files', file.file, file.file.name);
    })

    const {data} = await HttpService.post(url, formData);
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
  deleteAsset: createAsyncThunk('asset/deleteAsset', async (id: string) => {
    await HttpService.delete(`${url}/${id}`);
  }),
}

export default AssetsAsync;
