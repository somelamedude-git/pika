export default function getRandomLocation(lat, lng, radiusInKm) {
  const radiusInDegrees = radiusInKm / 111.32;

  const u = Math.random();
  const v = Math.random();

  const w = radiusInDegrees * Math.sqrt(u);
  const t = 2 * Math.PI * v;

  const deltaLat = w * Math.cos(t);
  const deltaLng = w * Math.sin(t) / Math.cos((lat * Math.PI) / 180);

  const newLat = lat + deltaLat;
  const newLng = lng + deltaLng;

  return { lat: newLat, lng: newLng };
}
