"use client";
import { useState } from "react";
import SplashScreen from "@/components/section/SplashScreen";

export default function Home() {
    const [loading, setLoading] = useState(true);

    return (
        <>
            {/* SplashScreen */}
            {loading && <SplashScreen onFinish={() => setLoading(false)} />}

            {/* Contenu principal */}
            {!loading && (
                <div className="flex justify-center items-center h-screen bg-sky-100 mx-auto w-sm max-w-md p-4 shadow-lg">
                    <h1 className="font-rosnoc text-2xl">AEROGUARD</h1>
                </div>
            )}
        </>
    );
}
