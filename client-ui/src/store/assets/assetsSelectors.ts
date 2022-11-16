import { RootState } from "store";

export const selectFile = (state: RootState) => state.assets.files;
export const selectAssets = (state: RootState) => state.assets.assets;
export const selectAssetsIdsToDelete = (state: RootState) => state.assets.assetsIdsToDelete;
