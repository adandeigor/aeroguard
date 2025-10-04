// components/GlobeView.tsx
"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import maplibregl from "maplibre-gl";
import { MapboxOverlay } from "@deck.gl/mapbox";
import { ScatterplotLayer } from "@deck.gl/layers";
import { PickingInfo } from "@deck.gl/core";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { X, MapPin, AlertCircle, Plus, Minus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

// ---------------- Mock data (demo) ----------------
interface AirQualityData {
  id: string;
  location: string;
  lat: number;
  lon: number;
  aqi: number;
  pm25: number;
  timestamp: Date;
  source?: string;
  groundValidation?: number;
}

const mockGlobeData: AirQualityData[] = [
  { id: "1", location: "Cotonou", lat: 6.3703, lon: 2.4183, aqi: 45, pm25: 12.5, timestamp: new Date("2025-10-04T12:00:00Z"), source: "TEMPO/NASA", groundValidation: 95 },
  { id: "2", location: "Abidjan", lat: 5.36, lon: -4.0083, aqi: 85, pm25: 28.2, timestamp: new Date("2025-10-04T11:30:00Z"), source: "Ground Station" },
  { id: "3", location: "Lagos", lat: 6.5244, lon: 3.3792, aqi: 120, pm25: 45.1, timestamp: new Date("2025-10-04T13:00:00Z"), source: "TEMPO/NASA", groundValidation: 88 },
  { id: "4", location: "Accra", lat: 5.6037, lon: -0.187, aqi: 65, pm25: 20.3, timestamp: new Date("2025-10-04T10:45:00Z"), source: "Ground Station" },
  { id: "5", location: "Dakar", lat: 14.7167, lon: -17.4677, aqi: 30, pm25: 8.7, timestamp: new Date("2025-10-04T14:00:00Z"), source: "TEMPO/NASA" },
];

const generateRecommendations = (data: AirQualityData): string[] => {
  const { aqi } = data;
  if (aqi < 50) return ["Qualité excellente : Sorties en extérieur sans risque."];
  if (aqi < 100) return ["Modérée : Réduisez les efforts intenses en extérieur."];
  if (aqi < 150) return ["Mauvaise : Portez un masque, limitez les activités."];
  return ["Très mauvaise : Restez à l'intérieur, utilisez purificateur d'air."];
};

// ---------------- Component ----------------
export default function GlobeViewComponent() {
  const [map, setMap] = useState<maplibregl.Map | null>(null);
  const [overlay, setOverlay] = useState<MapboxOverlay | null>(null);
  const [selectedData, setSelectedData] = useState<AirQualityData | null>(null);
  const [hoveredData, setHoveredData] = useState<AirQualityData | null>(null);
  const [showPoints, setShowPoints] = useState(true);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const getAQIColorVariant = (aqi: number): "default" | "secondary" | "destructive" => {
    if (aqi < 50) return "default";
    if (aqi < 100) return "secondary";
    return "destructive";
  };

  // Tooltip HTML
  const getTooltip = ({ object }: { object?: AirQualityData }) => {
    if (!object) return { html: "", style: { display: "none" } };
    const d = object;
    const variant = getAQIColorVariant(d.aqi);
    const badgeColor =
      variant === "default"
        ? "bg-green-500"
        : variant === "secondary"
        ? "bg-yellow-500"
        : "bg-red-500";

    return {
      html: `
        <div style="background: rgba(14, 165, 233, 0.95); color: white; padding: 10px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
          <strong>${d.location}</strong><br/>
          <span class="${badgeColor}">AQI: ${d.aqi}</span><br/>
          PM2.5: ${d.pm25} µg/m³
        </div>
      `,
      style: { backgroundColor: "transparent", border: "none", pointerEvents: "none" },
    };
  };

  // Deck.gl layer
  const airLayer = useMemo(() => {
    if (!showPoints) return null;
    return new ScatterplotLayer<AirQualityData>({
      id: "air-layer",
      data: mockGlobeData,
      getPosition: (d) => [d.lon, d.lat],
      getRadius: (d) => (hoveredData?.id === d.id ? 1200 : 800),
      getFillColor: (d) =>
        d.aqi < 50
          ? [0, 255, 0, 180]
          : d.aqi < 100
          ? [255, 255, 0, 180]
          : d.aqi < 150
          ? [255, 165, 0, 180]
          : [255, 0, 0, 200],
      pickable: true,
      onHover: ({ object }: PickingInfo<AirQualityData>) => {
        setHoveredData(object || null);
        document.body.style.cursor = object ? "pointer" : "default";
      },
      onClick: ({ object }: PickingInfo<AirQualityData>) => {
        if (object) {
          setSelectedData(object);
          zoomToPoint(object);
        }
      },
      updateTriggers: { getRadius: [hoveredData?.id] },
    });
  }, [hoveredData?.id, showPoints]);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    const mapInstance = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [2.4183, 6.3703],
      zoom: 2.5,
      pitch: 45,
      bearing: 0,
      interactive: true,
    });

    mapInstance.on("load", () => {
      const newOverlay = new MapboxOverlay({ interleaved: true, layers: showPoints ? [airLayer!] : [], getTooltip });
      mapInstance.addControl(newOverlay);
      setOverlay(newOverlay);
      setMap(mapInstance);
      mapRef.current = mapInstance;
    });

    return () => {
      mapInstance.remove();
    };
  }, []);

  // Sync layers
  useEffect(() => {
    if (overlay && airLayer) overlay.setProps({ layers: [airLayer] });
    else if (overlay) overlay.setProps({ layers: [] });
  }, [overlay, airLayer]);

  // Zoom helpers
  const zoomToPoint = useCallback((d: AirQualityData) => {
    mapRef.current?.flyTo({ center: [d.lon, d.lat], zoom: 7, pitch: 55, duration: 1000 });
  }, []);

  const zoomIn = () => mapRef.current?.zoomIn({ duration: 400 });
  const zoomOut = () => mapRef.current?.zoomOut({ duration: 400 });
  const resetView = () => {
    mapRef.current?.flyTo({
      center: [2.4183, 6.3703],
      zoom: 2.5,
      pitch: 45,
      bearing: 0,
      duration: 1000,
    });
  };

  return (
    <div className="relative w-full h-[65vh] md:h-[70vh] lg:h-[80vh] rounded-lg overflow-hidden shadow-xl bg-gradient-to-br from-sky-50 to-blue-50/50">
      <div ref={mapContainerRef} id="globe-container" className="absolute inset-0" />

      {/* Control buttons */}
      <div className="absolute top-4 left-4 z-20 flex flex-col space-y-2">
        <Button onClick={zoomIn} size="icon" variant="secondary" className="bg-white/90 backdrop-blur-sm hover:scale-105 transition">
          <Plus className="h-5 w-5 text-sky-700" />
        </Button>
        <Button onClick={zoomOut} size="icon" variant="secondary" className="bg-white/90 backdrop-blur-sm hover:scale-105 transition">
          <Minus className="h-5 w-5 text-sky-700" />
        </Button>
        <Button onClick={resetView} size="icon" variant="secondary" className="bg-white/90 backdrop-blur-sm hover:rotate-90 transition">
          <RotateCcw className="h-5 w-5 text-sky-700" />
        </Button>
      </div>

      {/* Toggle points */}
      <Button
        variant="outline"
        size="sm"
        className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm border-sky-200"
        onClick={() => setShowPoints(!showPoints)}
      >
        {showPoints ? "Masquer points" : "Afficher points"}
      </Button>

      {/* Data dialog */}
      <Dialog open={!!selectedData} onOpenChange={() => setSelectedData(null)}>
        <DialogContent className="sm:max-w-lg bg-white/95 border-sky-200 text-sky-900 backdrop-blur-md">
          <DialogHeader className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-sky-600" />
              <DialogTitle>Détails Qualité Air</DialogTitle>
            </div>
            <button onClick={() => setSelectedData(null)} className="text-sky-500 hover:text-sky-700">
              <X className="h-5 w-5" />
            </button>
          </DialogHeader>

          {selectedData && (
            <div className="mt-2 space-y-3 text-sm">
              <DialogDescription className="flex justify-between items-center">
                <span>
                  {selectedData.location} ({selectedData.lat.toFixed(2)}°N, {selectedData.lon.toFixed(2)}°E)
                </span>
                <Badge variant={getAQIColorVariant(selectedData.aqi)}>{selectedData.aqi} AQI</Badge>
              </DialogDescription>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p>PM2.5 : {selectedData.pm25} µg/m³</p>
                  <p>Source : {selectedData.source}</p>
                  {selectedData.groundValidation && (
                    <p className="text-green-600 text-xs">
                      Validation sol : {selectedData.groundValidation}%
                    </p>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-sky-700 mb-1">Recommandations</h4>
                  <ul className="list-disc list-inside text-sky-600 text-xs space-y-1">
                    {generateRecommendations(selectedData).map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
