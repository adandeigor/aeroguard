import { AirQualityData } from "./types";

export const getAQIColor = (aqi: number): string => {
  if (aqi < 50) return 'bg-green-500';
  if (aqi < 100) return 'bg-yellow-500';
  if (aqi < 150) return 'bg-orange-500';
  return 'bg-red-500';
};

export const getAQITextColor = (aqi: number): string => {
  if (aqi < 50) return 'text-green-500';
  if (aqi < 100) return 'text-yellow-500';
  if (aqi < 150) return 'text-orange-500';
  return 'text-red-500';
};

export const generateRecommendations = (data: AirQualityData): string[] => {
  const { aqi } = data;
  if (aqi < 50)
    return [
      "Excellent quality: Outdoor activities without risk.",
      "Sensitive groups: Normal activity.",
    ];
  if (aqi < 100)
    return [
      "Moderate: Reduce intense outdoor efforts.",
      "Children/elderly: Limit exposure.",
    ];
  if (aqi < 150)
    return [
      "Unhealthy: Wear a mask, limit activities.",
      "Asthmatics: Stay indoors.",
    ];
  return [
    "Very unhealthy: Stay indoors, use air purifier.",
    "Emergency: Avoid all outdoor exposure.",
  ];
};
