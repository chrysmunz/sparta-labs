import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '.';
import { City, Forecast, Weather } from '../@types';
import { API_KEY, CNT } from '../config/constants';
import api from '../services/api';

type WeatherSlice = {
  city: City;
  weather: Weather;
  forecast: Forecast[]
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

const getForecast = createAsyncThunk(
  'Weather/getForecast',
  async (params: { city?: string }, thunkAPI) => {
    const { city } = params;

    try {
      const { data } = await api.get(`forecast?q=${city}&cnt=${CNT}&appid=${API_KEY}`);

      return { forecast: data.list };
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
    weather: null,
    forecast: [],
    errorMessage: '',
    isFetching: false,
    isSuccess: false,
    isError: false
  } as WeatherSlice,
  reducers: {
    clearState: (state: WeatherSlice) => {
      state.city = null;
    }
  },
  extraReducers: {
    [getCity.pending]: (state: WeatherSlice) => {
      state.isFetching = true;
    },
    [getCity.fulfilled]: (state: WeatherSlice, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.city = { id: payload.city.id, name: payload.city.name};
    },
    [getCity.rejected]: (state: WeatherSlice, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [getForecast.pending]: (state: WeatherSlice) => {
      state.isFetching = true;
    },
    [getForecast.fulfilled]: (state: WeatherSlice, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.forecast = payload.forecast;
    },
    [getForecast.rejected]: (state: WeatherSlice, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    }
  }
});

export const { clearState } = weatherSlice.actions;

const selectWeather = (state: RootState): WeatherSlice => state.weather;

export { getCity, getForecast, selectWeather };
export default weatherSlice.reducer;
