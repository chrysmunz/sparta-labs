import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit';

import weatherReducer from './Weather.store';

const store = configureStore({
  reducer: {
    weather: weatherReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
