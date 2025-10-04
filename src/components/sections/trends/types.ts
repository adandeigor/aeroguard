export interface HistoricalDataPoint {
  ts: string; // ISO timestamp
  aqi: number;
  category: "Good" | "Moderate" | "Unhealthy" | "Very Unhealthy" | "Hazardous";
}

export type TimePeriod = "24h" | "7d" | "30d";
