import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit';

import citiesReducer from './Cities.store';
import weatherReducer from './Weather.store';

const store = configureStore({
  reducer: {
    cities: citiesReducer,
    weather: weatherReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
