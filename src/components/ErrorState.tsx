import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ErrorOutline, Refresh } from '@mui/icons-material';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: 2,
        px: 3,
      }}
    >
      <ErrorOutline 
        sx={{ 
          fontSize: 72, 
          color: '#C25B52', // Status: DANGER
          mb: 1,
        }} 
      />
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          color: '#4B533C', // Primary Dark
          mb: 1,
        }}
      >
        Unable to Load Data
      </Typography>
      <Typography
        sx={{
          fontSize: '15px',
          color: '#767D6F', // Secondary Text
          textAlign: 'center',
          maxWidth: 500,
          lineHeight: 1.6,
        }}
      >
        {error}
      </Typography>
      <Button
        variant="contained"
        startIcon={<Refresh />}
        onClick={onRetry}
        sx={{
          mt: 2,
          backgroundColor: '#7CAB48', // Status: SAFE
          textTransform: 'none',
          fontWeight: 600,
          px: 4,
          py: 1.5,
          borderRadius: '10px',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: '#6A9A3D',
            boxShadow: 'none',
          },
        }}
      >
        Retry
      </Button>
    </Box>
  );
};

export default ErrorState;