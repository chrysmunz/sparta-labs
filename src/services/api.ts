import axios from 'axios';

import { API_KEY } from '../config/constants';

const api = axios.create({
	baseURL: 'http://api.openweathermap.org/data/2.5/',
	headers: {
		'Content-Type': 'application/json'
	}
});

export const getCurrentWeather = async ({ lat, lon }) => {
	return await axios.get(`http://api.openweathermap.org/data/2.5/onecall?
		lang=pt
		&units=metric
		&lat=${lat}
		&lon=${lon}
		&exclude=minutely,hourly,alerts
		&appid=${API_KEY}`)
		.then(response => {
			return response.data;
		})
		.catch(error => {
			return error;
		});
}

export default api;
