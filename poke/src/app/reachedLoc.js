import { useEffect } from "react";
import GetDistanceInKm from "./distInKM";

export default function TargetCheck({userLocation, targetLocation, setReachedTarget, setTargetLocation}){
      useEffect(() => {
    if (userLocation && targetLocation) {
      const distance = GetDistanceInKm(
        targetLocation.lat,
        targetLocation.lng,
        userLocation.lat,
        userLocation.lng
      );
      if (distance <= 0.05) {
        setReachedTarget(true);
        setTargetLocation(null);
      }
    }
  }, [userLocation, targetLocation]);

  return(
    <div>
        
    </div>
  )
}