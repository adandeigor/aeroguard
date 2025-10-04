"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import * as maplibregl from "maplibre-gl";
import { MapboxOverlay } from "@deck.gl/mapbox";
import { ScatterplotLayer } from "@deck.gl/layers";
import { PickingInfo } from "@deck.gl/core";
import { AirQualityData } from "./globe/types";
import { mockGlobeData } from "./globe/data";
import { getAQIColor, getRadiusByLevel } from "./globe/utils";
import { HoverTooltip } from "./globe/HoverTooltip";
import { DetailDialog } from "./globe/DetailDialog";
import { MapControls } from "./globe/MapControls";

export default function GlobeViewComponent() {
  const [selectedData, setSelectedData] = useState<AirQualityData | null>(null);
  const [hoveredData, setHoveredData] = useState<AirQualityData | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null);
  const [showPoints, setShowPoints] = useState(true);
  const [currentData, setCurrentData] = useState<AirQualityData[]>(mockGlobeData);
  
  const mapRef = useRef<maplibregl.Map | null>(null);
  const overlayRef = useRef<MapboxOverlay | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Filter data by zoom level
  const updateDataByZoom = useCallback((zoom: number) => {
    let levelFilter: AirQualityData["level"][];
    if (zoom < 3) levelFilter = ["country"];
    else if (zoom < 5) levelFilter = ["city"];
    else if (zoom < 8) levelFilter = ["department"];
    else levelFilter = ["locality", "department", "city"];
    const filtered = mockGlobeData.filter((d) => levelFilter.includes(d.level));
    setCurrentData(filtered);
  }, []);

  // Zoom helpers (defined before airLayer to avoid dependency issues)
  const zoomToPoint = useCallback((d: AirQualityData) => {
    if (!mapRef.current) return;
    const targetZoom =
      d.level === "country" ? 3 :
      d.level === "city" ? 5 :
      d.level === "department" ? 7 : 9;
    mapRef.current.flyTo({
      center: [d.lon, d.lat],
      zoom: targetZoom,
      pitch: 55,
      duration: 1000,
    });
  }, []);

  // Dynamic DeckGL layer
  const airLayer = useMemo(() => {
    if (!showPoints || currentData.length === 0) return null;
    
    return new ScatterplotLayer<AirQualityData>({
      id: "air-layer",
      data: currentData,
      getPosition: (d) => [d.lon, d.lat, 0],
      getRadius: (d) => getRadiusByLevel(d, hoveredData?.id === d.id),
      getFillColor: (d) => getAQIColor(d.aqi),
      pickable: true,
      autoHighlight: true,
      highlightColor: [255, 255, 255, 200],
      onHover: (info: PickingInfo<AirQualityData>) => {
        const { object, x, y } = info;
        setHoveredData(object || null);
        setHoverPosition(object && x !== undefined && y !== undefined ? { x, y } : null);
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
  }, [hoveredData?.id, showPoints, currentData, zoomToPoint]);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

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
      const newOverlay = new MapboxOverlay({
        interleaved: true,
        layers: [],
      });
      mapInstance.addControl(newOverlay);
      overlayRef.current = newOverlay;
      mapRef.current = mapInstance;
      updateDataByZoom(mapInstance.getZoom());
    });

    mapInstance.on("zoomend", () => {
      updateDataByZoom(mapInstance.getZoom());
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [updateDataByZoom]);

  // Sync layers
  useEffect(() => {
    if (!overlayRef.current) return;
    
    const layers = airLayer ? [airLayer] : [];
    overlayRef.current.setProps({ layers });
  }, [airLayer]);

  // Other zoom helpers
  const zoomIn = useCallback(() => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      mapRef.current.easeTo({ zoom: currentZoom + 1, duration: 400 });
    }
  }, []);

  const zoomOut = useCallback(() => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      mapRef.current.easeTo({ zoom: currentZoom - 1, duration: 400 });
    }
  }, []);

  const resetView = useCallback(() => {
    if (!mapRef.current) return;
    mapRef.current.flyTo({
      center: [2.4183, 6.3703],
      zoom: 2.5,
      pitch: 45,
      bearing: 0,
      duration: 1000,
    });
  }, []);

  return (
    <div className="relative w-full h-[65vh] md:h-[70vh] lg:h-[80vh] rounded-lg overflow-hidden shadow-xl bg-gradient-to-br from-sky-50 to-blue-50/50">
      <div
        ref={mapContainerRef}
        id="globe-container"
        className="absolute inset-0"
      />

      <MapControls
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onReset={resetView}
        showPoints={showPoints}
        onTogglePoints={() => setShowPoints(!showPoints)}
      />

      <HoverTooltip data={hoveredData} position={hoverPosition} />
      
      <DetailDialog data={selectedData} onClose={() => setSelectedData(null)} />
    </div>
  );
}
