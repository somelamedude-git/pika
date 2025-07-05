import { useEffect } from "react";
import GetRandomLocation from "./randomLoc";

export default function TargetLoc({ targetLocation, userLocation, reachedTarget, setTargetLocation }){
      useEffect(() => {
        if (!targetLocation && userLocation && !reachedTarget) {
          const randomTarget = GetRandomLocation(userLocation.lat, userLocation.lng, 5);
          setTargetLocation(randomTarget);
        }
      }, [userLocation, targetLocation, reachedTarget]);

      return (
        <div>
            
        </div>
      )
}