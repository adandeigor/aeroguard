import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Calendar, Award } from "lucide-react";
import { HistoricalDataPoint } from "./types";

interface HistoricalStatsProps {
  data: HistoricalDataPoint[];
}

export const HistoricalStats: React.FC<HistoricalStatsProps> = ({ data }) => {
  const calculateStats = () => {
    if (data.length === 0) return null;

    const aqiValues = data.map((d) => d.aqi);
    const avgAqi = Math.round(aqiValues.reduce((a, b) => a + b, 0) / aqiValues.length);
    const maxAqi = Math.max(...aqiValues);
    const minAqi = Math.min(...aqiValues);
    
    const bestDay = data.find((d) => d.aqi === minAqi);
    const worstDay = data.find((d) => d.aqi === maxAqi);
    
    // Calculate trend (comparing first half vs second half)
    const midPoint = Math.floor(data.length / 2);
    const firstHalfAvg = data.slice(0, midPoint).reduce((a, b) => a + b.aqi, 0) / midPoint;
    const secondHalfAvg = data.slice(midPoint).reduce((a, b) => a + b.aqi, 0) / (data.length - midPoint);
    const trend = secondHalfAvg < firstHalfAvg ? "improving" : "degrading";
    const trendPercentage = Math.abs(Math.round(((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100));

    return { avgAqi, bestDay, worstDay, trend, trendPercentage };
  };

  const stats = calculateStats();
  if (!stats) return null;

  const StatCard = ({ icon: Icon, title, value, subtitle, color }: any) => (
    <Card className="relative bg-gradient-to-br from-sky-100/90 to-sky-50/80 backdrop-blur-xl border-2 border-sky-200/60 shadow-[8px_8px_24px_rgba(2,132,199,0.15),-8px_-8px_24px_rgba(255,255,255,0.9)] hover:shadow-[12px_12px_32px_rgba(2,132,199,0.2),-12px_-12px_32px_rgba(255,255,255,0.95)] transition-all duration-500 rounded-2xl overflow-hidden">
      <div className="absolute inset-[1px] rounded-2xl shadow-[inset_2px_2px_8px_rgba(2,132,199,0.1),inset_-2px_-2px_8px_rgba(255,255,255,0.5)]" />
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-2xl" />
      
      <CardContent className="px-4 lg:px-6 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className={`p-3 ${color} rounded-full shadow-[3px_3px_10px_rgba(2,132,199,0.15),-3px_-3px_10px_rgba(255,255,255,0.8)]`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
        <h3 className="text-sm font-semibold text-sky-600 mb-1">{title}</h3>
        <p className="text-3xl font-bold text-sky-900 mb-1">{value}</p>
        <p className="text-xs text-sky-600/80">{subtitle}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={Calendar}
        title="Average AQI"
        value={stats.avgAqi}
        subtitle="Period average"
        color="bg-sky-500"
      />
      <StatCard
        icon={Award}
        title="Best Day"
        value={stats.bestDay?.aqi}
        subtitle={new Date(stats.bestDay?.ts || "").toLocaleDateString()}
        color="bg-green-500"
      />
      <StatCard
        icon={TrendingUp}
        title="Worst Day"
        value={stats.worstDay?.aqi}
        subtitle={new Date(stats.worstDay?.ts || "").toLocaleDateString()}
        color="bg-red-500"
      />
      <StatCard
        icon={stats.trend === "improving" ? TrendingDown : TrendingUp}
        title="Trend"
        value={`${stats.trendPercentage}%`}
        subtitle={stats.trend === "improving" ? "Improving ↓" : "Degrading ↑"}
        color={stats.trend === "improving" ? "bg-emerald-500" : "bg-orange-500"}
      />
    </div>
  );
};
