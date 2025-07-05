"use client";
import { useEffect, useState } from "react";
import ProfessorDialog from "../ProfessorComponent";
import BackgroundMusic from "../bgm";
import GetRiddle from "../getRiddle";
import ThemeToggle from "../ThemeToggle";
import useThemeStore from "@/store/themeStore";
import usePokeStore from "@/store/pokeStore";
import useLocationStore from "@/store/locationStore";
import GetDistanceInKm from "../distInKM";

export default function RiddleUI() {
  const { pokemon } = usePokeStore();
  const {
    reachedTarget,
    setReachedTarget,
    userLocation,
    setUserLocation,
    targetLocation,
    setTargetLocation,
  } = useLocationStore();

  const [correct, setIsCorrect] = useState(false);
  const [volume, setVolume] = useState(25);
  const [userAnswer, setUserAnswer] = useState("");
  const [riddle, setRiddle] = useState(null);

  const [characterState, setCharacterState] = useState({
    name: "Professor",
    dialog: "Solve the riddle and get to your Pokémon 🙂",
  });

  const theme = useThemeStore((state) => state.theme);


  useEffect(() => {
    const id = navigator.geolocation.watchPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => console.error("Geolocation error:", err),
      { enableHighAccuracy: true }
    );
    return () => navigator.geolocation.clearWatch(id);
  }, []);

 
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

  useEffect(() => {
  if (!reachedTarget) {
    setCharacterState({
      name: "Professor",
      dialog: "You're close! Keep moving...",
    });
  }
}, [reachedTarget]);

  
  if (!reachedTarget) {

    return (
      <div
        className="min-h-screen w-full bg-cover bg-center px-6 py-8 font-mono text-yellow-100"
        style={{
          backgroundImage:
            theme === 0
              ? "url('/background.jpeg')"
              : "url('/evening.jpg')",
        }}
      >
        <ThemeToggle />

        {/* 🔉 Volume Control */}
        <div className="flex items-center gap-4 w-full max-w-md ml-auto mb-6">
          <label htmlFor="volume" className="text-lg font-semibold text-white select-none">
            🔊 Volume
          </label>
          <input
            id="volume"
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(parseInt(e.target.value))}
            className="w-full accent-yellow-400 cursor-pointer"
          />
          <span className="text-white font-mono w-10 text-right">{volume}</span>
        </div>

        <BackgroundMusic volume={volume} />

        {/* 👨‍🏫 Professor Dialog */}
        <div className="mb-8">
          <ProfessorDialog characterState={characterState} />
        </div>

        {/* 🗺️ Location Maps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl w-full mt-6">
          {userLocation && (
            <iframe
              title="Your Location"
              className="rounded-lg w-full h-64 shadow-lg border-2 border-yellow-300"
              src={`https://maps.google.com/maps?q=${userLocation.lat},${userLocation.lng}&z=15&output=embed`}
              loading="lazy"
            ></iframe>
          )}
          {targetLocation && (
            <iframe
              title="Target Location"
              className="rounded-lg w-full h-64 shadow-lg border-2 border-yellow-300"
              src={`https://maps.google.com/maps?q=${targetLocation.lat},${targetLocation.lng}&z=15&output=embed`}
              loading="lazy"
            ></iframe>
          )}
        </div>
      </div>
    );
  }

  // ✅ Reached: Show Riddle
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center px-6 py-8 font-mono text-yellow-100"
      style={{
        backgroundImage:
          theme === 0 ? "url('/background.jpeg')" : "url('/evening.jpg')",
      }}
    >
      <ThemeToggle />

      {/* 🔉 Volume Control */}
      <div className="flex items-center gap-4 w-full max-w-md ml-auto mb-6">
        <label htmlFor="volume" className="text-lg font-semibold text-white select-none">
          🔊 Volume
        </label>
        <input
          id="volume"
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(parseInt(e.target.value))}
          className="w-full accent-yellow-400 cursor-pointer"
        />
        <span className="text-white font-mono w-10 text-right">{volume}</span>
      </div>

      <BackgroundMusic volume={volume} />

      {/* Professor Dialog */}
      <div className="mb-8">
        <ProfessorDialog
          characterState={characterState}
          nextRoute={correct ? "/finalReveal" : null}
        />
      </div>

      {/* Riddle Component */}
      <div className="flex justify-center">
        <GetRiddle
          reachedTarget={reachedTarget}
          setRiddle={setRiddle}
          setUserAnswer={setUserAnswer}
          setIsCorrect={setIsCorrect}
        />
      </div>
    </div>
  );
}

