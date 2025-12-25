# EcoField Safety Dashboard

A real-time air quality monitoring dashboard for Corvus Consulting field operations. Built with React, TypeScript, Vite, Material-UI, and powered by OpenWeatherMap APIs.

## 🌟 Features

- **Real-time Environmental Risk Score (ERS)**: Dynamic 0-100 risk calculation based on weighted pollutant levels
- **Regulatory Compliance Monitoring**: Visual tracking against CAAQS and WHO air quality standards
- **Smart Recommendations**: Go/No-Go decisions for field operations
- **24-Hour Forecast Visualization**: Interactive charts showing pollution trends and ERS predictions
- **Multi-City Support**: Pre-configured for major Canadian cities (Calgary, Edmonton, Vancouver, Toronto, Montreal)
- **Responsive Design**: Production-level UI with modern aesthetics and smooth animations

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- Yarn package manager
- Internet connection (for API calls)

### Installation

1. **Install Dependencies**
   ```bash
   yarn install
   ```

2. **Start Development Server**
   ```bash
   yarn dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
yarn build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
yarn preview
```

## 📊 Architecture

### Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **UI Library**: Material-UI (MUI) v5
- **Charts**: Recharts 2
- **HTTP Client**: Axios
- **Styling**: Emotion (CSS-in-JS)
- **Package Manager**: Yarn

### Project Structure

```
ecofield-dashboard/
├── src/
│   ├── api/
│   │   └── openWeatherService.ts    # API integration layer
│   ├── components/
│   │   ├── Header.tsx               # City selector navigation
│   │   ├── RiskCard.tsx             # ERS display with visual indicators
│   │   ├── CurrentConditions.tsx    # Real-time weather data
│   │   ├── ComplianceGrid.tsx       # Regulatory limits visualization
│   │   ├── TrendChart.tsx           # 24-hour forecast chart
│   │   ├── AdvisorPanel.tsx         # Smart recommendations
│   │   ├── LoadingState.tsx         # Loading UI
│   │   └── ErrorState.tsx           # Error handling UI
│   ├── utils/
│   │   └── riskCalculations.ts      # Core algorithms (ERS, compliance)
│   ├── constants.ts                 # Cities, limits, API config
│   ├── types.ts                     # TypeScript interfaces
│   ├── App.tsx                      # Main application orchestrator
│   └── main.tsx                     # React entry point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🔧 Core Algorithms

### Environmental Risk Score (ERS)

The ERS is calculated using a weighted average of pollutant concentrations relative to regulatory limits:

```typescript
ERS = (PM2.5% × 0.35) + (NO2% × 0.25) + (O3% × 0.25) + (CO% × 0.10) + (SO2% × 0.05)
```

**Risk Levels:**
- 0-30: Low Risk (Green) - Safe to proceed
- 31-60: Moderate Risk (Yellow) - Proceed with caution
- 61-100: High Risk (Red) - Operations not recommended

### Smart Recommendations

The recommendation engine analyzes:
1. Current ERS score
2. 24-hour pollution forecast trends
3. Wind speed for pollutant dispersion
4. Optimal operation time windows

**Decision Matrix:**
- **GO**: Low risk + favorable conditions
- **CONDITIONAL**: Moderate risk requiring enhanced protocols
- **NO-GO**: High risk requiring postponement

## 🌐 API Integration

The dashboard integrates 4 OpenWeatherMap APIs:

1. **Current Weather** - Temperature, wind, humidity
2. **Current Air Pollution** - Real-time pollutant levels
3. **Air Pollution Forecast** - 96-hour pollution predictions
4. **5-Day Weather Forecast** - Wind speed for dispersion analysis

All API calls are typed with TypeScript and cached for performance.

## 📋 Regulatory Standards

The dashboard tracks compliance against:

- **CAAQS** (Canadian Ambient Air Quality Standards)
- **WHO** (World Health Organization) Guidelines

**Monitored Pollutants:**
- PM2.5 (Fine Particulate Matter)
- NO₂ (Nitrogen Dioxide)
- O₃ (Ozone)
- CO (Carbon Monoxide)
- SO₂ (Sulfur Dioxide)

## 🎨 Design Philosophy

The UI follows a **refined, professional aesthetic**:
- Clean typography with Inter font family
- Sophisticated color palette with purpose-driven gradients
- Smooth micro-interactions and state transitions
- Accessibility-first approach with WCAG AA compliance
- Mobile-responsive grid system

## 🔐 Security & Best Practices

- API key rotation ready (currently using demo key)
- TypeScript strict mode enabled
- Error boundaries and graceful degradation
- Rate limiting awareness
- Input validation on all user interactions

## 🧪 Development

### Code Quality

```bash
# Run TypeScript type checking
yarn tsc --noEmit

# Lint code
yarn lint
```

### Adding New Cities

Edit `src/constants.ts`:

```typescript
export const CITIES: City[] = [
  {
    name: 'YourCity',
    lat: 00.0000,
    lon: -00.0000,
    country: 'CA',
    state: 'Province'
  },
  // ... existing cities
];
```

### Customizing Risk Weights

Adjust weights in `src/constants.ts`:

```typescript
export const RISK_WEIGHTS = {
  pm2_5: 0.35,  // Highest priority
  no2: 0.25,
  o3: 0.25,
  co: 0.10,
  so2: 0.05
};
```