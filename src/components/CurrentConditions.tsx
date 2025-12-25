import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { CurrentData } from '../types';
import {
  Thermostat,
  Air,
  Water,
  Visibility,
} from '@mui/icons-material';
import { getAQIDescription } from '../utils/riskCalculations';

interface CurrentConditionsProps {
  data: CurrentData;
}

const CurrentConditions: React.FC<CurrentConditionsProps> = ({ data }) => {
  const aqiColors = [
    '#7CAB48', // 1 - Good (SAFE)
    '#7CAB48', // 2 - Fair (SAFE)
    '#D4AF37', // 3 - Moderate (WARNING)
    '#C25B52', // 4 - Poor (DANGER)
    '#C25B52'  // 5 - Very Poor (DANGER)
  ];
  const aqiColor = aqiColors[data.aqi - 1] || '#767D6F';

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 4 }}>
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#4B533C', // Primary Dark
            letterSpacing: '0.5px',
            mb: 3,
          }}
        >
          CURRENT CONDITIONS
        </Typography>

        <Grid container spacing={3}>
          {/* Temperature */}
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center' }}>
              <Thermostat 
                sx={{ 
                  fontSize: 32, 
                  color: '#B3B076', // Brand Gold
                  mb: 1.5 
                }} 
              />
              <Typography
                sx={{
                  fontSize: '28px',
                  fontWeight: 700,
                  color: '#2E3326', // Primary Text
                  mb: 0.5,
                }}
              >
                {data.temperature.toFixed(1)}°C
              </Typography>
              <Typography
                sx={{
                  fontSize: '12px',
                  color: '#767D6F', // Secondary Text
                  fontWeight: 500,
                }}
              >
                Temperature
              </Typography>
            </Box>
          </Grid>

          {/* Wind Speed */}
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center' }}>
              <Air 
                sx={{ 
                  fontSize: 32, 
                  color: '#B3B076', // Brand Gold
                  mb: 1.5 
                }} 
              />
              <Typography
                sx={{
                  fontSize: '28px',
                  fontWeight: 700,
                  color: '#2E3326', // Primary Text
                  mb: 0.5,
                }}
              >
                {data.windSpeed.toFixed(1)}
              </Typography>
              <Typography
                sx={{
                  fontSize: '12px',
                  color: '#767D6F', // Secondary Text
                  fontWeight: 500,
                }}
              >
                Wind (m/s)
              </Typography>
            </Box>
          </Grid>

          {/* Humidity */}
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center' }}>
              <Water 
                sx={{ 
                  fontSize: 32, 
                  color: '#B3B076', // Brand Gold
                  mb: 1.5 
                }} 
              />
              <Typography
                sx={{
                  fontSize: '28px',
                  fontWeight: 700,
                  color: '#2E3326', // Primary Text
                  mb: 0.5,
                }}
              >
                {data.humidity}%
              </Typography>
              <Typography
                sx={{
                  fontSize: '12px',
                  color: '#767D6F', // Secondary Text
                  fontWeight: 500,
                }}
              >
                Humidity
              </Typography>
            </Box>
          </Grid>

          {/* AQI */}
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center' }}>
              <Visibility 
                sx={{ 
                  fontSize: 32, 
                  color: '#B3B076', // Brand Gold
                  mb: 1.5 
                }} 
              />
              <Typography
                sx={{
                  fontSize: '28px',
                  fontWeight: 700,
                  color: aqiColor,
                  mb: 0.5,
                }}
              >
                {data.aqi}
              </Typography>
              <Typography
                sx={{
                  fontSize: '12px',
                  color: '#767D6F', // Secondary Text
                  fontWeight: 500,
                }}
              >
                {getAQIDescription(data.aqi)}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Weather Description */}
        <Box
          sx={{
            mt: 3,
            p: 2,
            backgroundColor: '#F4F6F1', // Dashboard Background
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <Visibility sx={{ fontSize: 18, color: '#B3B076' }} />
            <Typography
              sx={{
                fontSize: '14px',
                color: '#2E3326', // Primary Text
                fontWeight: 500,
                textTransform: 'capitalize',
              }}
            >
              {data.description}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CurrentConditions;