export interface AlertData {
  alert: boolean;
  level?: "Good" | "Moderate" | "Unhealthy" | "Very Unhealthy" | "Hazardous";
  message?: string;
}
