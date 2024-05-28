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
        // Faire une requête GET à l'API météo avec la ville fournie
        const response: AxiosResponse<CurrentWeatherResponse> = await axios.get(`${BASE_URL}/current.json`, {
            params: {
                key: API_KEY,
                q: city
            }
        });

        console.log(response.data)

        // Filtrer les données pour ne retourner que les données pertinentes
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

        // Retourner les données filtrées
        return filteredResponse;
    } catch (error) {
        // Gérer les erreurs
        console.error('Error fetching weather data:', error);
        throw error;
    }
  }
}

export default WeatherApi;
