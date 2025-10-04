import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus, RotateCcw } from "lucide-react";

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  showPoints: boolean;
  onTogglePoints: () => void;
}

export const MapControls: React.FC<MapControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onReset,
  showPoints,
  onTogglePoints,
}) => {
  return (
    <>
      {/* Zoom Controls */}
      <div className="absolute top-4 left-4 z-20 flex flex-col space-y-2">
        <Button
          onClick={onZoomIn}
          size="icon"
          variant="secondary"
          className="bg-white/90 backdrop-blur-sm hover:scale-105 transition shadow-lg"
        >
          <Plus className="h-5 w-5 text-sky-700" />
        </Button>
        <Button
          onClick={onZoomOut}
          size="icon"
          variant="secondary"
          className="bg-white/90 backdrop-blur-sm hover:scale-105 transition shadow-lg"
        >
          <Minus className="h-5 w-5 text-sky-700" />
        </Button>
        <Button
          onClick={onReset}
          size="icon"
          variant="secondary"
          className="bg-white/90 backdrop-blur-sm hover:rotate-90 transition shadow-lg"
        >
          <RotateCcw className="h-5 w-5 text-sky-700" />
        </Button>
      </div>

      {/* Toggle Points */}
      <Button
        variant="outline"
        size="sm"
        className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm border-sky-200 shadow-lg"
        onClick={onTogglePoints}
      >
        {showPoints ? "Hide Points" : "Show Points"}
      </Button>
    </>
  );
};
