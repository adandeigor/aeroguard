import React from "react";
import { Thermometer, Smile, Frown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AirQualityData } from "./types";
import { getAQIColor } from "./utils";
import { NeomorphicCard } from "./NeomorphicCard";

interface AQICardProps {
  data: AirQualityData;
}

export const AQICard: React.FC<AQICardProps> = ({ data }) => {
  const getAQIEmoji = (aqi: number) => 
    aqi < 50 ? (
      <Smile className="h-6 w-6 text-green-500" />
    ) : (
      <Frown className="h-6 w-6 text-red-500" />
    );

  return (
    <NeomorphicCard
      title="Current AQI"
      description={`At ${data.location} (simulated geolocation)`}
      icon={<Thermometer className="h-5 w-5 text-sky-700" />}
    >
      <div className="flex items-center justify-between">
        <Badge 
          className={`${getAQIColor(data.aqi)} text-white text-lg px-6 py-2 shadow-[4px_4px_12px_rgba(0,0,0,0.2),-2px_-2px_8px_rgba(255,255,255,0.3)] rounded-xl font-bold`}
        >
          {data.aqi}
        </Badge>
        <div className="p-3 bg-sky-100/60 rounded-full shadow-[3px_3px_10px_rgba(2,132,199,0.15),-3px_-3px_10px_rgba(255,255,255,0.8)]">
          {getAQIEmoji(data.aqi)}
        </div>
      </div>
      <div className="p-4 bg-sky-50/60 rounded-xl shadow-[inset_2px_2px_8px_rgba(2,132,199,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.6)]">
        <p className="text-sm text-sky-700 font-semibold">PM2.5: {data.pm25} µg/m³</p>
      </div>
      <p className="text-xs text-sky-600/80 font-medium">
        Updated: {data.timestamp.toLocaleTimeString()}
      </p>
    </NeomorphicCard>
  );
};
