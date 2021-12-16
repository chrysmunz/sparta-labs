import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '.';
import { City, Weather } from '../@types';
import { API_KEY, CNT } from '../config/constants';
import api from '../services/api';

type WeatherSlice = {
  city: City;
  weather: Weather[];
  errorMessage: string;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
};

const getCity = createAsyncThunk(
  'Weather/getCity',
  async (params: { city?: string }, thunkAPI) => {
    const { city } = params;

    try {
      const { data } = await api.get(`weather?q=${city}&appid=${API_KEY}`);

      return { city: data };
    } catch (e: any) {
      console.log(e);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

const getWeather = createAsyncThunk(
  'Weather/getWeather',
  async (params: { city?: string }, thunkAPI) => {
    const { city } = params;

    try {
      const { data } = await api.get(`forecast?q=${city}&cnt=${CNT}&appid=${API_KEY}`);

      return { weather: data.list };
    } catch (e: any) {
      console.log(e);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

const weatherSlice = createSlice({
  name: 'WeatherType',
  initialState: {
    city: null,
    weather: [],
    errorMessage: '',
    isFetching: false,
    isSuccess: false,
    isError: false
  } as WeatherSlice,
  reducers: {},
  extraReducers: {
    [getCity.pending]: (state: WeatherSlice) => {
      state.isFetching = true;
    },
    [getCity.fulfilled]: (state: WeatherSlice, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.city = payload.city;
    },
    [getCity.rejected]: (state: WeatherSlice, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [getWeather.pending]: (state: WeatherSlice) => {
      state.isFetching = true;
    },
    [getWeather.fulfilled]: (state: WeatherSlice, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.weather = payload.weather;
    },
    [getWeather.rejected]: (state: WeatherSlice, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    }
  }
});

const selectWeather = (state: RootState): WeatherSlice => state.weather;

export { getCity, getWeather, selectWeather };
export default weatherSlice.reducer;
