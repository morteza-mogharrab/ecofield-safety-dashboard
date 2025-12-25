import { REGULATORY_LIMITS, RISK_WEIGHTS, WIND_THRESHOLDS } from '../constants';
import { ComplianceStatus, ForecastData } from '../types';

/**
 * Calculate Environmental Risk Score (ERS)
 * Returns a score from 0-100 where:
 * 0-30 = Low Risk (Green)
 * 31-60 = Moderate Risk (Yellow)
 * 61-100 = High Risk (Red)
 */
export function calculateRiskScore(pollutants: {
  pm2_5: number;
  no2: number;
  o3: number;
  co: number;
  so2: number;
}): number {
  // Calculate percentage of regulatory limit for each pollutant
  const pm2_5_pct = (pollutants.pm2_5 / REGULATORY_LIMITS.pm2_5.limit) * 100;
  const no2_pct = (pollutants.no2 / REGULATORY_LIMITS.no2.limit) * 100;
  const o3_pct = (pollutants.o3 / REGULATORY_LIMITS.o3.limit) * 100;
  const co_pct = (pollutants.co / REGULATORY_LIMITS.co.limit) * 100;
  const so2_pct = (pollutants.so2 / REGULATORY_LIMITS.so2.limit) * 100;

  // Weighted average
  const ers =
    pm2_5_pct * RISK_WEIGHTS.pm2_5 +
    no2_pct * RISK_WEIGHTS.no2 +
    o3_pct * RISK_WEIGHTS.o3 +
    co_pct * RISK_WEIGHTS.co +
    so2_pct * RISK_WEIGHTS.so2;

  // Cap at 100
  return Math.min(Math.round(ers), 100);
}

/**
 * Determine risk level from ERS score
 */
export function getRiskLevel(ers: number): 'low' | 'moderate' | 'high' {
  if (ers <= 30) return 'low';
  if (ers <= 60) return 'moderate';
  return 'high';
}

/**
 * Check regulatory compliance for all pollutants
 */
export function checkCompliance(pollutants: {
  pm2_5: number;
  no2: number;
  o3: number;
  co: number;
  so2: number;
}): ComplianceStatus[] {
  const compliance: ComplianceStatus[] = [];

  Object.entries(pollutants).forEach(([key, value]) => {
    const limit = REGULATORY_LIMITS[key as keyof typeof REGULATORY_LIMITS];
    const percentage = (value / limit.limit) * 100;

    let status: 'safe' | 'warning' | 'danger';
    if (percentage <= 50) status = 'safe';
    else if (percentage <= 80) status = 'warning';
    else status = 'danger';

    compliance.push({
      pollutant: limit.name,
      current: value,
      limit: limit.limit,
      percentage: Math.min(percentage, 100),
      status,
      unit: limit.unit,
    });
  });

  return compliance;
}

/**
 * Generate smart recommendation based on current conditions and forecast
 */
export function getSmartRecommendation(
  currentERS: number,
  forecast: ForecastData[],
  currentWindSpeed: number
): string {
  const riskLevel = getRiskLevel(currentERS);

  // Analyze forecast trends (next 24 hours)
  const next24Hours = forecast.slice(0, 8); // 8 data points = 24 hours (3-hour intervals)
  const avgFutureERS = next24Hours.reduce((sum, f) => sum + f.ers, 0) / next24Hours.length;
  const avgFutureWind = next24Hours.reduce((sum, f) => sum + f.windSpeed, 0) / next24Hours.length;

  // Find optimal time windows
  const safeWindows = next24Hours.filter(f => f.ers <= 30 && f.windSpeed >= WIND_THRESHOLDS.medium);

  // Generate recommendation
  if (riskLevel === 'high') {
    if (safeWindows.length > 0) {
      const firstSafeWindow = safeWindows[0];
      const hours = Math.round((firstSafeWindow.timestamp - Date.now()) / (1000 * 60 * 60));
      return `⚠️ UNSAFE - High Risk Detected. Operations NOT recommended. Air quality expected to improve in approximately ${hours} hours. Consider postponing field work until conditions improve.`;
    }
    return `⛔ UNSAFE - High Risk Detected. Current conditions pose significant safety concerns. No improvement expected in the next 24 hours. Recommend postponing all non-essential field operations.`;
  }

  if (riskLevel === 'moderate') {
    if (currentWindSpeed >= WIND_THRESHOLDS.medium && avgFutureWind >= WIND_THRESHOLDS.medium) {
      return `⚡ PROCEED WITH CAUTION - Moderate risk levels detected. Wind conditions (${currentWindSpeed.toFixed(1)} m/s) support pollutant dispersion. Limit exposure time and monitor conditions closely.`;
    }
    if (avgFutureERS < currentERS) {
      return `⏳ WAIT RECOMMENDED - Moderate risk with improving trends. Air quality expected to improve over the next 6-12 hours. Consider delaying start time for safer conditions.`;
    }
    return `⚡ PROCEED WITH CAUTION - Moderate risk levels. Implement enhanced safety protocols, limit prolonged outdoor exposure, and monitor real-time conditions.`;
  }

  // Low risk
  if (currentWindSpeed >= WIND_THRESHOLDS.high) {
    return `✅ SAFE TO PROCEED - Low risk conditions with excellent wind dispersion (${currentWindSpeed.toFixed(1)} m/s). Ideal conditions for field operations. Standard safety protocols apply.`;
  }

  if (avgFutureERS > 40) {
    return `✅ SAFE NOW - Current conditions are favorable, but air quality may deteriorate within 12-18 hours. Plan to complete operations within optimal window.`;
  }

  return `✅ SAFE TO PROCEED - Low risk conditions detected. Air quality is within acceptable limits for field operations. Maintain standard safety protocols.`;
}

/**
 * Format timestamp to readable time
 */
export function formatTime(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Get color based on risk level
 */
export function getRiskColor(level: 'low' | 'moderate' | 'high'): string {
  const colors = {
    low: '#10b981',    // Green
    moderate: '#f59e0b', // Amber
    high: '#ef4444',     // Red
  };
  return colors[level];
}

/**
 * Get AQI description
 */
export function getAQIDescription(aqi: number): string {
  const descriptions = [
    'Excellent',
    'Good',
    'Moderate',
    'Poor',
    'Very Poor',
  ];
  return descriptions[aqi - 1] || 'Unknown';
}