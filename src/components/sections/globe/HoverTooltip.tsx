import React from "react";
import { AirQualityData } from "./types";
import { getQualityLabel } from "./utils";

interface HoverTooltipProps {
  data: AirQualityData | null;
  position: { x: number; y: number } | null;
}

export const HoverTooltip: React.FC<HoverTooltipProps> = ({ data, position }) => {
  if (!data || !position) return null;

  const getAQIBgColor = (aqi: number): string => {
    if (aqi < 50) return "bg-emerald-500";
    if (aqi < 100) return "bg-yellow-500";
    if (aqi < 150) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div
      className="fixed pointer-events-none z-50 transition-all duration-150"
      style={{
        left: `${position.x + 15}px`,
        top: `${position.y + 15}px`,
      }}
    >
      <div className="relative bg-white rounded-2xl shadow-[8px_8px_16px_rgba(0,0,0,0.15),-8px_-8px_16px_rgba(255,255,255,0.7)] p-4 min-w-[280px] border border-gray-100">
        {/* Neomorphic inner shadow */}
        <div className="absolute inset-0 rounded-2xl shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] pointer-events-none" />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {data.level}
              </p>
              <h3 className="text-base font-bold text-gray-800 mt-0.5">
                {data.location}
              </h3>
            </div>
            <div className={`${getAQIBgColor(data.aqi)} text-white px-3 py-1.5 rounded-xl shadow-md`}>
              <span className="text-sm font-bold">{data.aqi}</span>
            </div>
          </div>

          {/* Quality Label */}
          <div className="mb-3">
            <span className="text-sm font-semibold text-gray-700">
              {getQualityLabel(data.aqi)}
            </span>
          </div>

          {/* Pollutants Grid */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-2 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]">
              <p className="text-[10px] text-gray-500 font-medium">PM2.5</p>
              <p className="text-sm font-bold text-gray-800">{data.pollutants.pm25} µg/m³</p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-2 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]">
              <p className="text-[10px] text-gray-500 font-medium">NO₂</p>
              <p className="text-sm font-bold text-gray-800">{data.pollutants.no2} ppb</p>
            </div>
          </div>

          {/* Weather */}
          <div className="flex items-center justify-between text-xs text-gray-600 pt-2 border-t border-gray-200">
            <span>{data.meteo.temp}°C</span>
            <span>💨 {data.meteo.windSpeed} km/h</span>
            <span>💧 {data.meteo.humidity}%</span>
          </div>

          {/* Source */}
          <div className="mt-2 text-[10px] text-gray-400 text-center">
            {data.source}
          </div>
        </div>
      </div>
    </div>
  );
};
