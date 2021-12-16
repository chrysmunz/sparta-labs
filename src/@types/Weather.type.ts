type Weathers = {
  description: string,
  icon: string,
  id: number,
  main: string
};

interface Weather {
  id: number,
  base: string,
  clouds: {
    all: number
  },
  cod: number,
  coord: {
    lat: number,
    lon: number
  },
  dt: number,
  main: {
    feels_like: number,
    grnd_level: number,
    humidity: number,
    pressure: number,
    sea_level: number,
    temp: number,
    max: number,
    min: number
  },
  name: string,
  sys: {
    country: string,
    sunrise: number,
    sunset: number
  },
  timezone: number,
  visibility: number,
  weather: Weathers[],
  wind: {
    deg: number,
    gust: number,
    speed: number
  }
}

export default Weather;
