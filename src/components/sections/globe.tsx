// components/GlobeView.tsx
'use client';
import { useState, useEffect, useRef } from 'react';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer } from '@deck.gl/layers';
import { _GlobeView, PickingInfo } from '@deck.gl/core';
import maplibregl from 'maplibre-gl';  // Corrected import: unscoped, lowercase
import { AirQualityData, mockGlobeData, generateRecommendations } from '@/types/air';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';  // For close icon if needed

export default function GlobeView() {
  const [viewState, setViewState] = useState({
    longitude: 2.4183,  // Cotonou center
    latitude: 6.3703,
    zoom: 4,  // Africa/Ouest view for context
    pitch: 0,
    bearing: 0,
  });
  const [map, setMap] = useState<maplibregl.Map | null>(null);
  const [selectedData, setSelectedData] = useState<AirQualityData | null>(null);
  const [hoveredData, setHoveredData] = useState<AirQualityData | null>(null);

  useEffect(() => {
    // Initialize MapLibre globe
    const mapInstance = new maplibregl.Map({
      container: mapContainerRef.current || 'globe-container',
      style: 'https://demotiles.maplibre.org/style.json',  // Open-source tiles
      center: [viewState.longitude, viewState.latitude],
      zoom: viewState.zoom,
      pitch: viewState.pitch,
      bearing: viewState.bearing,
    });

    mapInstance.on('load', () => {
      setMap(mapInstance);
    });

    mapInstance.on('move', () => {
      setViewState({
        ...viewState,
        longitude: mapInstance.getCenter().lng,
        latitude: mapInstance.getCenter().lat,
        zoom: mapInstance.getZoom(),
        pitch: mapInstance.getPitch(),
        bearing: mapInstance.getBearing(),
      });
    });

    return () => mapInstance.remove();
  }, []);

  const mapContainerRef = useRef<HTMLDivElement>(null);

  const layers = [
    new ScatterplotLayer<AirQualityData>({
      id: 'air-points',
      data: mockGlobeData,
      getPosition: (d: AirQualityData) => [d.lon, d.lat, 0],
      getRadius: (d: AirQualityData) => Math.max(50, d.pm25 * 3),  // Dynamic size by PM2.5
      getFillColor: (d: AirQualityData) => {
        const aqi = d.aqi;
        if (aqi < 50) return [144, 238, 144, 180];  // Green semi-transparent
        if (aqi < 100) return [255, 255, 0, 180];   // Yellow
        if (aqi < 150) return [255, 165, 0, 180];   // Orange
        return [255, 0, 0, 180];  // Red
      },
      pickable: true,
      onHover: ({ object }: PickingInfo) => setHoveredData(object || null),
      onClick: ({ object }: PickingInfo) => setSelectedData(object || null),}),
  ];

  const getAQIColorVariant = (aqi: number): 'default' | 'secondary' | 'destructive' => {
    if (aqi < 50) return 'default';  // Green
    if (aqi < 100) return 'secondary';  // Yellow/orange
    return 'destructive';  // Red
  };

  return (
    <div className="w-full h-[60vh] md:h-[70vh] relative rounded-lg overflow-hidden shadow-lg bg-sky-50/50">
      <div ref={mapContainerRef} id="globe-container" className="absolute inset-0" />
      {map && (
        <DeckGL
          initialViewState={viewState}
          controller={true}  // Interactions: rotate, pinch, pan
          layers={layers}
          getTooltip={(info) => {
            const object = info.object as AirQualityData | undefined;
            if (!object) return null;
            return {
              html: `
                <div class="bg-sky-50/95 text-sky-950 p-3 rounded-lg shadow-md border border-sky-200 min-w-[150px]">
                  <p class="font-semibold text-sm">${object.location || 'Station'}</p>
                  <div class="text-xs mt-1">AQI: ${object.aqi}</div>
                  <p class="text-xs mt-1">PM2.5: ${object.pm25} µg/m³</p>
                </div>
              `
            };
          }}
          views={new _GlobeView({})}
        />
      )}

      {/* Details Dialog on Click */}
      <Dialog open={!!selectedData} onOpenChange={() => setSelectedData(null)}>
        <DialogContent className="sm:max-w-md bg-sky-50/95 border-sky-200 text-sky-950 backdrop-blur-sm max-h-[80vh] overflow-y-auto">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-sky-950 flex-1">Air Quality Details</DialogTitle>
            <button onClick={() => setSelectedData(null)} className="text-sky-600 hover:text-sky-800">
              <X className="h-5 w-5" />
            </button>
          </DialogHeader>
          <DialogDescription className="text-sky-700 mb-4">
            At {selectedData?.location} ({selectedData?.lat?.toFixed(4)}, {selectedData?.lon?.toFixed(4)})
          </DialogDescription>
          {selectedData && (
            <div className="space-y-4">
              <Badge 
                variant={getAQIColorVariant(selectedData.aqi)} 
                className="text-sm px-3 py-1"
              >
                AQI: {selectedData.aqi} | PM2.5: {selectedData.pm25} µg/m³
              </Badge>
              <div className="text-sm space-y-2">
                <p><span className="font-medium text-sky-600">Timestamp:</span> {selectedData.timestamp.toLocaleString()}</p>
                <div>
                  <h4 className="font-semibold text-sky-800 mb-2">Health Recommendations</h4>
                  <ul className="space-y-1 text-sky-700 list-disc list-inside">
                    {generateRecommendations(selectedData).map((rec, idx) => (
                      <li key={idx} className="text-sm">{rec}</li>
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