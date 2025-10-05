'use client';

import React, { useState, useEffect } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';

const tourSteps: Step[] = [
  {
    target: 'body',
    content: (
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-sky-900">Welcome to AeroGuard! 🌍</h2>
        <p className="text-sky-700">
          Your comprehensive air quality monitoring platform for West Africa. 
          Let's take a quick tour to show you around!
        </p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '.stats-section',
    content: (
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-sky-900">1. Live Air Quality Stats</h3>
        <p className="text-sky-700">
          View real-time air quality data for your location, including AQI levels, 
          weather conditions, and active alerts.
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '.aqi-card',
    content: (
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-sky-900">2. Current AQI</h3>
        <p className="text-sky-700">
          The Air Quality Index (AQI) shows how clean or polluted your air is. 
          Lower values mean better air quality.
        </p>
      </div>
    ),
    placement: 'right',
  },
  {
    target: '.weather-card',
    content: (
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-sky-900">3. Weather Information</h3>
        <p className="text-sky-700">
          Current weather conditions that may affect air quality, including 
          temperature, humidity, and atmospheric conditions.
        </p>
      </div>
    ),
    placement: 'left',
  },
  {
    target: '.alert-card',
    content: (
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-sky-900">4. Air Quality Alerts</h3>
        <p className="text-sky-700">
          Receive real-time alerts when air quality reaches unhealthy levels. 
          Get actionable recommendations to protect your health.
        </p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '.details-card',
    content: (
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-sky-900">5. Detailed Breakdown</h3>
        <p className="text-sky-700">
          View detailed pollutant levels (PM2.5, NO₂, O₃, SO₂) and get 
          personalized health recommendations based on current conditions.
        </p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '.trends-section',
    content: (
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-sky-900">6. Historical Trends</h3>
        <p className="text-sky-700">
          Analyze air quality patterns over time with interactive charts. 
          Switch between 24 hours, 7 days, or 30 days views.
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '.period-selector',
    content: (
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-sky-900">7. Time Period Selector</h3>
        <p className="text-sky-700">
          Choose different time ranges to see how air quality has changed 
          over hours, days, or weeks.
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '.trends-chart',
    content: (
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-sky-900">8. Interactive Chart</h3>
        <p className="text-sky-700">
          Hover over the chart to see detailed AQI values at specific times. 
          Track trends and identify patterns in air quality.
        </p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '.historical-stats',
    content: (
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-sky-900">9. Statistical Summary</h3>
        <p className="text-sky-700">
          Quick overview of average AQI, best and worst days, and overall 
          air quality trends for the selected period.
        </p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '.demo-section',
    content: (
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-sky-900">10. Multi-Location Demo</h3>
        <p className="text-sky-700">
          Explore air quality data across different cities in West Africa. 
          Compare conditions and alerts between locations.
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '.globe-section',
    content: (
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-sky-900">11. Global Air Quality Map</h3>
        <p className="text-sky-700">
          Interactive 3D globe showing air quality data across West Africa. 
          Click on points to see detailed information for each location.
        </p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: 'body',
    content: (
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-sky-900">You're All Set! 🎉</h2>
        <p className="text-sky-700">
          You now know how to use AeroGuard to monitor air quality and protect 
          your health. Start exploring and stay informed!
        </p>
        <p className="text-sm text-sky-600 mt-4">
          Tip: You can restart this tour anytime from the help menu.
        </p>
      </div>
    ),
    placement: 'center',
  },
];

interface AppTourProps {
  run?: boolean;
  onComplete?: () => void;
}

export default function AppTour({ run = false, onComplete }: AppTourProps) {
  const [runTour, setRunTour] = useState(false);

  useEffect(() => {
    // Check if user has seen the tour before
    const hasSeenTour = localStorage.getItem('aeroguard-tour-completed');
    if (!hasSeenTour && run) {
      // Delay tour start to ensure all elements are rendered
      setTimeout(() => setRunTour(true), 1000);
    }
  }, [run]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRunTour(false);
      localStorage.setItem('aeroguard-tour-completed', 'true');
      if (onComplete) onComplete();
    }
  };

  return (
    <Joyride
      steps={tourSteps}
      run={runTour}
      continuous
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: '#0ea5e9', // sky-500
          textColor: '#0c4a6e', // sky-900
          backgroundColor: '#ffffff',
          overlayColor: 'rgba(0, 0, 0, 0.5)',
          arrowColor: '#ffffff',
          zIndex: 10000,
        },
        tooltip: {
          borderRadius: 16,
          padding: 24,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
        tooltipContainer: {
          textAlign: 'left',
        },
        tooltipTitle: {
          color: '#0c4a6e', // sky-900
          fontSize: '1.25rem',
          fontWeight: 700,
        },
        tooltipContent: {
          color: '#0369a1', // sky-700
          fontSize: '1rem',
          padding: '12px 0',
        },
        buttonNext: {
          backgroundColor: '#0ea5e9', // sky-500
          borderRadius: 8,
          padding: '10px 20px',
          fontSize: '0.875rem',
          fontWeight: 600,
          color: '#ffffff',
          outline: 'none',
        },
        buttonBack: {
          color: '#0369a1', // sky-700
          marginRight: 10,
          fontSize: '0.875rem',
          fontWeight: 600,
        },
        buttonSkip: {
          color: '#64748b', // slate-500
          fontSize: '0.875rem',
        },
        buttonClose: {
          color: '#64748b',
        },
        beacon: {
          backgroundColor: '#0ea5e9',
          borderColor: '#0ea5e9',
        },
        beaconInner: {
          backgroundColor: '#0ea5e9',
        },
        beaconOuter: {
          backgroundColor: 'rgba(14, 165, 233, 0.2)',
          borderColor: '#0ea5e9',
        },
      }}
      locale={{
        back: 'Back',
        close: 'Close',
        last: 'Finish',
        next: 'Next',
        skip: 'Skip Tour',
      }}
    />
  );
}
