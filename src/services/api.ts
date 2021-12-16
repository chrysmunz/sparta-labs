import axios from 'axios';

import { API_KEY } from '../config/constants';

const api = axios.create({
  baseURL: 'http://api.openweathermap.org/data/2.5/',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getCurrentWeather = async (city) => {
	return await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
		.then(response => {
			return response.data;
		})
		.catch(error => {
			return error;
		});
}

export default api;
