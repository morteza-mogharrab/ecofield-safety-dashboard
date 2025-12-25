import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Box,
  SelectChangeEvent,
} from '@mui/material';
import { City } from '../types';
import { LocationOn } from '@mui/icons-material';

import CorvusLogo from '../assets/corvus-logo.jpeg'; 

interface HeaderProps {
  cities: City[];
  selectedCity: City;
  onCityChange: (city: City) => void;
  loading: boolean;
}

const Header: React.FC<HeaderProps> = ({
  cities,
  selectedCity,
  onCityChange,
  loading,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    const cityName = event.target.value;
    const city = cities.find((c) => c.name === cityName);
    if (city) {
      onCityChange(city);
    }
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: '#4B533C', // Primary Dark
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ py: 2, px: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, flexGrow: 1 }}>
          {/* Logo Container */}
          <Box
            sx={{
              width: 64,
              height: 64,
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={CorvusLogo}
              alt="Corvus Logo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </Box>
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                letterSpacing: '-0.5px',
                color: '#FFFFFF', // White for header text
              }}
            >
              EcoField Safety Dashboard
            </Typography>
            <Typography
              sx={{
                fontSize: '14px',
                color: '#B3B076', // Brand Gold for subtitle
                mt: 0.5,
                opacity: 0.95,
              }}
            >
              Real-time air quality monitoring for field operations
            </Typography>
          </Box>
        </Box>

        <FormControl size="small">
          <Select
            value={selectedCity.name}
            onChange={handleChange}
            disabled={loading}
            startAdornment={<LocationOn sx={{ mr: 1, color: '#FFFFFF' }} />}
            sx={{
              color: '#FFFFFF',
              fontWeight: 600,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              minWidth: 200,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.2)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.3)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
              },
              '& .MuiSvgIcon-root': {
                color: '#FFFFFF',
              },
            }}
          >
            {cities.map((city) => (
              <MenuItem key={city.name} value={city.name}>
                {city.name}, {city.state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Toolbar>
    </AppBar>
  );
};

export default Header;