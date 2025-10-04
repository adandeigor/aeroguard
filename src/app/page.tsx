"use client";
import { useState } from "react";
import SplashScreen from "@/components/section/SplashScreen";
import HeroSection from "@/components/sections/hero-section";

export default function Home() {
    const [loading, setLoading] = useState(true);

    return (
        <>
            {/* SplashScreen */}
            {loading && <SplashScreen onFinish={() => setLoading(false)} />}

            {/* Contenu principal */}
            {!loading && (
                <HeroSection/>
            )}
        </>
    );
}
