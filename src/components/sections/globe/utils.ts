import { AirQualityData } from "./types";

export const getAQIColor = (aqi: number): [number, number, number, number] => {
  if (aqi < 50) return [16, 185, 129, 200]; // Green
  if (aqi < 100) return [251, 191, 36, 200]; // Yellow
  if (aqi < 150) return [251, 146, 60, 200]; // Orange
  return [239, 68, 68, 200]; // Red
};

export const getAQIColorVariant = (aqi: number): "default" | "secondary" | "destructive" => {
  if (aqi < 50) return "default";
  if (aqi < 100) return "secondary";
  return "destructive";
};

export const getQualityLabel = (aqi: number): string => {
  if (aqi < 50) return "Good";
  if (aqi < 100) return "Moderate";
  if (aqi < 150) return "Unhealthy";
  return "Very Unhealthy";
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

export const getRadiusByLevel = (d: AirQualityData, isHovered: boolean): number => {
  const baseRadius = {
    country: 80000,
    city: 50000,
    department: 30000,
    locality: 15000,
  };
  
  return isHovered ? baseRadius[d.level] * 1.5 : baseRadius[d.level];
};
