'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCard } from './alerts/AlertCard';
import { mockAlertDataSafe, mockAlertDataActive, mockAlertDataModerate, mockLocationsData } from '@/lib/mockData';

export default function DemoSection() {
  const [selectedLocation, setSelectedLocation] = useState(0);
  const currentLocation = mockLocationsData[selectedLocation];

  return (
    <section className="w-full bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-2">
            Live Demo - Different Locations
          </h2>
          <p className="text-purple-700 text-lg">
            Explore air quality across multiple cities
          </p>
        </div>

        {/* Location Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {mockLocationsData.map((loc, index) => (
            <Button
              key={index}
              onClick={() => setSelectedLocation(index)}
              variant={selectedLocation === index ? "default" : "outline"}
              className={`${
                selectedLocation === index
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "border-purple-300 text-purple-700 hover:bg-purple-100"
              }`}
            >
              {loc.location}
            </Button>
          ))}
        </div>

        {/* Alert Display */}
        <div className="max-w-2xl mx-auto">
          <AlertCard data={currentLocation.alert} location={currentLocation.location} />
        </div>

        {/* Stats Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-purple-900">AQI Level</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-purple-600">{currentLocation.aqi}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-purple-900">PM2.5</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-purple-600">{currentLocation.pm25} µg/m³</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-purple-900">Alert Status</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-purple-600">
                {currentLocation.alert.alert ? "⚠️ Active" : "✅ Safe"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
