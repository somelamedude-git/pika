import { useEffect } from "react";

export default function CurrentLocation({setUserLocation, location}){
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
      { enableHighAccuracy: true, maximumAge: 1000, timeout: 5000 }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div>

    </div>
  )
}