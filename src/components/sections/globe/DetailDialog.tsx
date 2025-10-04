import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  X,
  MapPin,
  AlertCircle,
  ThermometerSun,
  Wind,
  Droplets,
} from "lucide-react";
import { AirQualityData } from "./types";
import { getAQIColorVariant, generateRecommendations } from "./utils";

interface DetailDialogProps {
  data: AirQualityData | null;
  onClose: () => void;
}

export const DetailDialog: React.FC<DetailDialogProps> = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <Dialog open={!!data} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto bg-white/95 border-sky-200 text-sky-900 backdrop-blur-md">
        <DialogHeader className="flex items-center justify-between border-b border-sky-100 pb-4">
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-sky-600" />
            <DialogTitle className="text-xl font-bold">
              {data.level.toUpperCase()} : {data.location} ({data.country})
            </DialogTitle>
          </div>
          {data.aqi > 100 && (
            <AlertCircle className="h-6 w-6 text-red-500" />
          )}
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Location & AQI */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              ({data.lat.toFixed(4)}°N, {data.lon.toFixed(4)}°E) |{" "}
              {data.timestamp.toLocaleString()}
            </span>
            <Badge
              variant={getAQIColorVariant(data.aqi)}
              className="text-lg px-4 py-2"
            >
              {data.aqi} AQI
            </Badge>
          </div>

          {/* Pollutants Table */}
          <div>
            <h4 className="font-semibold text-sky-700 mb-3 flex items-center text-lg">
              <ThermometerSun className="h-5 w-5 mr-2" /> Pollutants
            </h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Pollutant</TableHead>
                  <TableHead className="font-semibold">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">PM2.5</TableCell>
                  <TableCell>{data.pollutants.pm25} µg/m³</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">NO₂</TableCell>
                  <TableCell>{data.pollutants.no2} ppb</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">O₃</TableCell>
                  <TableCell>{data.pollutants.o3} ppb</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">SO₂</TableCell>
                  <TableCell>{data.pollutants.so2} ppb</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Weather */}
          <div>
            <h4 className="font-semibold text-sky-700 mb-3 flex items-center text-lg">
              <Wind className="h-5 w-5 mr-2" /> Weather
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center bg-sky-50 rounded-lg p-3">
                <ThermometerSun className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                <p className="text-lg font-bold text-gray-800">{data.meteo.temp}°C</p>
                <p className="text-xs text-gray-500">Temperature</p>
              </div>
              <div className="text-center bg-sky-50 rounded-lg p-3">
                <Wind className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                <p className="text-lg font-bold text-gray-800">{data.meteo.windSpeed} km/h</p>
                <p className="text-xs text-gray-500">Wind</p>
              </div>
              <div className="text-center bg-sky-50 rounded-lg p-3">
                <Droplets className="h-6 w-6 mx-auto mb-2 text-cyan-500" />
                <p className="text-lg font-bold text-gray-800">{data.meteo.humidity}%</p>
                <p className="text-xs text-gray-500">Humidity</p>
              </div>
            </div>
          </div>

          {/* Sources & Validation */}
          <div className="flex justify-between items-center text-sm bg-gray-50 rounded-lg p-3">
            <span className="text-gray-700">
              <strong>Source:</strong> {data.source}
            </span>
            {data.groundValidation && (
              <span className="text-green-600 font-medium">
                ✓ Validated: {data.groundValidation}%
              </span>
            )}
          </div>

          {/* Health Recommendations */}
          <div>
            <h4 className="font-semibold text-sky-700 mb-3 text-lg">
              Health Recommendations
            </h4>
            <ul className="space-y-2">
              {generateRecommendations(data).map((r, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-sky-500 mr-2">•</span>
                  <span className="text-gray-700">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
