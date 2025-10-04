import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HistoricalDataPoint } from "./types";
import { TrendingUp } from "lucide-react";

interface TrendsChartProps {
  data: HistoricalDataPoint[];
  period: string;
}

export const TrendsChart: React.FC<TrendsChartProps> = ({ data, period }) => {
  const [Chart, setChart] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    import("recharts").then((recharts) => {
      setChart({
        AreaChart: recharts.AreaChart,
        Area: recharts.Area,
        XAxis: recharts.XAxis,
        YAxis: recharts.YAxis,
        CartesianGrid: recharts.CartesianGrid,
        Tooltip: recharts.Tooltip,
        ResponsiveContainer: recharts.ResponsiveContainer,
      });
    });
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Good":
        return "#10b981";
      case "Moderate":
        return "#f59e0b";
      case "Unhealthy":
        return "#f97316";
      case "Very Unhealthy":
        return "#ef4444";
      case "Hazardous":
        return "#9333ea";
      default:
        return "#6b7280";
    }
  };

  const formatXAxis = (timestamp: string) => {
    const date = new Date(timestamp);
    if (period === "24h") {
      return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    }
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-sky-200">
          <p className="text-sm font-semibold text-sky-900">
            {new Date(data.ts).toLocaleString()}
          </p>
          <p className="text-lg font-bold" style={{ color: getCategoryColor(data.category) }}>
            AQI: {data.aqi}
          </p>
          <p className="text-sm text-gray-600">{data.category}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="relative bg-gradient-to-br from-sky-100/90 to-sky-50/80 backdrop-blur-xl border-2 border-sky-200/60 shadow-[8px_8px_24px_rgba(2,132,199,0.15),-8px_-8px_24px_rgba(255,255,255,0.9)] hover:shadow-[12px_12px_32px_rgba(2,132,199,0.2),-12px_-12px_32px_rgba(255,255,255,0.95)] transition-all duration-500 rounded-2xl overflow-hidden">
      {/* Inner shadow for depth */}
      <div className="absolute inset-[1px] rounded-2xl shadow-[inset_2px_2px_8px_rgba(2,132,199,0.1),inset_-2px_-2px_8px_rgba(255,255,255,0.5)]" />
      
      {/* Glossy highlight */}
      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/40 to-transparent rounded-t-2xl" />
      
      <CardHeader className="relative z-10">
        <CardTitle className="text-sky-900 font-bold flex items-center gap-2 drop-shadow-sm">
          <div className="p-2 bg-sky-200/50 rounded-lg shadow-[2px_2px_6px_rgba(2,132,199,0.2),-2px_-2px_6px_rgba(255,255,255,0.8)]">
            <TrendingUp className="h-5 w-5 text-sky-700" />
          </div>
          Air Quality Trends
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="w-full" style={{ height: '300px', minHeight: '300px' }}>
          {!mounted || !Chart ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-sky-600">Loading chart...</p>
            </div>
          ) : data && data.length > 0 ? (
            <Chart.ResponsiveContainer width="100%" height="100%">
              <Chart.AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Chart.CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.3} />
                <Chart.XAxis 
                  dataKey="ts" 
                  tickFormatter={formatXAxis}
                  stroke="#64748b"
                  style={{ fontSize: "12px" }}
                />
                <Chart.YAxis 
                  stroke="#64748b"
                  style={{ fontSize: "12px" }}
                  label={{ value: "AQI", angle: -90, position: "insideLeft", style: { fill: "#64748b" } }}
                />
                <Chart.Tooltip content={<CustomTooltip />} />
                <Chart.Area
                  type="monotone"
                  dataKey="aqi"
                  stroke="#0ea5e9"
                  strokeWidth={3}
                  fill="url(#aqiGradient)"
                />
              </Chart.AreaChart>
            </Chart.ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-sky-600">No data available</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
