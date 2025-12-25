import axios from 'axios';
import { API_KEY, API_BASE_URL } from '../constants';
import {
  CurrentWeatherResponse,
  AirPollutionResponse,
  WeatherForecastResponse,
} from '../types';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const openWeatherService = {
  // 1. Current Weather
  async getCurrentWeather(lat: number, lon: number): Promise<CurrentWeatherResponse> {
    const response = await api.get<CurrentWeatherResponse>(
      `/data/2.5/weather`,
      {
        params: {
          lat,
          lon,
          units: 'metric',
          appid: API_KEY,
        },
      }
    );
    return response.data;
  },

  // 2. Current Air Pollution
  async getCurrentPollution(lat: number, lon: number): Promise<AirPollutionResponse> {
    const response = await api.get<AirPollutionResponse>(
      `/data/2.5/air_pollution`,
      {
        params: {
          lat,
          lon,
          appid: API_KEY,
        },
      }
    );
    return response.data;
  },

  // 3. Air Pollution Forecast
  async getPollutionForecast(lat: number, lon: number): Promise<AirPollutionResponse> {
    const response = await api.get<AirPollutionResponse>(
      `/data/2.5/air_pollution/forecast`,
      {
        params: {
          lat,
          lon,
          appid: API_KEY,
        },
      }
    );
    return response.data;
  },

  // 4. 5-Day Weather Forecast
  async getWeatherForecast(lat: number, lon: number): Promise<WeatherForecastResponse> {
    const response = await api.get<WeatherForecastResponse>(
      `/data/2.5/forecast`,
      {
        params: {
          lat,
          lon,
          units: 'metric',
          appid: API_KEY,
        },
      }
    );
    return response.data;
  },
};