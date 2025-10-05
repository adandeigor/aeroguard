"use client";
import { useState } from "react";
import SplashScreen from "@/components/sections/SplashScreen";
import StatsSection from "@/components/sections/stats-section";
import TrendsMainSection from "@/components/sections/trends-section";
import GlobeSection from "@/components/sections/globe-section";
import DemoSection from "@/components/sections/demo-section";
import AppTour from "@/components/AppTour";
import HelpButton from "@/components/HelpButton";

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [startTour, setStartTour] = useState(false);

    const handleSplashFinish = () => {
        setLoading(false);
        setStartTour(true);
    };

    const handleRestartTour = () => {
        localStorage.removeItem('aeroguard-tour-completed');
        setStartTour(true);
    };

    return (
        <>
            {/* SplashScreen */}
            {loading && <SplashScreen onFinish={handleSplashFinish} />}

            {/* Contenu principal */}
            {!loading && (
                <>
                    <main className="min-h-screen">
                        <StatsSection />
                        <TrendsMainSection />
                        <DemoSection />
                        <GlobeSection />
                    </main>
                    <AppTour run={startTour} onComplete={() => setStartTour(false)} />
                    <HelpButton onRestartTour={handleRestartTour} />
                </>
            )}
        </>
    );
}
