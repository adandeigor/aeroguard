export interface AirQualityData {
  location: string;
  aqi: number;
  pm25: number;
  timestamp: Date;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  condition: string;
}
