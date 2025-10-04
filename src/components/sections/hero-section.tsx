// components/HeroSection.tsx
import { Suspense } from 'react';
import LiveStatsSection from './live-stats';
import GlobeView from './globe';

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-100 py-8 px-4">
      <div className="container flex flex-col md:flex-row gap-8 mx-auto">
        <Suspense fallback={<div className="text-center text-sky-600">Loading live stats...</div>}>
          <LiveStatsSection />
        </Suspense>
        <Suspense fallback={<div className="text-center text-sky-600">Loading globe...</div>}>
          <GlobeView />
        </Suspense>
      </div>
    </section>
  );
}