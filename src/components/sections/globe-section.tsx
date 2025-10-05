'use client';

import { Suspense } from 'react';
import GlobeViewComponent from './globe';

export default function GlobeSection() {
  return (
    <section className="w-full bg-gradient-to-br from-blue-50 to-sky-50 py-12 px-4" id="globe">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-2 font-rosnoc lowercase">
            Global Air Quality Map
          </h2>
          <p className="text-sky-700 text-lg">
            Explore air quality data across West Africa
          </p>
        </div>
        <Suspense fallback={<div className="text-center text-sky-600">Loading globe...</div>}>
          <GlobeViewComponent />
        </Suspense>
      </div>
    </section>
  );
}
