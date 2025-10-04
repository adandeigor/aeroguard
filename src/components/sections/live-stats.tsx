'use client';

import { useState, useEffect } from 'react';
import { AirQualityData, WeatherData } from './live-stats/types';
import { AQICard } from './live-stats/AQICard';
import { WeatherCard } from './live-stats/WeatherCard';
import { DetailsCard } from './live-stats/DetailsCard';

// Mock data (will be replaced with real API calls)
const mockAirData: AirQualityData = {
  location: "Cotonou, Benin",
  aqi: 45,
  pm25: 12.5,
  timestamp: new Date(),
};

const mockWeatherData: WeatherData = {
  temperature: 28,
  humidity: 76,
  condition: "Partly Cloudy",
};

export default function LiveStatsSection() {
  const [airData, setAirData] = useState<AirQualityData>(mockAirData);
  const [weatherData, setWeatherData] = useState<WeatherData>(mockWeatherData);

  useEffect(() => {
    // Simulate geolocation fetch – in real: navigator.geolocation.getCurrentPosition()
    const timer = setTimeout(() => {
      setAirData(mockAirData);
      setWeatherData(mockWeatherData);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <AQICard data={airData} />
        <WeatherCard data={weatherData} location={airData.location} />
      </div>
      <div className="w-full">
        <DetailsCard data={airData} />
      </div>
    </div>
  );
}
