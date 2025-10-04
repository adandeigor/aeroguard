import { CountryCityAlertDialog, LocationData } from "./CountryCityAlertDialog";

/**
 * Exemple d'utilisation du composant CountryCityAlertDialog
 * 
 * Ce composant permet de récupérer soit :
 * - Des coordonnées GPS (latitude/longitude) pour une précision maximale
 * - Un pays et une ville sélectionnés manuellement
 */

export function ExampleUsage() {
    const handleLocationSelect = async (location: LocationData) => {
        console.log("Localisation sélectionnée:", location);

        // Construire la requête API en fonction du type de localisation
        if (location.type === "gps") {
            // Mode GPS : utiliser les coordonnées pour une meilleure précision
            const apiUrl = `https://api.example.com/weather?lat=${location.latitude}&lon=${location.longitude}`;
            
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                console.log("Données météo (GPS):", data);
                
                // Traiter les données...
            } catch (error) {
                console.error("Erreur lors de la requête API (GPS):", error);
            }
        } else if (location.type === "manual") {
            // Mode manuel : utiliser pays/ville
            const apiUrl = `https://api.example.com/weather?country=${encodeURIComponent(location.country)}&city=${encodeURIComponent(location.city)}`;
            
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                console.log("Données météo (manuel):", data);
                
                // Traiter les données...
            } catch (error) {
                console.error("Erreur lors de la requête API (manuel):", error);
            }
        }
    };

    return (
        <div>
            <h1>Exemple d&apos;utilisation</h1>
            <CountryCityAlertDialog onLocationSelect={handleLocationSelect} />
        </div>
    );
}

/**
 * Exemple avec OpenWeatherMap API
 */
export function WeatherExample() {
    const OPENWEATHER_API_KEY = "YOUR_API_KEY"; // Remplacer par votre clé API

    const fetchWeather = async (location: LocationData) => {
        let apiUrl = "";

        if (location.type === "gps") {
            // Utiliser les coordonnées GPS (plus précis)
            apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=fr`;
        } else {
            // Utiliser le nom de la ville
            apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location.city)},${encodeURIComponent(location.country)}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=fr`;
        }

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            const data = await response.json();
            
            console.log("Météo:", {
                temperature: data.main.temp,
                description: data.weather[0].description,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
            });

            return data;
        } catch (error) {
            console.error("Erreur lors de la récupération de la météo:", error);
            throw error;
        }
    };

    return (
        <div>
            <h1>Météo</h1>
            <CountryCityAlertDialog onLocationSelect={fetchWeather} />
        </div>
    );
}

/**
 * Exemple avec gestion d'état React
 */
export function StatefulExample() {
    const [weatherData, setWeatherData] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const handleLocationSelect = async (location: LocationData) => {
        setLoading(true);
        setError("");

        try {
            let apiUrl = "";

            if (location.type === "gps") {
                // API avec coordonnées GPS
                apiUrl = `https://api.example.com/data?lat=${location.latitude}&lon=${location.longitude}`;
            } else {
                // API avec pays/ville
                apiUrl = `https://api.example.com/data?country=${encodeURIComponent(location.country)}&city=${encodeURIComponent(location.city)}`;
            }

            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des données");
            }

            const data = await response.json();
            setWeatherData(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Une erreur est survenue");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <CountryCityAlertDialog onLocationSelect={handleLocationSelect} />
            
            {loading && <p>Chargement...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {weatherData && (
                <div>
                    <h2>Données reçues:</h2>
                    <pre>{JSON.stringify(weatherData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}
