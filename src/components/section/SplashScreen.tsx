"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

interface SplashScreenProps {
    onFinish?: () => void;
}

const title = "AEROGUARD";

export default function SplashScreen({ onFinish }: SplashScreenProps) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // Timer pour masquer l'écran
        const timer = setTimeout(() => {
            setVisible(false);
            if (onFinish) onFinish();
        }, 5000); // durée d'affichage 5s

        return () => clearTimeout(timer);
    }, [onFinish]);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-sky-950 text-sky-200">
            {/* Nom du projet avec TextGenerateEffect */}
            <TextGenerateEffect
                words={title}
                duration={3}
                className="text-2xl md:text-4xl lg:text-5xl font-rosnoc text-sky-200"
            />

            {/* Logo + concepteur */}
            <div className="absolute bottom-8 flex justify-center items-center gap-2">
                <Image
                    src="/CodeXplore.png"
                    alt="Logo AEROGUARD"
                    width={30}
                    height={30}
                    className="opacity-80"
                />
                <p className="text-xs font-satoshi text-sky-200">
                    By CodeXplore
                </p>
            </div>
        </div>
    );
}
