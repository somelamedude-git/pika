"use client";
import { useEffect, useState } from "react";

export default function LocationTracker() {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.log("Error getting location", error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 5000,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <div className="text-white">
      <h2>Your Current Location:</h2>
      {userLocation ? (
        <>
          <p>
            Lat: {userLocation.lat}, Lng: {userLocation.lng}
          </p>

          <iframe
            width="100%"
            height="450"
            style={{ border: "1px solid black", borderRadius: "8px", marginTop: "1rem" }}
            src={`https://www.openstreetmap.org/export/embed.html?&layer=mapnik&marker=${userLocation.lat},${userLocation.lng}`}
            allowFullScreen=""
            loading="lazy"
          />
        </>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
}
