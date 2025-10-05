'use client';

import React, { useState } from 'react';
import { HelpCircle, RotateCcw, BookOpen, X } from 'lucide-react';
import { Button } from './ui/button';

interface HelpButtonProps {
  onRestartTour: () => void;
}

export default function HelpButton({ onRestartTour }: HelpButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Help Menu */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-2xl border-2 border-sky-200 p-4 w-64 animate-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sky-900">Need Help?</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-sky-600 hover:text-sky-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={() => {
                onRestartTour();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-sky-50 transition text-left"
            >
              <div className="p-2 bg-sky-100 rounded-lg">
                <RotateCcw className="h-5 w-5 text-sky-600" />
              </div>
              <div>
                <p className="font-semibold text-sky-900 text-sm">Restart Tour</p>
                <p className="text-xs text-sky-600">See the guide again</p>
              </div>
            </button>

            <a
              href="/learn"
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-sky-50 transition text-left"
            >
              <div className="p-2 bg-sky-100 rounded-lg">
                <BookOpen className="h-5 w-5 text-sky-600" />
              </div>
              <div>
                <p className="font-semibold text-sky-900 text-sm">Learn More</p>
                <p className="text-xs text-sky-600">About air quality</p>
              </div>
            </a>
          </div>
        </div>
      )}

      {/* Help Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="lg"
        className="h-14 w-14 rounded-full bg-sky-500 hover:bg-sky-600 shadow-2xl hover:scale-110 transition-all duration-300"
      >
        <HelpCircle className="h-7 w-7 text-white" />
      </Button>
    </div>
  );
}
