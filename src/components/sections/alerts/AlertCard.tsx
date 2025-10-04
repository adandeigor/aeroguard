import React from "react";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertData } from "./types";

interface AlertCardProps {
  data: AlertData;
  location: string;
}

export const AlertCard: React.FC<AlertCardProps> = ({ data, location }) => {
  const getLevelColor = (level?: string) => {
    switch (level) {
      case "Good":
        return "bg-green-500";
      case "Moderate":
        return "bg-yellow-500";
      case "Unhealthy":
        return "bg-orange-500";
      case "Very Unhealthy":
        return "bg-red-500";
      case "Hazardous":
        return "bg-purple-600";
      default:
        return "bg-gray-500";
    }
  };

  const getIcon = () => {
    if (!data.alert) {
      return <CheckCircle className="h-6 w-6 text-green-500" />;
    }
    if (data.level === "Moderate") {
      return <Info className="h-6 w-6 text-yellow-500" />;
    }
    return <AlertTriangle className="h-6 w-6 text-red-500" />;
  };

  return (
    <Card className="relative bg-gradient-to-br from-sky-100/90 to-sky-50/80 backdrop-blur-xl border-2 border-sky-200/60 shadow-[8px_8px_24px_rgba(2,132,199,0.15),-8px_-8px_24px_rgba(255,255,255,0.9)] hover:shadow-[12px_12px_32px_rgba(2,132,199,0.2),-12px_-12px_32px_rgba(255,255,255,0.95)] transition-all duration-500 rounded-2xl overflow-hidden">
      {/* Inner shadow for depth */}
      <div className="absolute inset-[1px] rounded-2xl shadow-[inset_2px_2px_8px_rgba(2,132,199,0.1),inset_-2px_-2px_8px_rgba(255,255,255,0.5)]" />
      
      {/* Glossy highlight */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-2xl" />
      
      <CardHeader className="pb-2 relative z-10">
        <CardTitle className="text-sky-900 font-bold flex items-center gap-2 drop-shadow-sm">
          <div className="p-2 bg-sky-200/50 rounded-lg shadow-[2px_2px_6px_rgba(2,132,199,0.2),-2px_-2px_6px_rgba(255,255,255,0.8)]">
            {getIcon()}
          </div>
          Air Quality Alert
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-4 relative z-10">
        {!data.alert ? (
          <div className="p-4 bg-green-50/60 rounded-xl shadow-[inset_2px_2px_8px_rgba(34,197,94,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.6)]">
            <p className="text-green-700 font-semibold flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Air quality is safe in {location}
            </p>
            <p className="text-sm text-green-600 mt-2">No alerts at this time. Enjoy outdoor activities!</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <Badge className={`${getLevelColor(data.level)} text-white text-base px-4 py-2 shadow-[4px_4px_12px_rgba(0,0,0,0.2),-2px_-2px_8px_rgba(255,255,255,0.3)] rounded-xl font-bold`}>
                {data.level}
              </Badge>
            </div>
            <div className="p-4 bg-orange-50/60 rounded-xl shadow-[inset_2px_2px_8px_rgba(251,146,60,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.6)]">
              <p className="text-orange-800 font-semibold">{data.message}</p>
            </div>
            <div className="p-3 bg-sky-50/60 rounded-xl shadow-[inset_2px_2px_8px_rgba(2,132,199,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.6)]">
              <p className="text-xs text-sky-600 font-medium">
                Alert for {location} - Stay informed and take precautions
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
