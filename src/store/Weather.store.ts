import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '.';
import { Weather } from '../@types';
import { API_KEY } from '../config/constants';
import api from '../services/api';

type WeatherSlice = {
  weather: Weather;
  errorMessage: string;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
};

const getWeather = createAsyncThunk(
  'Weather/getWeather',
  async (params: { city?: string }, thunkAPI) => {
    const { city } = params;

    try {
      const { data } = await api.get(`weather?q=${city}&appid=${API_KEY}`);

      return { weather: data };
    } catch (e: any) {
      console.log(e);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

const weatherSlice = createSlice({
  name: 'WeatherType',
  initialState: {
    weather: null,
    errorMessage: '',
    isFetching: false,
    isSuccess: false,
    isError: false
  } as WeatherSlice,
  reducers: {},
  extraReducers: {
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

export { getWeather, selectWeather };
export default weatherSlice.reducer;
