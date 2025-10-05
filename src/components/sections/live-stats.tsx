'use client';

import { useState, useEffect } from 'react';
import { AirQualityData, WeatherData } from './live-stats/types';
import { AQICard } from './live-stats/AQICard';
import { WeatherCard } from './live-stats/WeatherCard';
import { DetailsCard } from './live-stats/DetailsCard';
import { AlertCard } from './alerts/AlertCard';
import { AlertData } from './alerts/types';
import { mockAirData, mockWeatherData, mockAlertDataSafe } from '@/lib/mockData';

export default function LiveStatsSection() {
  const [airData, setAirData] = useState<AirQualityData>(mockAirData);
  const [weatherData, setWeatherData] = useState<WeatherData>(mockWeatherData);
  const [alertData, setAlertData] = useState<AlertData>(mockAlertDataSafe);

  useEffect(() => {
    // Simulate geolocation fetch – in real: navigator.geolocation.getCurrentPosition()
    const timer = setTimeout(() => {
      setAirData(mockAirData);
      setWeatherData(mockWeatherData);
      setAlertData(mockAlertDataSafe);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="aqi-card">
          <AQICard data={airData} />
        </div>
        <div className="weather-card">
          <WeatherCard data={weatherData} location={airData.location} />
        </div>
      </div>
      <div className="alert-card w-full mb-8">
        <AlertCard data={alertData} location={airData.location} />
      </div>
      <div className="details-card w-full">
        <DetailsCard data={airData} />
      </div>
    </div>
  );
}
