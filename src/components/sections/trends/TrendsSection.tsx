'use client';

import React, { useState } from "react";
import { TimePeriod, HistoricalDataPoint } from "./types";
import { PeriodSelector } from "./PeriodSelector";
import { TrendsChart } from "./TrendsChart";
import { HistoricalStats } from "./HistoricalStats";
import { getHistoricalDataByPeriod } from "@/lib/mockData";

export default function TrendsSection() {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("7d");
  const [historicalData, setHistoricalData] = useState<HistoricalDataPoint[]>(
    getHistoricalDataByPeriod("7d")
  );

  const handlePeriodChange = (period: TimePeriod) => {
    setSelectedPeriod(period);
    setHistoricalData(getHistoricalDataByPeriod(period));
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 space-y-6">
      <div className="flex flex-col gap-y-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-2xl font-bold text-sky-900">Historical Trends</h2>
        <PeriodSelector selected={selectedPeriod} onChange={handlePeriodChange} />
      </div>
      
      <TrendsChart data={historicalData} period={selectedPeriod} />
      
      <HistoricalStats data={historicalData} />
    </div>
  );
}
