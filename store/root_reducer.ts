import { combineReducers } from '@reduxjs/toolkit';
import { wallpapersApi } from './apis/wallpaperApis';
import wallpaperReducer from './slices/wallpaperSlice';

const reducers = combineReducers({
  wallpapersData: wallpaperReducer,
  [wallpapersApi.reducerPath]: wallpapersApi.reducer,
});

export default reducers;
