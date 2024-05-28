import axios, { AxiosResponse } from 'axios';

const API_KEY = 'c9e4b7d7c0d84ff885d72258242705';
const BASE_URL = 'http://api.weatherapi.com/v1';

interface SearchResult {
  id: number;
  name: string;
  country: string;
}

export interface CurrentWeatherResponse {
  location: {
    name: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    is_day: number;
    wind_kph: number;
    cloud: number;
    gust_kph: number;
  };
}

export interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    daily_chance_of_rain: number;
    maxwind_kph: number;
    condition: {
      text: string;
      icon: string;
    };
  };
  astro: {
    sunset: string;
  };
}

interface ForecastResponse {
  forecast: {
    forecastday: ForecastDay[];
  }
}


const WeatherApi = {

  search: async (city: string): Promise<SearchResult[]> => {
    try {
      const response: AxiosResponse<SearchResult[]> = await axios.get(`${BASE_URL}/search.json`, {
        params: {
          key: API_KEY,
          q: city
        }
      });
  
      const filteredResults: SearchResult[] = response.data.map(({ id, name, country }) => ({ id, name, country }));
  
      return filteredResults;
    } catch (error) {
      console.error('Error searching weather data:', error);
      throw error;
    }
  },

  getCurrentWeather: async (city: string): Promise<CurrentWeatherResponse> => {
    try {
        const response: AxiosResponse<CurrentWeatherResponse> = await axios.get(`${BASE_URL}/current.json`, {
            params: {
                key: API_KEY,
                q: city
            }
        });

        const filteredResponse: CurrentWeatherResponse = {
            location: {
                name: response.data.location.name,
                localtime: response.data.location.localtime
            },
            current: {
                temp_c: response.data.current.temp_c,
                condition: {
                    text: response.data.current.condition.text,
                    icon: response.data.current.condition.icon
                },
                is_day: response.data.current.is_day,
                wind_kph: response.data.current.wind_kph,
                cloud: response.data.current.cloud,
                gust_kph: response.data.current.gust_kph
            }
        };

        return filteredResponse;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
  },

  getForecast: async (city: string) => {
    try {
      const response: AxiosResponse<ForecastResponse> = await axios.get(`${BASE_URL}/forecast.json`, {
        params: {
          key: API_KEY,
          q: city,
          days: 5
        }
      });

      const filteredData = response.data.forecast.forecastday.map(forecast => ({
        date: forecast.date,
        maxtemp_c: forecast.day.maxtemp_c,
        mintemp_c: forecast.day.mintemp_c,
        daily_chance_of_rain: forecast.day.daily_chance_of_rain,
        maxwind_kph: forecast.day.maxwind_kph,
        condition_text: forecast.day.condition.text,
        condition_icon: forecast.day.condition.icon,
        sunset: forecast.astro.sunset
      }));

      return filteredData;
    } catch (error) {
      console.error('Error fetching weather forecast data:', error);
      throw error;
    }
  }  
}

export default WeatherApi;
