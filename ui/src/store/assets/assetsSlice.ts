import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IAsset from 'models/Asset';
import IFile from 'models/File';
import { v4 as uuid } from 'uuid';
import AssetsAsync from './assetsAsync';

interface IState {
  files: IFile[],
  assets: IAsset[],
  assetsIdsToDelete: string[],
}

const initialState: IState = {
  files: [],
  assets: [],
  assetsIdsToDelete: [],
};

const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    setFiles: (state: IState, action: PayloadAction<FileList>) => {
      const nextFiles: IFile[] = Array.from(action.payload).map((file:File) => ({
        key: uuid(),
        file,
      }));
      state.files = nextFiles;
    },
    setInitialReducer: (state) => {
      state.files = initialState['files'];
      state.assets = initialState['assets'];
      state.assetsIdsToDelete = initialState['assetsIdsToDelete'];
    },
    addAsset: (state: IState, action: PayloadAction<IAsset[]>) => {
      state.assets = action.payload;
    },
    deleteFile: (state: IState, action: PayloadAction<string>) => {
      state.files = state.files.filter((file: IFile) => file.key !== action.payload);
    },
    addAssetIdToDelete: (state: IState, action: PayloadAction<string>) => {
      state.assetsIdsToDelete = [...state.assetsIdsToDelete, action.payload]
    },
    removeAssetIdToDelete: (state: IState, action: PayloadAction<string>) => {
      state.assetsIdsToDelete = state.assetsIdsToDelete.filter((assetId: string) => assetId !== action.payload)
    },
  }
});

export const assetsActions = assetsSlice.actions;
export default assetsSlice.reducer;
