// City Interface
export interface City {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

// Current Weather API Response
export interface CurrentWeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  name: string;
}

// Air Pollution API Response
export interface AirPollutionResponse {
  coord: {
    lon: number;
    lat: number;
  };
  list: Array<{
    main: {
      aqi: number;
    };
    components: {
      co: number;
      no: number;
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number;
      pm10: number;
      nh3: number;
    };
    dt: number;
  }>;
}

// Weather Forecast API Response
export interface WeatherForecastResponse {
  cod: string;
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      pressure: number;
      humidity: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
      deg: number;
    };
    dt_txt: string;
  }>;
}

// Processed Data Interfaces
export interface CurrentData {
  temperature: number;
  windSpeed: number;
  humidity: number;
  description: string;
  icon: string;
  aqi: number;
  pollutants: {
    pm2_5: number;
    no2: number;
    o3: number;
    co: number;
    so2: number;
  };
}

export interface ForecastData {
  time: string;
  timestamp: number;
  pm2_5: number;
  no2: number;
  o3: number;
  ers: number;
  windSpeed: number;
  aqi: number;
}

export interface ComplianceStatus {
  pollutant: string;
  current: number;
  limit: number;
  percentage: number;
  status: 'safe' | 'warning' | 'danger';
  unit: string;
}

export interface DashboardData {
  current: CurrentData;
  forecast: ForecastData[];
  compliance: ComplianceStatus[];
  ers: number;
  recommendation: string;
  riskLevel: 'low' | 'moderate' | 'high';
}