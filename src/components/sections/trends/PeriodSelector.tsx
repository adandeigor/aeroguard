import React from "react";
import { TimePeriod } from "./types";

interface PeriodSelectorProps {
  selected: TimePeriod;
  onChange: (period: TimePeriod) => void;
}

export const PeriodSelector: React.FC<PeriodSelectorProps> = ({ selected, onChange }) => {
  const periods: { value: TimePeriod; label: string }[] = [
    { value: "24h", label: "24 Hours" },
    { value: "7d", label: "7 Days" },
    { value: "30d", label: "30 Days" },
  ];

  return (
    <div className="flex gap-2 p-1 bg-sky-100/60 rounded-xl shadow-[inset_2px_2px_6px_rgba(2,132,199,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.6)]">
      {periods.map((period) => (
        <button
          key={period.value}
          onClick={() => onChange(period.value)}
          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
            selected === period.value
              ? "bg-sky-500 text-white shadow-[4px_4px_12px_rgba(2,132,199,0.3),-2px_-2px_8px_rgba(255,255,255,0.5)]"
              : "text-sky-700 hover:bg-sky-200/50"
          }`}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
};
