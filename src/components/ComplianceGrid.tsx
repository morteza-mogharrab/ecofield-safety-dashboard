import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box
} from '@mui/material';
import { ComplianceStatus } from '../types';
import { CheckCircle, Warning, Cancel } from '@mui/icons-material';

interface ComplianceGridProps {
  compliance: ComplianceStatus[];
}

const ComplianceGrid: React.FC<ComplianceGridProps> = ({ compliance }) => {
  const getStatusIcon = (status: string) => {
    const iconProps = { sx: { fontSize: 18 } };
    
    switch (status) {
      case 'safe':
        return <CheckCircle {...iconProps} sx={{ ...iconProps.sx, color: '#7CAB48' }} />;
      case 'warning':
        return <Warning {...iconProps} sx={{ ...iconProps.sx, color: '#D4AF37' }} />;
      case 'danger':
        return <Cancel {...iconProps} sx={{ ...iconProps.sx, color: '#C25B52' }} />;
      default:
        return null;
    }
  };

  const getStatusColor = (percentage: number) => {
    if (percentage < 50) return '#7CAB48';  // Status: SAFE
    if (percentage < 80) return '#D4AF37';  // Status: WARNING
    return '#C25B52';                        // Status: DANGER
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
          REGULATORY COMPLIANCE (CAAQS/WHO)
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {compliance.map((item, index) => {
            const statusColor = getStatusColor(item.percentage);

            return (
              <Box key={index}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {getStatusIcon(item.status)}
                    <Typography
                      sx={{
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#2E3326', // Primary Text
                      }}
                    >
                      {item.pollutant}
                    </Typography>
                  </Box>

                  <Box sx={{ textAlign: 'right' }}>
                    <Typography
                      sx={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#2E3326', // Primary Text
                      }}
                    >
                      {item.current.toFixed(2)} {item.unit}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '11px',
                        color: '#767D6F', // Secondary Text
                      }}
                    >
                      Limit: {item.limit} {item.unit}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    position: 'relative',
                    height: 10,
                    backgroundColor: '#E0E5DC', // Borders
                    borderRadius: 1.25,
                    overflow: 'hidden',
                    mb: 0.5,
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      height: '100%',
                      width: `${Math.min(item.percentage, 100)}%`,
                      backgroundColor: statusColor,
                      transition: 'width 0.5s ease',
                    }}
                  />
                </Box>

                <Box sx={{ textAlign: 'right' }}>
                  <Typography
                    sx={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: statusColor,
                    }}
                  >
                    {item.percentage.toFixed(0)}%
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* Legend */}
        <Box
          sx={{
            display: 'flex',
            gap: 2.5,
            mt: 3,
            p: 2,
            backgroundColor: '#F4F6F1', // Dashboard Background
            borderRadius: 2,
            flexWrap: 'wrap',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                backgroundColor: '#7CAB48', // Status: SAFE
                borderRadius: 0.5,
              }}
            />
            <Typography
              sx={{
                fontSize: '11px',
                color: '#767D6F', // Secondary Text
                fontWeight: 600,
              }}
            >
              Safe (&lt;50%)
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                backgroundColor: '#D4AF37', // Status: WARNING
                borderRadius: 0.5,
              }}
            />
            <Typography
              sx={{
                fontSize: '11px',
                color: '#767D6F', // Secondary Text
                fontWeight: 600,
              }}
            >
              Warning (50-80%)
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                backgroundColor: '#C25B52', // Status: DANGER
                borderRadius: 0.5,
              }}
            />
            <Typography
              sx={{
                fontSize: '11px',
                color: '#767D6F', // Secondary Text
                fontWeight: 600,
              }}
            >
              Danger (&gt;80%)
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ComplianceGrid;