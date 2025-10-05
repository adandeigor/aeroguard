import React, { useEffect, useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MapPin, Search } from "lucide-react";

export type LocationData = 
    | { type: "gps"; latitude: number; longitude: number }
    | { type: "manual"; country: string; city: string };

interface CountryCityAlertDialogProps {
    onLocationSelect?: (location: LocationData) => void;
}

export function CountryCityAlertDialog({ onLocationSelect }: CountryCityAlertDialogProps) {
    type CountryWithCities = { country: string; cities: string[] };

    const [countriesData, setCountriesData] = useState<CountryWithCities[]>([]);
    const [countries, setCountries] = useState<string[]>([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [cities, setCities] = useState<string[]>([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [geoLoading, setGeoLoading] = useState(false);
    const [gpsCoordinates, setGpsCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
    const [useGpsMode, setUseGpsMode] = useState(false);
    const [fetchingCoordinates, setFetchingCoordinates] = useState(false);

    useEffect(() => {
        const fetchCountriesWithCities = async () => {
            setLoading(true);
            setError("");
            try {
                // API gratuite: récupère tous les pays avec leurs villes
                // Doc: https://countriesnow.space/api/v0.1/countries
                const response = await fetch(
                    "https://countriesnow.space/api/v0.1/countries"
                );
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                const json = await response.json();
                const data: CountryWithCities[] = json?.data || [];

                setCountriesData(data);
                const names = data.map((c) => c.country).sort((a, b) => a.localeCompare(b));
                setCountries(names);
            } catch (err) {
                console.error("Erreur lors du chargement des pays:", err);
                setError(
                    "Impossible de charger la liste des pays. Vérifiez votre connexion."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchCountriesWithCities();
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            const found = countriesData.find(
                (c) => c.country.toLowerCase() === selectedCountry.toLowerCase()
            );
            setCities(found?.cities?.slice().sort((a, b) => a.localeCompare(b)) || []);
            setSelectedCity("");
        } else {
            setCities([]);
            setSelectedCity("");
        }
    }, [selectedCountry, countriesData]);

    // Récupérer les coordonnées GPS quand pays/ville sont sélectionnés manuellement
    useEffect(() => {
        const fetchCoordinatesForCity = async () => {
            if (selectedCountry && selectedCity && !useGpsMode) {
                setFetchingCoordinates(true);
                try {
                    // Utiliser l'API de géocodage pour obtenir les coordonnées
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(selectedCity)}&country=${encodeURIComponent(selectedCountry)}&format=json&limit=1`
                    );
                    
                    if (response.ok) {
                        const data = await response.json();
                        if (data && data.length > 0) {
                            const { lat, lon } = data[0];
                            setGpsCoordinates({
                                latitude: parseFloat(lat),
                                longitude: parseFloat(lon)
                            });
                        }
                    }
                } catch (err) {
                    console.error("Erreur lors de la récupération des coordonnées:", err);
                } finally {
                    setFetchingCoordinates(false);
                }
            }
        };

        fetchCoordinatesForCity();
    }, [selectedCity, selectedCountry, useGpsMode]);

    const handleUseMyLocation = async () => {
        setGeoLoading(true);
        setError("");

        if (!navigator.geolocation) {
            setError("La géolocalisation n'est pas supportée par votre navigateur.");
            setGeoLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;

                    // Stocker les coordonnées GPS pour une précision maximale
                    setGpsCoordinates({ latitude, longitude });
                    setUseGpsMode(true);

                    // Utiliser l'API de géocodage inversé gratuite (BigDataCloud) pour affichage
                    const response = await fetch(
                        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=fr`
                    );

                    if (!response.ok) {
                        throw new Error("Impossible de récupérer la localisation");
                    }

                    const data = await response.json();
                    const detectedCountry = data.countryName;
                    const detectedCity = data.city || data.locality || data.principalSubdivision;

                    if (!detectedCountry) {
                        setError("Impossible de déterminer votre pays.");
                        setGeoLoading(false);
                        return;
                    }

                    // Normaliser le nom du pays (enlever les articles comme "(le)", "(la)", etc.)
                    const normalizeCountryName = (name: string) => {
                        return name
                            .replace(/\s*\([^)]*\)\s*/g, '') // Enlever les parenthèses et leur contenu
                            .trim()
                            .toLowerCase();
                    };

                    // Trouver le pays correspondant dans notre liste (pour affichage uniquement)
                    const matchedCountry = countriesData.find(
                        (c) => normalizeCountryName(c.country) === normalizeCountryName(detectedCountry)
                    );

                    if (matchedCountry) {
                        setSelectedCountry(matchedCountry.country);

                        // Si la ville détectée existe dans la liste, la sélectionner
                        if (detectedCity) {
                            const matchedCity = matchedCountry.cities.find(
                                (city) => city.toLowerCase() === detectedCity.toLowerCase()
                            );
                            if (matchedCity) {
                                setSelectedCity(matchedCity);
                            }
                        }
                    } else {
                        // Ne pas afficher d'erreur, juste logger
                        console.warn(`Pays détecté (${detectedCountry}) non trouvé dans la liste.`);
                        // Les coordonnées GPS sont déjà stockées, c'est suffisant
                    }
                } catch (err) {
                    console.error("Erreur lors de la géolocalisation:", err);
                    setError("Impossible de récupérer votre localisation. Réessayez.");
                } finally {
                    setGeoLoading(false);
                }
            },
            (err) => {
                console.error("Erreur de géolocalisation:", err);
                setError(
                    err.code === 1
                        ? "Vous avez refusé l'accès à la localisation."
                        : "Impossible d'obtenir votre position."
                );
                setGeoLoading(false);
            }
        );
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger className="cursor-pointer">
                <Search className="h-4 w-4 text-sky-800" />
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-gradient-to-br from-sky-100/90 to-sky-50/80 backdrop-blur-xl border-2 border-sky-200/60 rounded-2xl">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-sky-900 font-bold text-xl drop-shadow-sm">
                        Sélectionnez votre localisation
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-sky-700/90 font-medium">
                        {useGpsMode && gpsCoordinates ? (
                            <span className="text-green-600 font-semibold">
                                📍 Localisation GPS activée (précision maximale)
                            </span>
                        ) : (
                            "Utilisez votre localisation GPS ou sélectionnez manuellement un pays et une ville."
                        )}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                {error && (
                    <div className="text-red-700 text-sm mb-4 p-3 bg-red-50/60 rounded-xl shadow-[inset_2px_2px_8px_rgba(239,68,68,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.6)] font-medium">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <button
                        type="button"
                        onClick={handleUseMyLocation}
                        disabled={loading || geoLoading || (selectedCountry !== "" && selectedCity !== "")}
                        className="w-full flex items-center justify-center gap-2 p-3 bg-sky-100/60 hover:bg-sky-200/60 text-sky-800 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_12px_rgba(2,132,199,0.15),-4px_-4px_12px_rgba(255,255,255,0.8)] hover:shadow-[6px_6px_16px_rgba(2,132,199,0.2),-6px_-6px_16px_rgba(255,255,255,0.9)] active:shadow-[inset_2px_2px_8px_rgba(2,132,199,0.2),inset_-2px_-2px_6px_rgba(255,255,255,0.5)]"
                    >
                        <MapPin className="h-5 w-5" />
                        {geoLoading ? "Localisation en cours..." : "Utiliser ma localisation"}
                    </button>
                    
                    {gpsCoordinates && (
                        <div className="relative p-4 bg-gradient-to-br from-green-50/90 to-emerald-50/80 backdrop-blur-sm border-2 border-green-200/60 rounded-xl shadow-[4px_4px_16px_rgba(34,197,94,0.15),-4px_-4px_16px_rgba(255,255,255,0.9)] overflow-hidden">
                            {/* Inner shadow for depth */}
                            <div className="absolute inset-[1px] rounded-xl shadow-[inset_2px_2px_6px_rgba(34,197,94,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.5)]" />
                            
                            <div className="relative z-10 space-y-2">
                                <p className="font-bold text-green-800 flex items-center gap-2 drop-shadow-sm">
                                    <span className="p-1.5 bg-green-200/50 rounded-lg shadow-[2px_2px_6px_rgba(34,197,94,0.2),-2px_-2px_6px_rgba(255,255,255,0.8)]">
                                        📍
                                    </span>
                                    {useGpsMode ? "Localisation GPS détectée" : "Localisation sélectionnée"}
                                </p>
                                <div className="p-3 bg-green-50/60 rounded-lg shadow-[inset_2px_2px_6px_rgba(34,197,94,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.6)]">
                                    <p className="text-green-700 font-semibold text-sm">
                                        Position: {gpsCoordinates.latitude.toFixed(4)}°, {gpsCoordinates.longitude.toFixed(4)}°
                                    </p>
                                </div>
                                {selectedCountry && selectedCity && (
                                    <p className="text-green-600 text-xs font-medium mt-1">
                                        {selectedCity}, {selectedCountry}
                                    </p>
                                )}
                                {useGpsMode && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setUseGpsMode(false);
                                            setGpsCoordinates(null);
                                            setSelectedCountry("");
                                            setSelectedCity("");
                                        }}
                                        className="mt-2 text-xs text-green-700 hover:text-green-900 underline font-medium"
                                    >
                                        Utiliser le formulaire manuel à la place
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                    <div>
                        <label
                            htmlFor="country-select"
                            className="block text-sm font-semibold mb-2 text-sky-800 drop-shadow-sm"
                        >
                            Pays :
                        </label>
                        <select
                            id="country-select"
                            value={selectedCountry}
                            onChange={(e) => {
                                setSelectedCountry(e.target.value);
                                setUseGpsMode(false); // Basculer en mode manuel
                                setGpsCoordinates(null);
                            }}
                            disabled={loading || useGpsMode}
                            className="w-full p-3 bg-sky-50/60 border-2 border-sky-200/60 rounded-xl shadow-[inset_2px_2px_6px_rgba(2,132,199,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.6)] text-sky-900 font-medium focus:outline-none focus:ring-2 focus:ring-sky-400/50 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60 transition-all"
                        >
                            <option value="">--Sélectionner un pays--</option>
                            {loading ? (
                                <option disabled>Chargement...</option>
                            ) : (
                                countries.map((name) => (
                                    <option key={name} value={name}>
                                        {name}
                                    </option>
                                ))
                            )}
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="city-select"
                            className="block text-sm font-semibold mb-2 text-sky-800 drop-shadow-sm"
                        >
                            Ville :
                        </label>
                        <select
                            id="city-select"
                            value={selectedCity}
                            onChange={(e) => {
                                setSelectedCity(e.target.value);
                                setUseGpsMode(false); // Basculer en mode manuel
                                setGpsCoordinates(null);
                            }}
                            disabled={!selectedCountry || loading || useGpsMode}
                            className="w-full p-3 bg-sky-50/60 border-2 border-sky-200/60 rounded-xl shadow-[inset_2px_2px_6px_rgba(2,132,199,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.6)] text-sky-900 font-medium focus:outline-none focus:ring-2 focus:ring-sky-400/50 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60 transition-all"
                        >
                            <option value="">--Sélectionner une ville--</option>
                            {loading ? (
                                <option disabled>Chargement...</option>
                            ) : (
                                cities.map((city) => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))
                            )}
                        </select>
                    </div>
                </div>

                <AlertDialogFooter className="gap-3">
                    <AlertDialogCancel className="bg-sky-50/60 hover:bg-sky-100/60 text-sky-800 border-2 border-sky-200/60 rounded-xl font-semibold shadow-[4px_4px_12px_rgba(2,132,199,0.15),-4px_-4px_12px_rgba(255,255,255,0.8)] hover:shadow-[6px_6px_16px_rgba(2,132,199,0.2),-6px_-6px_16px_rgba(255,255,255,0.9)] transition-all">
                        Annuler
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled={(!selectedCountry || !selectedCity || fetchingCoordinates) && !gpsCoordinates}
                        onClick={async () => {
                            if (gpsCoordinates) {
                                // Toujours utiliser les coordonnées GPS si disponibles (meilleure précision)
                                await onLocationSelect?.({
                                    type: "gps",
                                    latitude: gpsCoordinates.latitude,
                                    longitude: gpsCoordinates.longitude,
                                });
                            } else if (selectedCountry && selectedCity) {
                                // Fallback : utiliser pays/ville si pas de coordonnées
                                await onLocationSelect?.({
                                    type: "manual",
                                    country: selectedCountry,
                                    city: selectedCity,
                                });
                            }
                        }}
                        className="bg-gradient-to-br from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white border-0 rounded-xl font-bold shadow-[4px_4px_16px_rgba(2,132,199,0.3),-2px_-2px_8px_rgba(255,255,255,0.2)] hover:shadow-[6px_6px_20px_rgba(2,132,199,0.4),-3px_-3px_10px_rgba(255,255,255,0.3)] active:shadow-[inset_2px_2px_8px_rgba(2,132,199,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {fetchingCoordinates ? "Récupération..." : "Continuer"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
