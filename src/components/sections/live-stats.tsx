// components/LiveStatsSection.tsx
"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sun, Cloud, Thermometer, Droplets, Smile, Frown } from "lucide-react";
import {
  AirQualityData,
  WeatherData,
  mockAirData,
  mockWeatherData,
  generateRecommendations,
} from "@/types/air";

export default function LiveStatsSection() {
  const [airData, setAirData] = useState<AirQualityData>(mockAirData);
  const [weatherData, setWeatherData] = useState<WeatherData>(mockWeatherData);

  useEffect(() => {
    // Simulate geolocation fetch – in real: navigator.geolocation.getCurrentPosition()
    const timer = setTimeout(() => {
      setAirData(mockAirData); // Static mock for hack demo
      setWeatherData(mockWeatherData);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getAQIColor = (aqi: number): string => {
    if (aqi < 50) return "bg-green-500"; // Good: green
    if (aqi < 100) return "bg-yellow-500"; // Moderate: yellow
    if (aqi < 150) return "bg-orange-500"; // Unhealthy sensitive: orange
    return "bg-red-500"; // Unhealthy+: red
  };

  const getAQIEmoji = (aqi: number) =>
    aqi < 50 ? (
      <Smile className="h-6 w-6 text-green-500" />
    ) : (
      <Frown className="h-6 w-6 text-red-500" />
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Top Left: AQI Card – Glassmorphism */}
      <Card className="bg-sky-50 backdrop-filter backdrop-blur-sm border border-sky-200/30 shadow-xl hover:shadow-2xl transition-all duration-300  group relative overflow-hidden">
        {/* Subtle inner glow for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent" />
        <CardHeader className="pb-2 relative z-10">
          <CardTitle className="text-sky-950 flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-sky-600" />
            Current AQI
          </CardTitle>
          <CardDescription className="text-sky-700">
            At {airData.location} (simulated geolocation)
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0 space-y-4 relative z-10">
          <div className="flex items-center justify-between">
            <Badge
              className={`${getAQIColor(
                airData.aqi
              )} text-white text-lg shadow-md`}
            >
              {airData.aqi}
            </Badge>
            {getAQIEmoji(airData.aqi)}
          </div>
          <p className="text-sm text-sky-600">PM2.5: {airData.pm25} µg/m³</p>
          <p className="text-xs text-sky-500">
            Updated: {airData.timestamp.toLocaleTimeString()}
          </p>
        </CardContent>
      </Card>

      {/* Top Right: Weather Card – Glassmorphism */}
      <Card className="bg-sky-50/20 backdrop-blur-sm border border-sky-200/30 shadow-xl hover:shadow-2xl transition-all duration-300  group relative overflow-hidden">
        {/* Subtle inner glow for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />
        <CardHeader className="pb-2 relative z-10">
          <CardTitle className="text-sky-950 flex items-center gap-2">
            <Sun className="h-5 w-5 text-sky-600" />
            Current Weather
          </CardTitle>
          <CardDescription className="text-sky-700">
            At {airData.location}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0 space-y-4 relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-sky-950">
              {weatherData.temperature}°C
            </span>
            <Cloud className="h-8 w-8 text-sky-500" />
          </div>
          <div className="space-y-1 text-sm">
            <p className="text-sky-600 flex items-center gap-1">
              <Droplets className="h-4 w-4" /> {weatherData.humidity}% humidity
            </p>
            <p className="text-sky-700">{weatherData.condition}</p>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Full: Details Card – Glassmorphism, wider */}
      <Card className="bg-sky-50/20 backdrop-blur-sm border border-sky-200/30 shadow-xl hover:shadow-2xl transition-all duration-300  md:col-span-2 relative overflow-hidden">
        {/* Subtle inner glow for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-transparent" />
        <CardHeader className="relative z-10">
          <CardTitle className="text-sky-950">Air Quality Details</CardTitle>
          <CardDescription className="text-sky-700">
            Full breakdown for {airData.location}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 relative z-10">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-sky-600 font-medium">PM2.5 Level</p>
              <p className="text-sky-950 font-bold">{airData.pm25} µg/m³</p>
            </div>
            <div>
              <p className="text-sky-600 font-medium">AQI Index</p>
              <p className="text-sky-950 font-bold">{airData.aqi}</p>
            </div>
          </div>
          <div>
            <h3 className="text-sky-800 font-semibold mb-2">
              Health Recommendations
            </h3>
            <ul className="text-sm space-y-1 text-sky-700 list-disc list-inside max-h-32 overflow-y-auto pr-2">
              {generateRecommendations(airData).map((rec, idx) => (
                <li key={idx}>{rec}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
