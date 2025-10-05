# Système de Notifications AQI

Ce système de notifications utilise **Sonner** pour afficher des alertes colorées et stylisées en fonction du score AQI (Air Quality Index).

## 📊 Catégories AQI

Le système suit les standards EPA (Environmental Protection Agency) :

| AQI Range | Catégorie | Couleur | Icône | Description |
|-----------|-----------|---------|-------|-------------|
| 0-50 | **Bonne** | 🟢 Vert | 😊 | Excellente qualité de l'air |
| 51-100 | **Modérée** | 🟡 Jaune | 😐 | Acceptable, sensibles limiter efforts |
| 101-150 | **Mauvaise (sensibles)** | 🟠 Orange | 😷 | Groupes sensibles éviter extérieur |
| 151-200 | **Mauvaise** | 🔴 Rouge | 😨 | Tout le monde réduire activités |
| 201-300 | **Très mauvaise** | 🟣 Violet | 🚨 | Alerte sanitaire |
| 301+ | **Dangereuse** | 🔴 Rose foncé | ☠️ | Urgence sanitaire |

## 🚀 Utilisation

### 1. Import des fonctions

```typescript
import { 
    showAQINotification,
    showAQIErrorNotification,
    showAQILoadingNotification,
    showSuccessNotification,
    getAQILevel,
    getAQICategory
} from "@/lib/aqi-notifications";
```

### 2. Afficher une notification AQI

```typescript
// Notification avec AQI et PM2.5
showAQINotification(75, "Cotonou, Benin", 30);

// Notification avec AQI uniquement
showAQINotification(150, "Paris, France");
```

### 3. Notification de chargement

```typescript
const loadingToast = showAQILoadingNotification("Récupération des données...");

// Plus tard, fermer le toast
import { toast } from "sonner";
toast.dismiss(loadingToast);
```

### 4. Notification d'erreur

```typescript
showAQIErrorNotification("Impossible de contacter l'API");
```

### 5. Notification de succès

```typescript
showSuccessNotification("Données mises à jour avec succès");
```

## 🎨 Design System

Toutes les notifications utilisent le design neumorphique avec :
- Gradients subtils
- Ombres doubles (externes)
- Bordures colorées selon la catégorie
- Transitions fluides
- Palette de couleurs cohérente avec l'application

## 📝 Exemple complet avec CountryCityAlertDialog

```typescript
"use client";

import { CountryCityAlertDialog, LocationData } from "@/components/sections/CountryCityAlertDialog";
import { showAQINotification, showAQILoadingNotification, showAQIErrorNotification } from "@/lib/aqi-notifications";
import { toast } from "sonner";

export function MyComponent() {
    const handleLocationSelect = async (location: LocationData) => {
        const loadingToast = showAQILoadingNotification();

        try {
            // Appel API
            const apiUrl = location.type === "gps"
                ? `https://api.example.com/aqi?lat=${location.latitude}&lon=${location.longitude}`
                : `https://api.example.com/aqi?city=${location.city}&country=${location.country}`;

            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error("Erreur API");

            const data = await response.json();

            // Fermer le loading
            toast.dismiss(loadingToast);

            // Afficher le résultat
            showAQINotification(data.aqi, data.location, data.pm25);

        } catch (error) {
            toast.dismiss(loadingToast);
            showAQIErrorNotification("Impossible de récupérer les données");
        }
    };

    return <CountryCityAlertDialog onLocationSelect={handleLocationSelect} />;
}
```

## 🔧 Fonctions utilitaires

### `getAQILevel(aqi: number): AQILevel`

Retourne les informations complètes d'un niveau AQI :

```typescript
const level = getAQILevel(125);
console.log(level);
// {
//   category: "unhealthy-sensitive",
//   label: "Mauvaise pour les groupes sensibles",
//   color: "text-orange-800",
//   bgColor: "bg-orange-50/90",
//   borderColor: "border-orange-200/60",
//   icon: "😷",
//   description: "Les enfants, personnes âgées..."
// }
```

### `getAQICategory(aqi: number): AQICategory`

Retourne uniquement la catégorie :

```typescript
const category = getAQICategory(75); // "moderate"
```

## 🎯 Intégration dans l'application

Le `Toaster` est déjà configuré dans `src/app/layout.tsx` :

```typescript
<Toaster 
    position="top-right"
    expand={true}
    richColors
    closeButton
/>
```

## 📦 Fichiers du système

- **`src/lib/aqi-notifications.ts`** : Fonctions de notification
- **`src/components/sections/AQIAlertExample.tsx`** : Exemple d'utilisation complet
- **`src/app/layout.tsx`** : Configuration du Toaster

## 🎨 Personnalisation

Pour modifier les styles, éditez les classes Tailwind dans `aqi-notifications.ts` :

```typescript
className: `${level.bgColor} ${level.borderColor} border-2 shadow-[...]`
```

## 📱 Responsive

Les notifications sont automatiquement responsive grâce à Sonner et s'adaptent à tous les écrans.
