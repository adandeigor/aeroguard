import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AirQualityData } from "./types";
import { generateRecommendations } from "./utils";

interface DetailsCardProps {
  data: AirQualityData;
}

export const DetailsCard: React.FC<DetailsCardProps> = ({ data }) => {
  return (
    <Card className="relative bg-gradient-to-br from-sky-100/90 to-sky-50/80 backdrop-blur-xl border-2 border-sky-200/60 shadow-[8px_8px_24px_rgba(2,132,199,0.15),-8px_-8px_24px_rgba(255,255,255,0.9)] hover:shadow-[12px_12px_32px_rgba(2,132,199,0.2),-12px_-12px_32px_rgba(255,255,255,0.95)] transition-all duration-500 rounded-2xl overflow-hidden w-full">
      {/* Inner shadow for depth */}
      <div className="absolute inset-[1px] rounded-2xl shadow-[inset_2px_2px_8px_rgba(2,132,199,0.1),inset_-2px_-2px_8px_rgba(255,255,255,0.5)]" />
      
      {/* Glossy highlight */}
      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/40 to-transparent rounded-t-2xl" />
      
      <CardHeader className="relative z-10">
        <CardTitle className="text-sky-900 font-bold text-xl drop-shadow-sm">
          Air Quality Details
        </CardTitle>
        <CardDescription className="text-sky-700/90 font-medium">
          Full breakdown for {data.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 relative z-10">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-sky-50/60 rounded-xl shadow-[inset_2px_2px_8px_rgba(2,132,199,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.6)]">
            <p className="text-sky-600 font-semibold text-sm mb-1">PM2.5 Level</p>
            <p className="text-sky-900 font-bold text-2xl">{data.pm25} µg/m³</p>
          </div>
          <div className="p-4 bg-sky-50/60 rounded-xl shadow-[inset_2px_2px_8px_rgba(2,132,199,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.6)]">
            <p className="text-sky-600 font-semibold text-sm mb-1">AQI Index</p>
            <p className="text-sky-900 font-bold text-2xl">{data.aqi}</p>
          </div>
        </div>
        <div className="p-5 bg-sky-50/60 rounded-xl shadow-[inset_2px_2px_8px_rgba(2,132,199,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.6)]">
          <h3 className="text-sky-800 font-bold mb-3 text-base">Health Recommendations</h3>
          <ul className="text-sm space-y-2 text-sky-700 list-none max-h-32 overflow-y-auto pr-2 custom-scrollbar">
            {generateRecommendations(data).map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 flex-shrink-0 shadow-sm" />
                <span className="font-medium">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
