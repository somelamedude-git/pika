import { useEffect, useState } from "react";
import useLocationStore from "@/store/locationStore";

export default function CurrentLocation() {
  const { setUserLocation } = useLocationStore(); 

  const [coords, setCoords] = useState(null);
  const [syncTime, setSyncTime] = useState(null);
  const [joke, setJoke] = useState(null);
  const [jokeText, setJokeText] = useState(""); 
  const [jokeIndex, setJokeIndex] = useState(0); 


  useEffect(() => {
    if (!joke) {
      fetch("https://v2.jokeapi.dev/joke/Any?type=twopart")
        .then((res) => res.json())
        .then((data) => {
          const fullJoke = `${data.setup} ${data.delivery}`;
          setJoke(fullJoke);
          setJokeText("");
          setJokeIndex(0);
        });
    }
  }, []);

 
  useEffect(() => {
    if (joke && jokeIndex < joke.length) {
      const timeout = setTimeout(() => {
        setJokeText((prev) => prev + joke.charAt(jokeIndex));
        setJokeIndex((prev) => prev + 1);
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [joke, jokeIndex]);

 
  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      return;
    }
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(pos); // ✅ Zustand-powered
        setCoords(pos);
        setSyncTime(new Date().toLocaleTimeString());
        console.log("Coords locked in:", pos);
      },
      (error) => {
        console.log("Error getting location", error);
      },
      { enableHighAccuracy: true, maximumAge: 1000, timeout: 5000 }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, [setUserLocation]);

  return (
    <div className="flex flex-col md:flex-row items-start justify-center gap-6 mt-8 transition-all duration-700 ease-in-out">
      <div
        className={`max-w-md w-full bg-gradient-to-br from-[#3a2d20] via-[#2a1c0d] to-[#1a1208] border-4 border-yellow-400 rounded-2xl p-4 font-mono shadow-[inset_0_0_30px_#00000080] text-yellow-100 select-none transform transition-all duration-700 ${
          coords ? "translate-x-0 md:-translate-x-6" : ""
        }`}
      >
        {joke && (
          <div className="bg-black text-green-400 border border-yellow-400 rounded-md p-3 mb-5 shadow-inner text-sm font-mono">
            <p className="mb-1 font-bold">🃏 Daily Chuckle</p>
            <p className="whitespace-pre-wrap min-h-[4rem]">{jokeText || "..."}</p>
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold underline decoration-dotted decoration-yellow-300">
            📍 GeoTracker Console
          </h2>
          <div className="w-3 h-3 bg-green-400 rounded-full animate-ping shadow-[0_0_8px_#22c55e]" />
        </div>

        <div className="bg-yellow-100 text-yellow-900 text-sm py-2 px-3 rounded shadow-inner border border-yellow-400 mb-3">
          {coords
            ? `Location locked: (${coords.lat.toFixed(3)}, ${coords.lng.toFixed(3)})`
            : "Tracking enabled. Awaiting coordinates..."}
        </div>

        <div className="bg-yellow-800/20 border border-yellow-300 rounded-md p-3 text-xs space-y-1 mb-4">
          <p>🛰️ Status: <span className="text-green-300">{coords ? "Location Detected" : "Active"}</span></p>
          <p>🧭 Accuracy Mode: <span className="text-green-300">High</span></p>
          <p>🗺️ UI Style: <span className="text-green-300">Retro</span></p>
          {syncTime && <p>⏱️ Last Sync: <span className="text-yellow-200">{syncTime}</span></p>}
        </div>

        <div className="bg-black border border-yellow-600 p-3 rounded text-green-400 text-xs font-mono shadow-inner h-40 overflow-y-auto space-y-1">
          <p> Initializing GPS module...</p>
          <p> Syncing orbital satellites...</p>
          <p> Acquiring lock...</p>
          {coords && (
            <>
              <p> Position confirmed ✅</p>
              <p> Coordinates stored in memory slot #002</p>
              <p> Ready for next action...</p>
            </>
          )}
        </div>

        <div className="mt-5 italic text-center text-yellow-300 text-sm">
          <p>"The world is vast — track wisely, traveler."</p>
        </div>
      </div>

      {coords && (
        <div
          className="w-full max-w-md h-64 border-4 border-yellow-400 rounded-xl overflow-hidden shadow-md transition-opacity duration-700 animate-fade-in"
          style={{ animation: "fadeIn 1s ease-in-out" }}
        >
          <iframe
            title="User Location Map"
            className="w-full h-full"
            src={`https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=15&output=embed`}
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}
