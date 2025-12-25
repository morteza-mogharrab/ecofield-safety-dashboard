import { City } from './types';

// Hardcoded cities with coordinates
export const CITIES: City[] = [
  {
    name: 'Calgary',
    lat: 51.0447,
    lon: -114.0719,
    country: 'CA',
    state: 'Alberta'
  },
  {
    name: 'Edmonton',
    lat: 53.5461,
    lon: -113.4938,
    country: 'CA',
    state: 'Alberta'
  },
  {
    name: 'Vancouver',
    lat: 49.2827,
    lon: -123.1207,
    country: 'CA',
    state: 'British Columbia'
  },
  {
    name: 'Toronto',
    lat: 43.6532,
    lon: -79.3832,
    country: 'CA',
    state: 'Ontario'
  },
  {
    name: 'Montreal',
    lat: 45.5017,
    lon: -73.5673,
    country: 'CA',
    state: 'Quebec'
  }
];

// CAAQS and WHO Regulatory Limits (µg/m³)
export const REGULATORY_LIMITS = {
  pm2_5: {
    limit: 25, // WHO 24-hour guideline
    unit: 'µg/m³',
    name: 'PM2.5'
  },
  no2: {
    limit: 200, // WHO 1-hour guideline
    unit: 'µg/m³',
    name: 'NO₂'
  },
  o3: {
    limit: 100, // WHO 8-hour guideline
    unit: 'µg/m³',
    name: 'O₃'
  },
  co: {
    limit: 4000, // WHO 8-hour guideline (4 mg/m³ = 4000 µg/m³)
    unit: 'µg/m³',
    name: 'CO'
  },
  so2: {
    limit: 500, // WHO 10-minute guideline
    unit: 'µg/m³',
    name: 'SO₂'
  }
};

// API Configuration
export const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
export const API_BASE_URL = 'https://api.openweathermap.org';

// Risk Score Weights
export const RISK_WEIGHTS = {
  pm2_5: 0.35,
  no2: 0.25,
  o3: 0.25,
  co: 0.10,
  so2: 0.05
};

// Wind speed thresholds for dispersion (m/s)
export const WIND_THRESHOLDS = {
  low: 2,     // Poor dispersion
  medium: 4,  // Moderate dispersion
  high: 6     // Good dispersion
};