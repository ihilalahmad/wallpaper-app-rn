import { IWallpapersResponse } from '@/api/response_types/Wallpapers';
import Config from '@/constants/Config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const wallpapersApi = createApi({
  reducerPath: 'wallpaperApi',
  baseQuery: fetchBaseQuery({ baseUrl: Config.baseUrl }),
  endpoints: (builder) => ({
    getAllWallpapers: builder.query<IWallpapersResponse, number>({
      query: (pageNumber) => ({
        url: `&page=${pageNumber}`,
        method: 'GET',
      }),
    }),
    searchWallpaper: builder.query<IWallpapersResponse, string>({
      query: (searchQuery) => ({
        url: `&q=${searchQuery}`,
        method: 'GET',
      }),
    }),
    getCategoryWallpaper: builder.query<IWallpapersResponse, string>({
      query: (category) => ({
        url: `&category=${category}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetAllWallpapersQuery,
  useSearchWallpaperQuery,
  useGetCategoryWallpaperQuery,
} = wallpapersApi;
