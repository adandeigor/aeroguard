"use client";

import { useState } from "react";
import { CountryCityAlertDialog, LocationData } from "./CountryCityAlertDialog";
import { 
    showAQINotification, 
    showAQIErrorNotification, 
    showAQILoadingNotification,
    showSuccessNotification,
    getAQILevel 
} from "@/lib/aqi-notifications";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Sparkles, MapPin as MapPinIcon, Wind } from "lucide-react";

/**
 * Démo réaliste du système de notifications AQI
 */
export function AQIAlertExample() {
    const [aqiData, setAqiData] = useState<{
        aqi: number;
        pm25: number;
        location: string;
        coordinates: { lat: number; lon: number };
    } | null>(null);
    const [isRunningDemo, setIsRunningDemo] = useState(false);

    const handleLocationSelect = async (location: LocationData) => {
        // Afficher une notification de chargement
        const loadingToast = showAQILoadingNotification("Récupération des données de qualité de l'air...");

        try {
            // Simuler un appel API (remplacer par votre vraie API)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Exemple de données mockées (remplacer par votre vraie API)
            const mockAQIData = {
                aqi: Math.floor(Math.random() * 200) + 20, // AQI entre 20 et 220
                pm25: Math.floor(Math.random() * 50) + 10, // PM2.5 entre 10 et 60
                location: location.type === "gps" 
                    ? `${location.latitude.toFixed(2)}°, ${location.longitude.toFixed(2)}°`
                    : `${location.city}, ${location.country}`,
                coordinates: location.type === "gps"
                    ? { lat: location.latitude, lon: location.longitude }
                    : { lat: 0, lon: 0 } // Devrait être récupéré de l'API
            };

            // Fermer le toast de chargement
            toast.dismiss(loadingToast);

            // Mettre à jour l'état
            setAqiData(mockAQIData);

            // Afficher la notification AQI avec le style approprié
            showAQINotification(mockAQIData.aqi, mockAQIData.location, mockAQIData.pm25);

            // Exemple d'appel API réel (commenté)
            /*
            const apiUrl = location.type === "gps"
                ? `https://api.openaq.org/v2/latest?coordinates=${location.latitude},${location.longitude}&radius=25000`
                : `https://api.openaq.org/v2/latest?city=${encodeURIComponent(location.city)}&country=${encodeURIComponent(location.country)}`;

            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des données");
            }

            const data = await response.json();
            // Traiter les données de l'API...
            */

        } catch (error) {
            // Fermer le toast de chargement
            toast.dismiss(loadingToast);

            // Afficher une notification d'erreur
            showAQIErrorNotification(
                error instanceof Error 
                    ? error.message 
                    : "Impossible de récupérer les données de qualité de l'air"
            );

            console.error("Erreur lors de la récupération des données AQI:", error);
        }
    };

    // Démo automatique avec scénario réaliste
    const runRealisticDemo = async () => {
        setIsRunningDemo(true);

        const scenarios = [
            { location: "Paris, France", aqi: 45, pm25: 18, delay: 0 },
            { location: "Cotonou, Bénin", aqi: 85, pm25: 35, delay: 4000 },
            { location: "New Delhi, Inde", aqi: 175, pm25: 68, delay: 8000 },
            { location: "Beijing, Chine", aqi: 155, pm25: 58, delay: 12000 },
            { location: "Los Angeles, USA", aqi: 95, pm25: 38, delay: 16000 },
        ];

        for (const scenario of scenarios) {
            setTimeout(() => {
                const loadingToast = showAQILoadingNotification(`Analyse de ${scenario.location}...`);
                
                setTimeout(() => {
                    toast.dismiss(loadingToast);
                    showAQINotification(scenario.aqi, scenario.location, scenario.pm25);
                    setAqiData({
                        aqi: scenario.aqi,
                        pm25: scenario.pm25,
                        location: scenario.location,
                        coordinates: { lat: 0, lon: 0 }
                    });
                }, 1200);
            }, scenario.delay);
        }

        // Fin de la démo
        setTimeout(() => {
            setIsRunningDemo(false);
            showSuccessNotification("Démo terminée !");
        }, 20000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-100 py-12 px-4">
            <div className="container mx-auto max-w-6xl space-y-8">
            {/* Bouton de sélection de localisation */}
            <Card className="relative bg-gradient-to-br from-sky-100/90 to-sky-50/80 backdrop-blur-xl border-2 border-sky-200/60 shadow-[8px_8px_24px_rgba(2,132,199,0.15),-8px_-8px_24px_rgba(255,255,255,0.9)] rounded-2xl overflow-hidden">
                <div className="absolute inset-[1px] rounded-2xl shadow-[inset_2px_2px_8px_rgba(2,132,199,0.1),inset_-2px_-2px_8px_rgba(255,255,255,0.5)]" />
                
                <CardHeader className="relative z-10">
                    <CardTitle className="text-sky-900 font-bold flex items-center gap-2">
                        Vérifier la qualité de l'air
                    </CardTitle>
                    <CardDescription className="text-sky-700/90 font-medium">
                        Sélectionnez votre localisation pour obtenir les données AQI en temps réel
                    </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                    <CountryCityAlertDialog onLocationSelect={handleLocationSelect} />
                </CardContent>
            </Card>

            {/* Affichage des données AQI */}
            {aqiData && (
                <Card className="relative bg-gradient-to-br from-sky-100/90 to-sky-50/80 backdrop-blur-xl border-2 border-sky-200/60 shadow-[8px_8px_24px_rgba(2,132,199,0.15),-8px_-8px_24px_rgba(255,255,255,0.9)] rounded-2xl overflow-hidden">
                    <div className="absolute inset-[1px] rounded-2xl shadow-[inset_2px_2px_8px_rgba(2,132,199,0.1),inset_-2px_-2px_8px_rgba(255,255,255,0.5)]" />
                    
                    <CardHeader className="relative z-10">
                        <CardTitle className="text-sky-900 font-bold flex items-center justify-between">
                            <span>Résultats pour {aqiData.location}</span>
                            <Badge className={`${getAQILevel(aqiData.aqi).bgColor} ${getAQILevel(aqiData.aqi).color} border-2 ${getAQILevel(aqiData.aqi).borderColor} text-base px-4 py-1 shadow-[2px_2px_8px_rgba(0,0,0,0.1)] font-bold`}>
                                AQI: {aqiData.aqi}
                            </Badge>
                        </CardTitle>
                        <CardDescription className="text-sky-700/90 font-medium">
                            {getAQILevel(aqiData.aqi).label}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10 space-y-4">
                        <div className="p-4 bg-sky-50/60 rounded-xl shadow-[inset_2px_2px_8px_rgba(2,132,199,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.6)]">
                            <p className="text-sm text-sky-700 font-semibold">PM2.5: {aqiData.pm25} µg/m³</p>
                        </div>
                        <div className={`p-4 ${getAQILevel(aqiData.aqi).bgColor} rounded-xl border-2 ${getAQILevel(aqiData.aqi).borderColor} shadow-[2px_2px_8px_rgba(0,0,0,0.1)]`}>
                            <p className={`text-sm ${getAQILevel(aqiData.aqi).color} font-medium`}>
                                {getAQILevel(aqiData.aqi).description}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}

                {/* Démo réaliste automatique */}
                <Card className="relative bg-gradient-to-br from-purple-100/90 to-purple-50/80 backdrop-blur-xl border-2 border-purple-200/60 shadow-[8px_8px_24px_rgba(168,85,247,0.15),-8px_-8px_24px_rgba(255,255,255,0.9)] rounded-2xl overflow-hidden">
                    <div className="absolute inset-[1px] rounded-2xl shadow-[inset_2px_2px_8px_rgba(168,85,247,0.1),inset_-2px_-2px_8px_rgba(255,255,255,0.5)]" />
                    
                    <CardHeader className="relative z-10">
                        <CardTitle className="text-purple-900 font-bold flex items-center gap-2">
                            <Sparkles className="h-6 w-6" />
                            Démo Automatique Réaliste
                        </CardTitle>
                        <CardDescription className="text-purple-700/90 font-medium">
                            Simulation d'analyse de qualité de l'air dans 5 villes du monde
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10 space-y-4">
                        <button
                            onClick={runRealisticDemo}
                            disabled={isRunningDemo}
                            className="w-full p-4 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl font-bold shadow-[4px_4px_16px_rgba(168,85,247,0.3),-2px_-2px_8px_rgba(255,255,255,0.2)] hover:shadow-[6px_6px_20px_rgba(168,85,247,0.4),-3px_-3px_10px_rgba(255,255,255,0.3)] active:shadow-[inset_2px_2px_8px_rgba(168,85,247,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <Play className="h-5 w-5" />
                            {isRunningDemo ? "Démo en cours..." : "Lancer la démo (20s)"}
                        </button>
                        
                        <div className="p-4 bg-purple-50/60 rounded-xl shadow-[inset_2px_2px_6px_rgba(168,85,247,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.6)]">
                            <p className="text-xs text-purple-700 font-medium">
                                🌍 Paris → Cotonou → New Delhi → Beijing → Los Angeles
                            </p>
                            <p className="text-xs text-purple-600 mt-1">
                                Chaque ville affichera son niveau AQI avec une notification colorée
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Boutons de test rapide */}
                <Card className="relative bg-gradient-to-br from-sky-100/90 to-sky-50/80 backdrop-blur-xl border-2 border-sky-200/60 shadow-[8px_8px_24px_rgba(2,132,199,0.15),-8px_-8px_24px_rgba(255,255,255,0.9)] rounded-2xl overflow-hidden">
                    <div className="absolute inset-[1px] rounded-2xl shadow-[inset_2px_2px_8px_rgba(2,132,199,0.1),inset_-2px_-2px_8px_rgba(255,255,255,0.5)]" />
                    
                    <CardHeader className="relative z-10">
                        <CardTitle className="text-sky-900 font-bold flex items-center gap-2">
                            <Wind className="h-6 w-6" />
                            Tests Rapides par Niveau
                        </CardTitle>
                        <CardDescription className="text-sky-700/90 font-medium">
                            Cliquez sur un niveau pour voir la notification correspondante
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            <button
                                onClick={() => showAQINotification(30, "Paris, France", 15)}
                                className="p-3 bg-green-100/60 hover:bg-green-200/60 text-green-800 rounded-xl font-semibold transition-all shadow-[2px_2px_8px_rgba(34,197,94,0.2),-2px_-2px_6px_rgba(255,255,255,0.8)] hover:shadow-[4px_4px_12px_rgba(34,197,94,0.3),-4px_-4px_10px_rgba(255,255,255,0.9)] active:scale-95"
                            >
                                😊 Bonne
                            </button>
                            <button
                                onClick={() => showAQINotification(75, "Tokyo, Japon", 30)}
                                className="p-3 bg-yellow-100/60 hover:bg-yellow-200/60 text-yellow-800 rounded-xl font-semibold transition-all shadow-[2px_2px_8px_rgba(234,179,8,0.2),-2px_-2px_6px_rgba(255,255,255,0.8)] hover:shadow-[4px_4px_12px_rgba(234,179,8,0.3),-4px_-4px_10px_rgba(255,255,255,0.9)] active:scale-95"
                            >
                                😐 Modérée
                            </button>
                            <button
                                onClick={() => showAQINotification(125, "Mexico City, Mexique", 45)}
                                className="p-3 bg-orange-100/60 hover:bg-orange-200/60 text-orange-800 rounded-xl font-semibold transition-all shadow-[2px_2px_8px_rgba(249,115,22,0.2),-2px_-2px_6px_rgba(255,255,255,0.8)] hover:shadow-[4px_4px_12px_rgba(249,115,22,0.3),-4px_-4px_10px_rgba(255,255,255,0.9)] active:scale-95"
                            >
                                😷 Sensibles
                            </button>
                            <button
                                onClick={() => showAQINotification(175, "Mumbai, Inde", 65)}
                                className="p-3 bg-red-100/60 hover:bg-red-200/60 text-red-800 rounded-xl font-semibold transition-all shadow-[2px_2px_8px_rgba(239,68,68,0.2),-2px_-2px_6px_rgba(255,255,255,0.8)] hover:shadow-[4px_4px_12px_rgba(239,68,68,0.3),-4px_-4px_10px_rgba(255,255,255,0.9)] active:scale-95"
                            >
                                😨 Mauvaise
                            </button>
                            <button
                                onClick={() => showAQINotification(250, "Dhaka, Bangladesh", 85)}
                                className="p-3 bg-purple-100/60 hover:bg-purple-200/60 text-purple-800 rounded-xl font-semibold transition-all shadow-[2px_2px_8px_rgba(168,85,247,0.2),-2px_-2px_6px_rgba(255,255,255,0.8)] hover:shadow-[4px_4px_12px_rgba(168,85,247,0.3),-4px_-4px_10px_rgba(255,255,255,0.9)] active:scale-95"
                            >
                                🚨 Très mauvaise
                            </button>
                            <button
                                onClick={() => showAQINotification(350, "Lahore, Pakistan", 120)}
                                className="p-3 bg-rose-100/60 hover:bg-rose-200/60 text-rose-900 rounded-xl font-semibold transition-all shadow-[2px_2px_8px_rgba(244,63,94,0.2),-2px_-2px_6px_rgba(255,255,255,0.8)] hover:shadow-[4px_4px_12px_rgba(244,63,94,0.3),-4px_-4px_10px_rgba(255,255,255,0.9)] active:scale-95"
                            >
                                ☠️ Dangereuse
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
