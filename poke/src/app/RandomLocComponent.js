import { useEffect } from "react";
import GetRandomLocation from "./randomLoc";

export default function TargetLoc({ targetLocation, userLocation, reachedTarget, setTargetLocation }) {
  useEffect(() => {
    if (!targetLocation && userLocation && !reachedTarget) {
      const randomTarget = GetRandomLocation(userLocation.lat, userLocation.lng, 5);
      setTargetLocation(randomTarget);
    }
  }, [userLocation, targetLocation, reachedTarget]);

  return (
    <div className="max-w-md w-full bg-gradient-to-br from-[#2d180d] via-[#1a1107] to-[#0e0803] border-4 border-yellow-400 rounded-2xl p-4 font-mono text-yellow-100 shadow-[inset_0_0_30px_#00000080] mt-8 select-none">
      <h2 className="text-xl font-bold mb-4 underline decoration-dotted decoration-yellow-300">
        🎯 Target Assignment Console
      </h2>

      <div className="bg-yellow-100 text-yellow-900 text-sm py-2 px-3 rounded shadow-inner border border-yellow-400 mb-3">
        {targetLocation
          ? `Target location set: (${targetLocation.lat.toFixed(3)}, ${targetLocation.lng.toFixed(3)})`
          : userLocation
          ? "Calculating a target near your location..."
          : "Waiting for user location..."}
      </div>

      <div className="bg-black border border-yellow-600 p-3 rounded text-green-400 text-xs shadow-inner h-32 overflow-y-auto space-y-1">
        <p> Initiating target assignment module...</p>
        {userLocation && <p> Acquired user location ✅</p>}
        {targetLocation && (
          <>
            <p> Calculated target coordinates.</p>
            <p> Objective uploaded to trainer memory 🧠</p>
            <p> Begin journey when ready.</p>
          </>
        )}
        {!targetLocation && userLocation && <p> Scanning nearby terrain for viable coordinates...</p>}
      </div>

      <div className="mt-5 italic text-center text-yellow-300 text-sm">
        <p>"The path to power starts with a single step."</p>
      </div>
    </div>
  );
}
