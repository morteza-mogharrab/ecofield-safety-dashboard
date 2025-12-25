import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container, Grid, Box } from '@mui/material';
import Header from './components/Header';
import RiskCard from './components/RiskCard';
import CurrentConditions from './components/CurrentConditions';
import ComplianceGrid from './components/ComplianceGrid';
import TrendChart from './components/TrendChart';
import AdvisorPanel from './components/AdvisorPanel';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import { CITIES } from './constants';
import { City, DashboardData, CurrentData, ForecastData } from './types';
import { openWeatherService } from './api/openWeatherService';
import {
  calculateRiskScore,
  checkCompliance,
  getSmartRecommendation,
  getRiskLevel,
} from './utils/riskCalculations';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4B533C', // Primary Dark (Brand Anchor)
      light: '#7CAB48', // Status: SAFE
      dark: '#2E3326', // Primary Body Text
    },
    secondary: {
      main: '#B3B076', // Brand Gold
      light: '#D4AF37', // Warning Yellow
      dark: '#C25B52', // Danger Red
    },
    background: {
      default: '#F4F6F1', // Dashboard Background
      paper: '#FFFFFF', // Card/Container Background
    },
    text: {
      primary: '#2E3326', // Primary Body Text
      secondary: '#767D6F', // Secondary/Label Text
    },
    divider: '#E0E5DC', // Borders/Dividers
    success: {
      main: '#7CAB48', // Status: SAFE
    },
    warning: {
      main: '#D4AF37', // Status: WARNING
    },
    error: {
      main: '#C25B52', // Status: DANGER
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 700,
      letterSpacing: '0.5px',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

function App() {
  const [selectedCity, setSelectedCity] = useState<City>(CITIES[0]);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (city: City) => {
    setLoading(true);
    setError(null);

    try {
      // Fetch all 4 APIs in parallel
      const [currentWeather, currentPollution, pollutionForecast, weatherForecast] =
        await Promise.all([
          openWeatherService.getCurrentWeather(city.lat, city.lon),
          openWeatherService.getCurrentPollution(city.lat, city.lon),
          openWeatherService.getPollutionForecast(city.lat, city.lon),
          openWeatherService.getWeatherForecast(city.lat, city.lon),
        ]);

      // Process current data
      const currentPollutionData = currentPollution.list[0];
      const currentData: CurrentData = {
        temperature: currentWeather.main.temp,
        windSpeed: currentWeather.wind.speed,
        humidity: currentWeather.main.humidity,
        description: currentWeather.weather[0].description,
        icon: currentWeather.weather[0].icon,
        aqi: currentPollutionData.main.aqi,
        pollutants: {
          pm2_5: currentPollutionData.components.pm2_5,
          no2: currentPollutionData.components.no2,
          o3: currentPollutionData.components.o3,
          co: currentPollutionData.components.co,
          so2: currentPollutionData.components.so2,
        },
      };

      // Calculate ERS
      const ers = calculateRiskScore(currentData.pollutants);

      // Check compliance
      const compliance = checkCompliance(currentData.pollutants);

      // Process forecast data (combine pollution and weather forecasts)
      const forecastData: ForecastData[] = pollutionForecast.list.map((pollItem, index) => {
        // Find corresponding weather forecast (matching by index approximation)
        const weatherItem = weatherForecast.list[index] || weatherForecast.list[0];

        const pollutants = {
          pm2_5: pollItem.components.pm2_5,
          no2: pollItem.components.no2,
          o3: pollItem.components.o3,
          co: pollItem.components.co,
          so2: pollItem.components.so2,
        };

        return {
          time: new Date(pollItem.dt * 1000).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          timestamp: pollItem.dt,
          pm2_5: pollItem.components.pm2_5,
          no2: pollItem.components.no2,
          o3: pollItem.components.o3,
          ers: calculateRiskScore(pollutants),
          windSpeed: weatherItem.wind.speed,
          aqi: pollItem.main.aqi,
        };
      });

      // Generate recommendation
      const recommendation = getSmartRecommendation(
        ers,
        forecastData,
        currentData.windSpeed
      );

      const riskLevel = getRiskLevel(ers);

      setDashboardData({
        current: currentData,
        forecast: forecastData,
        compliance,
        ers,
        recommendation,
        riskLevel,
      });
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(
        'Failed to fetch environmental data. Please check your internet connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(selectedCity);
  }, [selectedCity]);

  const handleCityChange = (city: City) => {
    setSelectedCity(city);
  };

  const handleRetry = () => {
    fetchData(selectedCity);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header
          cities={CITIES}
          selectedCity={selectedCity}
          onCityChange={handleCityChange}
          loading={loading}
        />

        <Container maxWidth="xl" sx={{ flexGrow: 1, py: 4 }}>
          {loading && <LoadingState />}

          {error && <ErrorState error={error} onRetry={handleRetry} />}

          {!loading && !error && dashboardData && (
            <Grid container spacing={3}>
              {/* Row 1: Risk Score and Current Conditions */}
              <Grid item xs={12} md={6}>
                <RiskCard ers={dashboardData.ers} />
              </Grid>
              <Grid item xs={12} md={6}>
                <CurrentConditions data={dashboardData.current} />
              </Grid>

              {/* Row 2: Advisor Panel (Operation Recommendation) */}
              <Grid item xs={12}>
                <AdvisorPanel
                  recommendation={dashboardData.recommendation}
                  riskLevel={dashboardData.riskLevel}
                />
              </Grid>

              {/* Row 3: Compliance Grid and Trend Chart (Side by Side) */}
              <Grid item xs={12} md={5}>
                <ComplianceGrid compliance={dashboardData.compliance} />
              </Grid>
              <Grid item xs={12} md={7}>
                <TrendChart forecast={dashboardData.forecast} />
              </Grid>
            </Grid>
          )}
        </Container>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            backgroundColor: '#4B533C',
            color: '#FFFFFF',
            py: 3,
            px: 4,
            mt: 'auto',
          }}
        >
          <Container maxWidth="xl">
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2,
              }}
            >
              <Box sx={{ fontSize: '13px' }}>
                © {new Date().getFullYear()} Corvus Consulting - EcoField Safety Dashboard
              </Box>
              <Box sx={{ fontSize: '13px', color: '#B3B076' }}>
                Data provided by OpenWeatherMap API
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;