import { AirQualityData, WeatherData } from "@/components/sections/live-stats/types";
import { AlertData } from "@/components/sections/alerts/types";
import { HistoricalDataPoint } from "@/components/sections/trends/types";

// Mock Air Quality Data
export const mockAirData: AirQualityData = {
  location: "Cotonou, Benin",
  aqi: 45,
  pm25: 12.5,
  timestamp: new Date(),
};

// Mock Weather Data
export const mockWeatherData: WeatherData = {
  temperature: 28,
  humidity: 76,
  condition: "Partly Cloudy",
};

// Mock Alert Data - No Alert
export const mockAlertDataSafe: AlertData = {
  alert: false,
};

// Mock Alert Data - Active Alert
export const mockAlertDataActive: AlertData = {
  alert: true,
  level: "Unhealthy",
  message: "Avoid outdoor activity. Air quality is unhealthy for sensitive groups.",
};

// Mock Alert Data - Moderate Alert
export const mockAlertDataModerate: AlertData = {
  alert: true,
  level: "Moderate",
  message: "Sensitive groups should limit prolonged outdoor exertion.",
};

// Mock Historical Data - 24 hours
export const mockHistoricalData24h: HistoricalDataPoint[] = [
  { ts: "2025-10-04T00:00:00", aqi: 42, category: "Good" },
  { ts: "2025-10-04T01:00:00", aqi: 38, category: "Good" },
  { ts: "2025-10-04T02:00:00", aqi: 35, category: "Good" },
  { ts: "2025-10-04T03:00:00", aqi: 33, category: "Good" },
  { ts: "2025-10-04T04:00:00", aqi: 36, category: "Good" },
  { ts: "2025-10-04T05:00:00", aqi: 40, category: "Good" },
  { ts: "2025-10-04T06:00:00", aqi: 48, category: "Good" },
  { ts: "2025-10-04T07:00:00", aqi: 55, category: "Moderate" },
  { ts: "2025-10-04T08:00:00", aqi: 62, category: "Moderate" },
  { ts: "2025-10-04T09:00:00", aqi: 68, category: "Moderate" },
  { ts: "2025-10-04T10:00:00", aqi: 72, category: "Moderate" },
  { ts: "2025-10-04T11:00:00", aqi: 75, category: "Moderate" },
  { ts: "2025-10-04T12:00:00", aqi: 78, category: "Moderate" },
  { ts: "2025-10-04T13:00:00", aqi: 74, category: "Moderate" },
  { ts: "2025-10-04T14:00:00", aqi: 70, category: "Moderate" },
  { ts: "2025-10-04T15:00:00", aqi: 65, category: "Moderate" },
  { ts: "2025-10-04T16:00:00", aqi: 60, category: "Moderate" },
  { ts: "2025-10-04T17:00:00", aqi: 55, category: "Moderate" },
  { ts: "2025-10-04T18:00:00", aqi: 52, category: "Moderate" },
  { ts: "2025-10-04T19:00:00", aqi: 48, category: "Good" },
  { ts: "2025-10-04T20:00:00", aqi: 45, category: "Good" },
  { ts: "2025-10-04T21:00:00", aqi: 43, category: "Good" },
  { ts: "2025-10-04T22:00:00", aqi: 40, category: "Good" },
  { ts: "2025-10-04T23:00:00", aqi: 38, category: "Good" },
];

// Mock Historical Data - 7 days
export const mockHistoricalData7d: HistoricalDataPoint[] = [
  { ts: "2025-09-28T12:00:00", aqi: 55, category: "Moderate" },
  { ts: "2025-09-29T12:00:00", aqi: 48, category: "Good" },
  { ts: "2025-09-30T12:00:00", aqi: 62, category: "Moderate" },
  { ts: "2025-10-01T12:00:00", aqi: 68, category: "Moderate" },
  { ts: "2025-10-02T12:00:00", aqi: 72, category: "Moderate" },
  { ts: "2025-10-03T12:00:00", aqi: 58, category: "Moderate" },
  { ts: "2025-10-04T12:00:00", aqi: 45, category: "Good" },
];

