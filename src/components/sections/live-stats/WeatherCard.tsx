import React from "react";
import { Sun, Cloud, Droplets } from "lucide-react";
import { WeatherData } from "./types";
import { NeomorphicCard } from "./NeomorphicCard";

interface WeatherCardProps {
  data: WeatherData;
  location: string;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ data, location }) => {
  return (
    <NeomorphicCard
      title="Current Weather"
      description={`At ${location}`}
      icon={<Sun className="h-5 w-5 text-sky-700" />}
    >
      <div className="flex items-center justify-between">
        <span className="text-4xl font-bold text-sky-900 drop-shadow-md">
          {data.temperature}°C
        </span>
        <div className="p-3 bg-sky-100/60 rounded-full shadow-[3px_3px_10px_rgba(2,132,199,0.15),-3px_-3px_10px_rgba(255,255,255,0.8)]">
          <Cloud className="h-8 w-8 text-sky-600" />
        </div>
      </div>
      <div className="p-4 bg-sky-50/60 rounded-xl shadow-[inset_2px_2px_8px_rgba(2,132,199,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.6)] space-y-2">
        <p className="text-sky-700 font-semibold flex items-center gap-2">
          <Droplets className="h-4 w-4" /> {data.humidity}% humidity
        </p>
        <p className="text-sky-800 font-medium">{data.condition}</p>
      </div>
    </NeomorphicCard>
  );
};
