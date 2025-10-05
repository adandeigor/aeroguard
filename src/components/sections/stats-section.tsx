'use client';

import { Suspense } from 'react';
import LiveStatsSection from './live-stats';

export default function StatsSection() {
  return (
    <section className="w-full bg-gradient-to-br from-sky-50 to-sky-100 py-12 px-4" id="previsions">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold font text-sky-900 mb-2">
            Live Air Quality Stats
          </h2>
          <p className="text-sky-700 text-lg">
            Real-time air quality monitoring for your location
          </p>
        </div>
        <Suspense fallback={<div className="text-center text-sky-600">Loading live stats...</div>}>
          <LiveStatsSection />
        </Suspense>
      </div>
    </section>
  );
}
