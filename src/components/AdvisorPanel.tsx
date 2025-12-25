import React from 'react';
import { Card, CardContent, Typography, Box, Alert } from '@mui/material';
import {
  CheckCircle,
  Warning,
  Error
} from '@mui/icons-material';

interface AdvisorPanelProps {
  recommendation: string;
  riskLevel: 'low' | 'moderate' | 'high';
}

const AdvisorPanel: React.FC<AdvisorPanelProps> = ({
  recommendation,
  riskLevel,
}) => {
  const getIcon = () => {
    switch (riskLevel) {
      case 'low':
        return <CheckCircle sx={{ fontSize: 24 }} />;
      case 'moderate':
        return <Warning sx={{ fontSize: 24 }} />;
      case 'high':
        return <Error sx={{ fontSize: 24 }} />;
    }
  };

  const getSeverity = (): 'success' | 'warning' | 'error' => {
    switch (riskLevel) {
      case 'low':
        return 'success';
      case 'moderate':
        return 'warning';
      case 'high':
        return 'error';
    }
  };

  const getDecision = () => {
    if (recommendation.includes('UNSAFE') || recommendation.includes('NOT recommended')) {
      return 'NO-GO';
    }
    if (recommendation.includes('CAUTION') || recommendation.includes('WAIT')) {
      return 'CONDITIONAL';
    }
    return 'GO';
  };

  const decision = getDecision();
  const decisionColors = {
    GO: '#7CAB48',      // Status: SAFE
    CONDITIONAL: '#D4AF37', // Status: WARNING
    'NO-GO': '#C25B52', // Status: DANGER
  };

  const decisionColor = decisionColors[decision];

  return (
    <Card>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          {React.cloneElement(getIcon(), { sx: { color: decisionColor } })}
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 700,
              color: '#4B533C', // Primary Dark
              letterSpacing: '0.5px',
            }}
          >
            OPERATION RECOMMENDATION
          </Typography>
        </Box>

        {/* Decision Badge */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.5,
              backgroundColor: `${decisionColor}15`,
              px: 4,
              py: 2,
              borderRadius: '12px',
              border: `2px solid ${decisionColor}`,
            }}
          >
            {React.cloneElement(getIcon(), { 
              sx: { 
                fontSize: 32, 
                color: decisionColor 
              } 
            })}
            <Typography
              sx={{
                fontSize: '32px',
                fontWeight: 700,
                color: decisionColor,
                letterSpacing: '1px',
              }}
            >
              {decision}
            </Typography>
          </Box>
        </Box>

        {/* Recommendation Alert */}
        <Alert
          severity={getSeverity()}
          sx={{
            mb: 2.5,
            backgroundColor: `${decisionColor}08`,
            borderLeft: `4px solid ${decisionColor}`,
            '& .MuiAlert-icon': {
              color: decisionColor,
            },
            '& .MuiAlert-message': {
              color: '#2E3326', // Primary Text
              fontSize: '15px',
              lineHeight: 1.6,
              fontWeight: 500,
            },
          }}
        >
          {recommendation}
        </Alert>

        {/* Additional Info */}
        <Box
          sx={{
            p: 2,
            backgroundColor: '#F4F6F1', // Dashboard Background
            borderRadius: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: '12px',
              color: '#767D6F', // Secondary Text
              lineHeight: 1.5,
              fontStyle: 'italic',
            }}
          >
            Note: This recommendation is generated based on current
            air quality data, pollution forecasts, and meteorological conditions. Always
            follow additional safety protocols and consult with field supervisors before
            proceeding with operations.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AdvisorPanel;