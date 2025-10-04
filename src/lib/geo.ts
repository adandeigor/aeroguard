// utils/geo.ts
// Haversine formula for lat/lon distance (km) – simple, accurate for hack
export function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;  // Earth radius km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Project mouse x,y to rough lat/lon on globe (spherical approx, good for hack)
export function mouseToLatLon(x: number, y: number, width: number, height: number, theta: number, phi: number): [number, number] {
  const normalizedX = (x / width - 0.5) * 2;
  const normalizedY = (y / height - 0.5) * 2;
  const lat = Math.asin(normalizedY) * 180 / Math.PI + 6.3703;  // Offset to Cotonou lat
  const lon = Math.atan2(normalizedX, Math.cos(lat * Math.PI / 180)) * 180 / Math.PI + 2.4183;  // Offset to lon
  return [lat, lon];
}