import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { getRiskLevel } from '../utils/riskCalculations';
import { TrendingUp, TrendingDown, TrendingFlat } from '@mui/icons-material';

interface RiskCardProps {
  ers: number;
  trend?: 'up' | 'down' | 'stable';
}

const RiskCard: React.FC<RiskCardProps> = ({ ers, trend = 'stable' }) => {
  const riskLevel = getRiskLevel(ers);
  
  // Corvus color mapping
  const riskColors = {
    low: '#7CAB48',      // Status: SAFE
    moderate: '#D4AF37', // Status: WARNING
    high: '#C25B52',     // Status: DANGER
  };
  
  const color = riskColors[riskLevel];

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : TrendingFlat;

  const labels = {
    low: 'LOW RISK',
    moderate: 'MODERATE RISK',
    high: 'HIGH RISK',
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 700,
              color: '#4B533C', // Primary Dark
              letterSpacing: '0.5px',
            }}
          >
            ENVIRONMENTAL RISK SCORE
          </Typography>
          <TrendIcon sx={{ color: '#767D6F' }} /> {/* Secondary Text */}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, mb: 2.5 }}>
          <Typography
            sx={{
              fontSize: '72px',
              fontWeight: 700,
              color: color,
              lineHeight: 1,
            }}
          >
            {ers}
          </Typography>
          <Typography
            sx={{
              fontSize: '24px',
              color: '#767D6F', // Secondary Text
              fontWeight: 500,
            }}
          >
            /100
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Box
            sx={{
              display: 'inline-block',
              backgroundColor: color,
              color: '#FFFFFF',
              px: 2.5,
              py: 1,
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.5px',
            }}
          >
            {labels[riskLevel]}
          </Box>
        </Box>

        {/* Progress Bar */}
        <Box
          sx={{
            position: 'relative',
            height: 8,
            backgroundColor: '#E0E5DC', // Borders
            borderRadius: 1,
            mb: 1.5,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: `${ers}%`,
              backgroundColor: color,
              borderRadius: 1,
              transition: 'width 0.5s ease',
            }}
          />
        </Box>

        {/* Scale Labels */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {[0, 30, 60, 100].map((value) => (
            <Typography
              key={value}
              sx={{
                fontSize: '11px',
                color: '#767D6F', // Secondary Text
                fontWeight: 600,
              }}
            >
              {value}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default RiskCard;