import { IWallpapersResponse } from '@/api/response_types/Wallpapers';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const wallpapersDataInitialState: IWallpapersResponse = {
  total: 0,
  totalHits: 0,
  hits: [],
};

export const wallpapersDataSlice = createSlice({
  name: 'wallpapersDataSlice',
  initialState: wallpapersDataInitialState,
  reducers: {
    addWallpapersData: (state, action: PayloadAction<IWallpapersResponse>) => {
      const payloadData = action.payload;
      state.total = payloadData.total;
      state.totalHits = payloadData.totalHits;
      state.hits = payloadData.hits;
    },
  },
});

export const { addWallpapersData } = wallpapersDataSlice.actions;
export default wallpapersDataSlice.reducer;