// Mock Historical Data - 30 days
export const mockHistoricalData30d: HistoricalDataPoint[] = [
  { ts: "2025-09-05T12:00:00", aqi: 65, category: "Moderate" },
  { ts: "2025-09-06T12:00:00", aqi: 58, category: "Moderate" },
  { ts: "2025-09-07T12:00:00", aqi: 52, category: "Moderate" },
  { ts: "2025-09-08T12:00:00", aqi: 48, category: "Good" },
  { ts: "2025-09-09T12:00:00", aqi: 45, category: "Good" },
  { ts: "2025-09-10T12:00:00", aqi: 50, category: "Moderate" },
  { ts: "2025-09-11T12:00:00", aqi: 55, category: "Moderate" },
  { ts: "2025-09-12T12:00:00", aqi: 62, category: "Moderate" },
  { ts: "2025-09-13T12:00:00", aqi: 68, category: "Moderate" },
  { ts: "2025-09-14T12:00:00", aqi: 72, category: "Moderate" },
  { ts: "2025-09-15T12:00:00", aqi: 78, category: "Moderate" },
  { ts: "2025-09-16T12:00:00", aqi: 85, category: "Moderate" },
  { ts: "2025-09-17T12:00:00", aqi: 92, category: "Moderate" },
  { ts: "2025-09-18T12:00:00", aqi: 88, category: "Moderate" },
  { ts: "2025-09-19T12:00:00", aqi: 80, category: "Moderate" },
  { ts: "2025-09-20T12:00:00", aqi: 75, category: "Moderate" },
  { ts: "2025-09-21T12:00:00", aqi: 70, category: "Moderate" },
  { ts: "2025-09-22T12:00:00", aqi: 65, category: "Moderate" },
  { ts: "2025-09-23T12:00:00", aqi: 60, category: "Moderate" },
  { ts: "2025-09-24T12:00:00", aqi: 55, category: "Moderate" },
  { ts: "2025-09-25T12:00:00", aqi: 52, category: "Moderate" },
  { ts: "2025-09-26T12:00:00", aqi: 48, category: "Good" },
  { ts: "2025-09-27T12:00:00", aqi: 45, category: "Good" },
  { ts: "2025-09-28T12:00:00", aqi: 42, category: "Good" },
  { ts: "2025-09-29T12:00:00", aqi: 40, category: "Good" },
  { ts: "2025-09-30T12:00:00", aqi: 38, category: "Good" },
  { ts: "2025-10-01T12:00:00", aqi: 42, category: "Good" },
  { ts: "2025-10-02T12:00:00", aqi: 48, category: "Good" },
  { ts: "2025-10-03T12:00:00", aqi: 52, category: "Moderate" },
  { ts: "2025-10-04T12:00:00", aqi: 45, category: "Good" },
];

// Mock Historical Data - Unhealthy scenario
export const mockHistoricalDataUnhealthy: HistoricalDataPoint[] = [
  { ts: "2025-10-01T12:00:00", aqi: 105, category: "Unhealthy" },
  { ts: "2025-10-02T12:00:00", aqi: 125, category: "Unhealthy" },
  { ts: "2025-10-03T12:00:00", aqi: 142, category: "Unhealthy" },
  { ts: "2025-10-04T12:00:00", aqi: 158, category: "Very Unhealthy" },
  { ts: "2025-10-05T12:00:00", aqi: 135, category: "Unhealthy" },
  { ts: "2025-10-06T12:00:00", aqi: 118, category: "Unhealthy" },
  { ts: "2025-10-07T12:00:00", aqi: 95, category: "Moderate" },
];

// Multiple locations data for globe
export const mockLocationsData = [
  {
    location: "Cotonou, Benin",
    aqi: 45,
    pm25: 12.5,
    alert: mockAlertDataSafe,
  },
  {
    location: "Lagos, Nigeria",
    aqi: 120,
    pm25: 45.1,
    alert: mockAlertDataActive,
  },
  {
    location: "Accra, Ghana",
    aqi: 65,
    pm25: 20.3,
    alert: mockAlertDataModerate,
  },
  {
    location: "Dakar, Senegal",
    aqi: 30,
    pm25: 8.7,
    alert: mockAlertDataSafe,
  },
  {
    location: "Abidjan, Côte d'Ivoire",
    aqi: 85,
    pm25: 28.2,
    alert: mockAlertDataModerate,
  },
];

// Helper function to get historical data by period
export const getHistoricalDataByPeriod = (period: "24h" | "7d" | "30d"): HistoricalDataPoint[] => {
  switch (period) {
    case "24h":
      return mockHistoricalData24h;
    case "7d":
      return mockHistoricalData7d;
    case "30d":
      return mockHistoricalData30d;
    default:
      return mockHistoricalData7d;
  }
};
