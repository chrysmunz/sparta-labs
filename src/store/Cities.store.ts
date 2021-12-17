import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RootState } from '.';

type City = {
  id: number,
  name: string,
  lat: number,
  lon: number;
  fav: boolean
}

type CitiesSlice = {
  cities: City[];
};

const cartSlice = createSlice({
  name: 'Cities',
  initialState: {
    cities: [],
  } as CitiesSlice,
  reducers: {
    clearState: (state: CitiesSlice) => {
      state.cities = [];
      AsyncStorage.setItem('@cart', null);
    },
    setCities: (state: CitiesSlice, { payload }) => {
      state.cities = payload;
    },
    add: (state: CitiesSlice, { payload }) => {
      const existing = state.cities.filter(item => item.id === payload.city.id);

      if (existing.length === 0) {
        state.cities = [...state.cities, {
          id: payload.city.id,
          name: payload.city.name,
          lat: payload.city.lat,
          lon: payload.city.lon,
          fav: false
        }];
      }

      AsyncStorage.setItem('@cities', JSON.stringify(state.cities));
    },
    remove: (state: CitiesSlice, { payload }) => {
      const newState = state.cities.filter(item => item.id !== payload.id);
      state.cities = newState;

      AsyncStorage.setItem('@cities', JSON.stringify(state.cities));
    },
    fav: (state: CitiesSlice, { payload }) => {
      const index = state.cities.map(item => { return item.id; }).indexOf(payload.city.id);
      state.cities[index].fav = !state.cities[index].fav;
    },
  },
  extraReducers: {}
});

export const { add, remove, clearState, setCities, fav } = cartSlice.actions;

const selectCities = (state: RootState): CitiesSlice => state.cities;

export { selectCities };
export default cartSlice.reducer;
