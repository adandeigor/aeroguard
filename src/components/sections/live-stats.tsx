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
      {/* Top Left: AQI Card – Isomorphic Design */}
      <Card className="relative bg-gradient-to-br from-sky-100/90 to-sky-50/80 backdrop-blur-xl border-2 border-sky-200/60 shadow-[8px_8px_24px_rgba(2,132,199,0.15),-8px_-8px_24px_rgba(255,255,255,0.9)] hover:shadow-[12px_12px_32px_rgba(2,132,199,0.2),-12px_-12px_32px_rgba(255,255,255,0.95)] transition-all duration-500 rounded-2xl overflow-hidden group">
        {/* Inner shadow for depth */}
        <div className="absolute inset-[1px] rounded-2xl shadow-[inset_2px_2px_8px_rgba(2,132,199,0.1),inset_-2px_-2px_8px_rgba(255,255,255,0.5)]" />
        
        {/* Glossy highlight */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-2xl" />
        
        <CardHeader className="pb-2 relative z-10">
          <CardTitle className="text-sky-900 font-bold flex items-center gap-2 drop-shadow-sm">
            <div className="p-2 bg-sky-200/50 rounded-lg shadow-[2px_2px_6px_rgba(2,132,199,0.2),-2px_-2px_6px_rgba(255,255,255,0.8)]">
              <Thermometer className="h-5 w-5 text-sky-700" />
            </div>
            Current AQI
          </CardTitle>
          <CardDescription className="text-sky-700/90 font-medium">At {airData.location} (simulated geolocation)</CardDescription>
        </CardHeader>
        <CardContent className="pt-0 space-y-4 relative z-10">
          <div className="flex items-center justify-between">
            <Badge className={`${getAQIColor(airData.aqi)} text-white text-lg px-6 py-2 shadow-[4px_4px_12px_rgba(0,0,0,0.2),-2px_-2px_8px_rgba(255,255,255,0.3)] rounded-xl font-bold`}>
              {airData.aqi}
            </Badge>
            <div className="p-3 bg-sky-100/60 rounded-full shadow-[3px_3px_10px_rgba(2,132,199,0.15),-3px_-3px_10px_rgba(255,255,255,0.8)]">
              {getAQIEmoji(airData.aqi)}
            </div>
          </div>
          <div className="p-4 bg-sky-50/60 rounded-xl shadow-[inset_2px_2px_8px_rgba(2,132,199,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.6)]">
            <p className="text-sm text-sky-700 font-semibold">PM2.5: {airData.pm25} µg/m³</p>
          </div>
          <p className="text-xs text-sky-600/80 font-medium">Updated: {airData.timestamp.toLocaleTimeString()}</p>
        </CardContent>
      </Card>

      {/* Top Right: Weather Card – Isomorphic Design */}
      <Card className="relative bg-gradient-to-br from-sky-100/90 to-sky-50/80 backdrop-blur-xl border-2 border-sky-200/60 shadow-[8px_8px_24px_rgba(2,132,199,0.15),-8px_-8px_24px_rgba(255,255,255,0.9)] hover:shadow-[12px_12px_32px_rgba(2,132,199,0.2),-12px_-12px_32px_rgba(255,255,255,0.95)] transition-all duration-500 rounded-2xl overflow-hidden group">
        {/* Inner shadow for depth */}
        <div className="absolute inset-[1px] rounded-2xl shadow-[inset_2px_2px_8px_rgba(2,132,199,0.1),inset_-2px_-2px_8px_rgba(255,255,255,0.5)]" />
        
        {/* Glossy highlight */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-2xl" />
        
        <CardHeader className="pb-2 relative z-10">
          <CardTitle className="text-sky-900 font-bold flex items-center gap-2 drop-shadow-sm">
            <div className="p-2 bg-sky-200/50 rounded-lg shadow-[2px_2px_6px_rgba(2,132,199,0.2),-2px_-2px_6px_rgba(255,255,255,0.8)]">
              <Sun className="h-5 w-5 text-sky-700" />
            </div>
            Current Weather
          </CardTitle>
          <CardDescription className="text-sky-700/90 font-medium">At {airData.location}</CardDescription>
        </CardHeader>
        <CardContent className="pt-0 space-y-4 relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-4xl font-bold text-sky-900 drop-shadow-md">{weatherData.temperature}°C</span>
            <div className="p-3 bg-sky-100/60 rounded-full shadow-[3px_3px_10px_rgba(2,132,199,0.15),-3px_-3px_10px_rgba(255,255,255,0.8)]">
              <Cloud className="h-8 w-8 text-sky-600" />
            </div>
          </div>
          <div className="p-4 bg-sky-50/60 rounded-xl shadow-[inset_2px_2px_8px_rgba(2,132,199,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.6)] space-y-2">
            <p className="text-sky-700 font-semibold flex items-center gap-2">
              <Droplets className="h-4 w-4" /> {weatherData.humidity}% humidity
            </p>
            <p className="text-sky-800 font-medium">{weatherData.condition}</p>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Full: Details Card – Isomorphic Design, wider */}
      <Card className="relative bg-gradient-to-br from-sky-100/90 to-sky-50/80 backdrop-blur-xl border-2 border-sky-200/60 shadow-[8px_8px_24px_rgba(2,132,199,0.15),-8px_-8px_24px_rgba(255,255,255,0.9)] hover:shadow-[12px_12px_32px_rgba(2,132,199,0.2),-12px_-12px_32px_rgba(255,255,255,0.95)] transition-all duration-500 md:col-span-2 rounded-2xl overflow-hidden">
        {/* Inner shadow for depth */}
        <div className="absolute inset-[1px] rounded-2xl shadow-[inset_2px_2px_8px_rgba(2,132,199,0.1),inset_-2px_-2px_8px_rgba(255,255,255,0.5)]" />
        
        {/* Glossy highlight */}
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/40 to-transparent rounded-t-2xl" />
        
        <CardHeader className="relative z-10">
          <CardTitle className="text-sky-900 font-bold text-xl drop-shadow-sm">Air Quality Details</CardTitle>
          <CardDescription className="text-sky-700/90 font-medium">Full breakdown for {airData.location}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 relative z-10">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-sky-50/60 rounded-xl shadow-[inset_2px_2px_8px_rgba(2,132,199,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.6)]">
              <p className="text-sky-600 font-semibold text-sm mb-1">PM2.5 Level</p>
              <p className="text-sky-900 font-bold text-2xl">{airData.pm25} µg/m³</p>
            </div>
            <div className="p-4 bg-sky-50/60 rounded-xl shadow-[inset_2px_2px_8px_rgba(2,132,199,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.6)]">
              <p className="text-sky-600 font-semibold text-sm mb-1">AQI Index</p>
              <p className="text-sky-900 font-bold text-2xl">{airData.aqi}</p>
            </div>
          </div>
          <div className="p-5 bg-sky-50/60 rounded-xl shadow-[inset_2px_2px_8px_rgba(2,132,199,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.6)]">
            <h3 className="text-sky-800 font-bold mb-3 text-base">Health Recommendations</h3>
            <ul className="text-sm space-y-2 text-sky-700 list-none max-h-32 overflow-y-auto pr-2 custom-scrollbar">
              {generateRecommendations(airData).map((rec, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 flex-shrink-0 shadow-sm" />
                  <span className="font-medium">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
