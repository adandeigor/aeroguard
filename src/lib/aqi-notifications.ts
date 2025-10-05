import { toast } from "sonner";

/**
 * Catégories AQI selon les standards EPA (Environmental Protection Agency)
 */
export type AQICategory = "good" | "moderate" | "unhealthy-sensitive" | "unhealthy" | "very-unhealthy" | "hazardous";

export interface AQILevel {
    category: AQICategory;
    label: string;
    color: string;
    bgColor: string;
    borderColor: string;
    icon: string;
    description: string;
}

/**
 * Détermine la catégorie AQI en fonction du score
 * @param aqi Score AQI (0-500)
 * @returns Catégorie AQI
 */
export function getAQICategory(aqi: number): AQICategory {
    if (aqi <= 50) return "good";
    if (aqi <= 100) return "moderate";
    if (aqi <= 150) return "unhealthy-sensitive";
    if (aqi <= 200) return "unhealthy";
    if (aqi <= 300) return "very-unhealthy";
    return "hazardous";
}

/**
 * Récupère les informations de niveau AQI
 * @param aqi Score AQI
 * @returns Informations complètes du niveau AQI
 */
export function getAQILevel(aqi: number): AQILevel {
    const category = getAQICategory(aqi);

    const levels: Record<AQICategory, AQILevel> = {
        "good": {
            category: "good",
            label: "Bonne",
            color: "text-green-800",
            bgColor: "bg-green-50/90",
            borderColor: "border-green-200/60",
            icon: "😊",
            description: "La qualité de l'air est excellente. Profitez de vos activités en plein air !"
        },
        "moderate": {
            category: "moderate",
            label: "Modérée",
            color: "text-yellow-800",
            bgColor: "bg-yellow-50/90",
            borderColor: "border-yellow-200/60",
            icon: "😐",
            description: "Qualité de l'air acceptable. Les personnes sensibles devraient limiter les activités prolongées en extérieur."
        },
        "unhealthy-sensitive": {
            category: "unhealthy-sensitive",
            label: "Mauvaise pour les groupes sensibles",
            color: "text-orange-800",
            bgColor: "bg-orange-50/90",
            borderColor: "border-orange-200/60",
            icon: "😷",
            description: "Les enfants, personnes âgées et personnes souffrant de problèmes respiratoires devraient éviter les efforts prolongés en extérieur."
        },
        "unhealthy": {
            category: "unhealthy",
            label: "Mauvaise",
            color: "text-red-800",
            bgColor: "bg-red-50/90",
            borderColor: "border-red-200/60",
            icon: "😨",
            description: "Tout le monde devrait réduire les activités en extérieur. Portez un masque si nécessaire."
        },
        "very-unhealthy": {
            category: "very-unhealthy",
            label: "Très mauvaise",
            color: "text-purple-800",
            bgColor: "bg-purple-50/90",
            borderColor: "border-purple-200/60",
            icon: "🚨",
            description: "Alerte sanitaire ! Restez à l'intérieur et utilisez un purificateur d'air."
        },
        "hazardous": {
            category: "hazardous",
            label: "Dangereuse",
            color: "text-rose-900",
            bgColor: "bg-rose-50/90",
            borderColor: "border-rose-200/60",
            icon: "☠️",
            description: "Urgence sanitaire ! Restez à l'intérieur, fermez les fenêtres. Consultez un médecin si nécessaire."
        }
    };

    return levels[category];
}

/**
 * Affiche une notification toast stylisée en fonction du niveau AQI
 * @param aqi Score AQI
 * @param location Nom de la localisation
 * @param pm25 Niveau de PM2.5 (optionnel)
 */
export function showAQINotification(aqi: number, location: string, pm25?: number) {
    const level = getAQILevel(aqi);

    const title = `${level.icon} ${location}`;
    const description = `Qualité de l'air : ${level.label}\nAQI : ${aqi}${pm25 ? `\nPM2.5 : ${pm25} µg/m³` : ''}\n\n${level.description}`;

    // Choisir le type de toast en fonction de la catégorie
    switch (level.category) {
        case "good":
            toast.success(title, {
                description,
                duration: 5000,
                className: `${level.bgColor} ${level.borderColor} border-2 shadow-[4px_4px_16px_rgba(34,197,94,0.2),-4px_-4px_16px_rgba(255,255,255,0.9)]`,
            });
            break;
        case "moderate":
            toast.info(title, {
                description,
                duration: 6000,
                className: `${level.bgColor} ${level.borderColor} border-2 shadow-[4px_4px_16px_rgba(234,179,8,0.2),-4px_-4px_16px_rgba(255,255,255,0.9)]`,
            });
            break;
        case "unhealthy-sensitive":
            toast.warning(title, {
                description,
                duration: 7000,
                className: `${level.bgColor} ${level.borderColor} border-2 shadow-[4px_4px_16px_rgba(249,115,22,0.2),-4px_-4px_16px_rgba(255,255,255,0.9)]`,
            });
            break;
        case "unhealthy":
        case "very-unhealthy":
        case "hazardous":
            toast.error(title, {
                description,
                duration: 10000,
                className: `${level.bgColor} ${level.borderColor} border-2 shadow-[4px_4px_16px_rgba(239,68,68,0.2),-4px_-4px_16px_rgba(255,255,255,0.9)]`,
            });
            break;
    }
}

/**
 * Affiche une notification d'erreur lors de l'échec de récupération des données
 * @param message Message d'erreur personnalisé
 */
export function showAQIErrorNotification(message?: string) {
    toast.error("⚠️ Erreur de récupération", {
        description: message || "Impossible de récupérer les données de qualité de l'air. Veuillez réessayer.",
        duration: 5000,
        className: "bg-red-50/90 border-red-200/60 border-2 shadow-[4px_4px_16px_rgba(239,68,68,0.2),-4px_-4px_16px_rgba(255,255,255,0.9)]",
    });
}

/**
 * Affiche une notification de chargement
 * @param message Message de chargement
 * @returns ID du toast pour pouvoir le fermer plus tard
 */
export function showAQILoadingNotification(message: string = "Récupération des données...") {
    return toast.loading(`🔄 ${message}`, {
        className: "bg-sky-50/90 border-sky-200/60 border-2 shadow-[4px_4px_16px_rgba(2,132,199,0.2),-4px_-4px_16px_rgba(255,255,255,0.9)]",
    });
}

/**
 * Affiche une notification de succès générique
 * @param message Message de succès
 */
export function showSuccessNotification(message: string) {
    toast.success(`✅ ${message}`, {
        duration: 4000,
        className: "bg-green-50/90 border-green-200/60 border-2 shadow-[4px_4px_16px_rgba(34,197,94,0.2),-4px_-4px_16px_rgba(255,255,255,0.9)]",
    });
}
