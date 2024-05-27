import axios, { AxiosResponse } from 'axios';

const API_KEY = 'c9e4b7d7c0d84ff885d72258242705';
const BASE_URL = 'http://api.weatherapi.com/v1';

interface SearchResult {
  id: number;
  name: string;
  country: string;
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
  }
  
}

export default WeatherApi;
