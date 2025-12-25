import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Line,
  ComposedChart,
} from 'recharts';
import { ForecastData } from '../types';
import { formatTime } from '../utils/riskCalculations';

interface TrendChartProps {
  forecast: ForecastData[];
}

const TrendChart: React.FC<TrendChartProps> = ({ forecast }) => {
  // Prepare data for chart (next 24 hours)
  const chartData = forecast.slice(0, 8).map((item) => ({
    time: formatTime(item.timestamp),
    PM2_5: item.pm2_5,
    NO2: item.no2,
    O3: item.o3,
    ERS: item.ers,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            backgroundColor: '#FFFFFF', // Card Background
            p: 1.5,
            border: '1px solid #E0E5DC', // Borders
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <Typography
            sx={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#2E3326', // Primary Text
              mb: 1,
            }}
          >
            {payload[0].payload.time}
          </Typography>
          {payload.map((entry: any, index: number) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mt: 0.5,
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  backgroundColor: entry.color,
                  borderRadius: '50%',
                }}
              />
              <Typography
                sx={{
                  fontSize: '11px',
                  color: '#767D6F', // Secondary Text
                }}
              >
                {entry.name}: <strong style={{ color: '#2E3326' }}>{entry.value.toFixed(2)}</strong>
              </Typography>
            </Box>
          ))}
        </Box>
      );
    }
    return null;
  };

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
          24-HOUR POLLUTION TREND & ERS FORECAST
        </Typography>

        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={chartData}>
            <defs>
              <linearGradient id="colorPM25" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5E8C99" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#5E8C99" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorNO2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorO3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C25B52" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#C25B52" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#E0E5DC" // Borders
              strokeOpacity={0.5}
            />
            <XAxis
              dataKey="time"
              tick={{ 
                fill: '#767D6F', // Secondary Text
                fontSize: 11,
                fontWeight: 500,
              }}
              stroke="#E0E5DC" // Borders
            />
            <YAxis
              tick={{ 
                fill: '#767D6F', // Secondary Text
                fontSize: 11,
                fontWeight: 500,
              }}
              stroke="#E0E5DC" // Borders
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{
                fontSize: '12px',
                color: '#767D6F', // Secondary Text
                fontWeight: 500,
              }}
              iconType="circle"
            />
            <Area
              type="monotone"
              dataKey="PM2_5"
              stroke="#5E8C99" // Data V1 (Muted Teal)
              fillOpacity={1}
              fill="url(#colorPM25)"
              strokeWidth={2}
              name="PM2.5"
            />
            <Area
              type="monotone"
              dataKey="NO2"
              stroke="#D4AF37" // Data V2 (Warning Yellow)
              fillOpacity={1}
              fill="url(#colorNO2)"
              strokeWidth={2}
              name="NO2"
            />
            <Area
              type="monotone"
              dataKey="O3"
              stroke="#C25B52" // Data V3 (Danger Red)
              fillOpacity={1}
              fill="url(#colorO3)"
              strokeWidth={2}
              name="O3"
            />
            <Line
              type="monotone"
              dataKey="ERS"
              stroke="#4B533C" // Primary Dark (for main score line)
              strokeWidth={3}
              dot={{ 
                fill: '#4B533C', 
                r: 4,
                strokeWidth: 2,
                stroke: '#FFFFFF',
              }}
              name="ERS Score"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TrendChart;