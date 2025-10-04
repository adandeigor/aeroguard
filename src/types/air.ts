// types/air.ts
export interface AirQualityData {
  aqi: number;  // 0-500 scale
  pm25: number;  // µg/m³
  timestamp: Date;
  location: string;  // e.g., "Cotonou"
  lat: number;
  lon: number;
  // Remove hardcoded recommendations – generate dynamically
}

export interface WeatherData {
  temperature: number;  // °C
  humidity: number;  // %
  condition: string;  // e.g., "Sunny"
  icon: string;  // Lucide icon name
}

// Helper: Generate recommendations based on AQI levels (EPA-inspired thresholds)
export function generateRecommendations(data: AirQualityData): string[] {
  const { aqi, pm25 } = data;
  const tips: string[] = [];

  if (aqi <= 50) {
    // Good air
    tips.push("Excellent air quality: Enjoy outdoor activities freely!");
    tips.push("No restrictions needed for any group.");
  } else if (aqi <= 100) {
    // Moderate
    tips.push("Moderate air: Limit intense outdoor exercise if sensitive (children, elderly).");
    tips.push("PM2.5 at {pm25} µg/m³ – Consider indoor alternatives.");
  } else if (aqi <= 150) {
    // Unhealthy for sensitive
    tips.push("Unhealthy for sensitive groups: Avoid prolonged outdoor exposure.");
    tips.push("Wear N95 mask if active outdoors; stay hydrated.");
  } else if (aqi <= 200) {
    // Unhealthy
    tips.push("Unhealthy air: Everyone should reduce outdoor time.");
    tips.push("Use air purifiers indoors; monitor symptoms like coughing.");
  } else {
    // Very/Unhealthy
    tips.push("Hazardous air: Stay indoors, use HEPA filters.");
    tips.push("Seek medical advice if respiratory issues worsen.");
  }

  // Always add a general tip based on PM2.5
  if (pm25 > 35) {
    tips.push("High PM2.5 detected: Fine particles can affect lungs – ventilate wisely.");
  }

  return tips;  // Return 2-3 concise tips for mobile readability
}

// Static data simulation for Cotonou – no hardcoded recos
export const mockAirData: AirQualityData = {
  aqi: 65,  // Moderate (jaune)
  pm25: 25,
  timestamp: new Date(),
  location: "Cotonou",
  lat: 6.3703,
  lon: 2.4183,
};

export const mockWeatherData: WeatherData = {
  temperature: 32,
  humidity: 75,
  condition: "Sunny with clouds",
  icon: "Sun",  // For Lucide
};

// types/air.ts – Add this interface
export interface GlobeMarker {
  location: [number, number];  // [lat, lon]
  size: number;
  color?: [number, number, number];  // RGB 0-1
  data: AirQualityData;  // Link to full data for details
}

// In GlobeView, we'll map mockGlobeData to Marker[]

// For globe: Arbitrary points around Cotonou (e.g., stations/pollution hotspots) – varied for demo
export const mockGlobeData: AirQualityData[] = [
  { ...mockAirData, lat: 6.3703, lon: 2.4183, pm25: 25, aqi: 65 },
  { ...mockAirData, lat: 6.35, lon: 2.40, pm25: 40, aqi: 95 },  // Higher pollution point
  { ...mockAirData, lat: 6.38, lon: 2.45, pm25: 15, aqi: 35 },  // Lower
  { ...mockAirData, lat: 6.36, lon: 2.42, pm25: 30, aqi: 75 },
  { ...mockAirData, lat: 6.37, lon: 2.41, pm25: 20, aqi: 50 },
  { ...mockAirData, lat: 6.365, lon: 2.415, pm25: 45, aqi: 110 },  // Unhealthy sensitive
  { ...mockAirData, lat: 6.375, lon: 2.425, pm25: 10, aqi: 20 },  // Good
  { ...mockAirData, lat: 6.355, lon: 2.435, pm25: 55, aqi: 140 },  // Unhealthy
  { ...mockAirData, lat: 6.385, lon: 2.405, pm25: 18, aqi: 45 },
  { ...mockAirData, lat: 6.360, lon: 2.430, pm25: 35, aqi: 90 },
];