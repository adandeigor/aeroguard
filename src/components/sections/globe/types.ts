// ---------------- Enriched Interface (TS strict, hierarchical) ----------------
export interface AirQualityData {
  id: string;
  level: "country" | "city" | "department" | "locality"; // Zoom hierarchy
  country: string;
  department?: string; // Optional for countries/cities
  location: string; // City/dept/locality
  lat: number;
  lon: number;
  aqi: number;
  pollutants: {
    // Detailed pollutants
    pm25: number;
    no2: number;
    o3: number;
    so2: number;
  };
  meteo: {
    // Weather overlay
    temp: number;
    windSpeed: number;
    humidity: number;
  };
  timestamp: Date;
  source: "TEMPO/NASA" | "Ground Station" | "OpenAQ" | "Pandora";
  groundValidation?: number; // % ground/sat match
}
