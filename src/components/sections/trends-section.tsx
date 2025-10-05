'use client';

import { Suspense } from 'react';
import TrendsSection from './trends/TrendsSection';

export default function TrendsMainSection() {
  return (
    <section className="trends-section w-full bg-gradient-to-br from-sky-50 to-blue-50/50 py-12 px-4">
      <div className="container mx-auto">
        <Suspense fallback={<div className="text-center text-sky-600">Loading trends...</div>}>
          <TrendsSection />
        </Suspense>
      </div>
    </section>
  );
}
