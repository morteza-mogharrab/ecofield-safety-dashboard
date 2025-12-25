import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingState: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: 2,
      }}
    >
      <CircularProgress 
        size={60}
        thickness={4}
        sx={{ 
          color: '#7CAB48', // Status: SAFE (Earthy Kelly Green)
        }} 
      />
      <Typography
        sx={{
          fontSize: '16px',
          color: '#767D6F', // Secondary Text
          fontWeight: 500,
        }}
      >
        Loading environmental data...
      </Typography>
    </Box>
  );
};

export default LoadingState;