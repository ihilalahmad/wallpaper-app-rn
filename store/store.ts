import { configureStore } from '@reduxjs/toolkit';
import reducers from './root_reducer';
import { wallpapersApi } from './apis/wallpaperApis';

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([wallpapersApi.middleware]),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
