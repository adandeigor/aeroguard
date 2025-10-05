"use client";
import { useState } from "react";
import SplashScreen from "@/components/sections/SplashScreen";
import HeroSection from "@/components/sections/hero-section";
import StatsSection from "@/components/sections/stats-section";
import TrendsMainSection from "@/components/sections/trends-section";
import GlobeSection from "@/components/sections/globe-section";
import DemoSection from "@/components/sections/demo-section";

export default function Home() {
    const [loading, setLoading] = useState(true);

    return (
        <>
            {/* SplashScreen */}
            {loading && <SplashScreen onFinish={() => setLoading(false)} />}

            {/* Contenu principal */}
            {!loading && (
                <main className="min-h-screen">
                    <HeroSection />
                    <StatsSection />
                    <TrendsMainSection />
                    <DemoSection />
                    <GlobeSection />
                </main>
            )}
        </>
    );
}
