# 🎭 Démo Réaliste des Notifications AQI

## 📍 Accès à la démo

La démo est accessible à l'URL : `/mascot`

## 🎬 Fonctionnalités de la démo

### 1. **Démo Automatique (20 secondes)**

Cliquez sur le bouton violet **"Lancer la démo (20s)"** pour voir une simulation réaliste d'analyse de qualité de l'air dans 5 villes du monde :

1. **Paris, France** (AQI: 45) - 😊 Bonne qualité
2. **Cotonou, Bénin** (AQI: 85) - 😐 Modérée
3. **New Delhi, Inde** (AQI: 175) - 😨 Mauvaise
4. **Beijing, Chine** (AQI: 155) - 😷 Mauvaise pour sensibles
5. **Los Angeles, USA** (AQI: 95) - 😐 Modérée

**Scénario** :
- Chaque ville est analysée avec un délai de 4 secondes
- Affichage d'une notification de chargement
- Puis notification colorée selon le niveau AQI
- Mise à jour de la carte de résultats
- Notification de succès à la fin

### 2. **Tests Rapides par Niveau**

6 boutons colorés permettent de tester instantanément chaque niveau AQI avec des villes réelles :

| Bouton | Ville | AQI | PM2.5 | Couleur |
|--------|-------|-----|-------|---------|
| 😊 Bonne | Paris, France | 30 | 15 | Vert |
| 😐 Modérée | Tokyo, Japon | 75 | 30 | Jaune |
| 😷 Sensibles | Mexico City, Mexique | 125 | 45 | Orange |
| 😨 Mauvaise | Mumbai, Inde | 175 | 65 | Rouge |
| 🚨 Très mauvaise | Dhaka, Bangladesh | 250 | 85 | Violet |
| ☠️ Dangereuse | Lahore, Pakistan | 350 | 120 | Rose foncé |

### 3. **Sélection Manuelle de Localisation**

Utilisez le `CountryCityAlertDialog` pour :
- Sélectionner manuellement un pays et une ville
- Utiliser la géolocalisation GPS du navigateur
- Voir les coordonnées GPS récupérées automatiquement
- Obtenir une notification AQI aléatoire (pour la démo)

## 🎨 Design des Notifications

Toutes les notifications utilisent le design neumorphique cohérent :

### Couleurs par niveau AQI

```
0-50    : Vert    (bg-green-50/90, border-green-200/60)
51-100  : Jaune   (bg-yellow-50/90, border-yellow-200/60)
101-150 : Orange  (bg-orange-50/90, border-orange-200/60)
151-200 : Rouge   (bg-red-50/90, border-red-200/60)
201-300 : Violet  (bg-purple-50/90, border-purple-200/60)
301+    : Rose    (bg-rose-50/90, border-rose-200/60)
```

### Éléments visuels

- **Icônes emoji** expressives (😊, 😐, 😷, 😨, 🚨, ☠️)
- **Ombres neumorphiques** doubles pour effet 3D
- **Gradients subtils** pour profondeur
- **Bordures colorées** selon le niveau
- **Durées adaptées** : 5s (bon) → 10s (dangereux)

## 🔧 Utilisation Technique

### Import

```typescript
import { AQIAlertExample } from "@/components/sections/AQIAlertExample";
```

### Intégration

```tsx
export default function Page() {
    return (
        <div>
            <AQIAlertExample />
        </div>
    );
}
```

## 📊 Données Affichées

Chaque notification affiche :
- **Titre** : Icône + Nom de la ville
- **Description** :
  - Qualité de l'air (Bonne, Modérée, etc.)
  - Score AQI
  - Niveau PM2.5 (µg/m³)
  - Recommandations santé

## 🎯 Cas d'Usage Réalistes

### Scénario 1 : Voyageur
Un utilisateur planifie un voyage et vérifie la qualité de l'air de plusieurs destinations.

### Scénario 2 : Résident
Un habitant vérifie quotidiennement la qualité de l'air de sa ville pour planifier ses activités extérieures.

### Scénario 3 : Personne sensible
Une personne asthmatique ou âgée vérifie si les conditions sont sûres pour sortir.

### Scénario 4 : Alerte pollution
Notification automatique quand le niveau AQI dépasse un seuil critique.

## 🚀 Améliorations Futures

- [ ] Intégration avec une vraie API (OpenAQ, IQAir, etc.)
- [ ] Historique des mesures
- [ ] Graphiques d'évolution
- [ ] Alertes push personnalisées
- [ ] Comparaison entre villes
- [ ] Prévisions AQI
- [ ] Partage sur réseaux sociaux
- [ ] Export PDF des rapports

## 📱 Responsive

La démo est entièrement responsive :
- **Mobile** : Grille 2 colonnes pour les boutons
- **Tablet** : Grille 3 colonnes
- **Desktop** : Affichage optimal avec max-width 6xl

## 🎓 Valeur Pédagogique

Cette démo permet de :
- Comprendre les niveaux AQI et leur signification
- Visualiser l'impact de la pollution dans différentes villes
- Apprendre les recommandations santé par niveau
- Tester l'UX des notifications avant intégration production

## ✅ Checklist de Test

- [ ] Lancer la démo automatique
- [ ] Tester les 6 boutons de niveau
- [ ] Utiliser le sélecteur de localisation manuel
- [ ] Tester la géolocalisation GPS
- [ ] Vérifier le responsive (mobile/desktop)
- [ ] Observer les transitions et animations
- [ ] Lire les descriptions de chaque niveau
- [ ] Fermer manuellement les notifications

---

**Note** : Cette démo utilise des données mockées. Pour une utilisation en production, remplacez les appels simulés par de vraies requêtes API.
