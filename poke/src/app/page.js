"use client";
import { useEffect, useState } from "react";
import GetRandomLocation from "./randomLoc.js";
import GetDistanceInKm from "./distInKM.js";
import PokemonFetch from "./pokeGenerate.js";
import BackgroundMusic from "./bgm.js";

export default function Home() {
  const [userLocation, setUserLocation] = useState(null);
  const [reachedTarget, setReachedTarget] = useState(false);
  const [targetLocation, setTargetLocation] = useState(null);
  const [riddle, setRiddle] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [pokeBadges, setPokeBadges] = useState([]);
  const [volume, setVolume] = useState(25);

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

  useEffect(() => {
    if (!targetLocation && userLocation && !reachedTarget) {
      const randomTarget = GetRandomLocation(userLocation.lat, userLocation.lng, 5);
      setTargetLocation(randomTarget);
    }
  }, [userLocation, targetLocation, reachedTarget]);

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
    if (reachedTarget) {
      fetch("https://riddles-api.vercel.app/random")
        .then((res) => res.json())
        .then((data) => {
          setRiddle({ riddle: data.riddle, answer: data.answer });
          setUserAnswer("");
          setIsCorrect(null);
        })
        .catch((err) => console.error("Failed to fetch riddle:", err));
    }
  }, [reachedTarget]);


  useEffect(() => {
    if (isCorrect && riddle) {
      setPokeBadges((prev) => [...prev, pokemon]);
      setReachedTarget(false);
      setPokemon(null);
      setRiddle(null);
    }
  }, [isCorrect, pokemon, riddle]);

  const checkAnswer = () => {
    if (!riddle || !userAnswer.trim()) return;
    const user = userAnswer.trim().toLowerCase();
    const actual = riddle.answer.trim().toLowerCase();
    setIsCorrect(user === actual);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-8 text-white flex flex-col items-center font-sans">
      <input type="range" min="0" max="100" defaultValue={volume} onChange={(e)=>setVolume(e.target.value)}/>
      <BackgroundMusic volume={volume}/>
      <h1 className="text-4xl font-extrabold mb-8 drop-shadow-xl select-none">PokéCool Adventure 🌍⚡</h1>

      {!userLocation && (
        <p className="text-lg animate-pulse select-none">Fetching your location... Please allow location access.</p>
      )}

      {userLocation && (
        <>
          <section className="w-full max-w-xl bg-indigo-800 bg-opacity-90 rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-semibold mb-4 tracking-wide select-none">Your Current Location</h2>
            <p className="mb-6 text-lg">
              Latitude: <span className="font-mono">{userLocation.lat.toFixed(5)}</span> | Longitude:{" "}
              <span className="font-mono">{userLocation.lng.toFixed(5)}</span>
            </p>
            <iframe
              title="User Location Map"
              src={`https://www.openstreetmap.org/export/embed.html?&layer=mapnik&marker=${userLocation.lat},${userLocation.lng}`}
              width="100%"
              height="320"
              className="rounded-xl border-4 border-indigo-500 shadow-2xl transition-shadow duration-300 hover:shadow-[0_10px_25px_rgba(99,102,241,0.7)]"
              loading="lazy"
              style={{ border: "none" }}
            />

            {/* TARGET LOCATION REVEAL */}
            {targetLocation && !reachedTarget && (
              <div className="mt-6 p-5 bg-yellow-500 bg-opacity-90 rounded-xl text-black font-mono shadow-inner max-w-xl w-full select-none">
                <h4 className="font-bold mb-2 text-lg">🎯 Current Target Coordinates:</h4>
                <p className="text-xl">
                  Latitude: <span>{targetLocation.lat.toFixed(5)}</span> | Longitude:{" "}
                  <span>{targetLocation.lng.toFixed(5)}</span>
                </p>
                <p className="italic text-sm mt-2 opacity-90">Get there to catch your Pokémon!</p>
              </div>
            )}
          </section>

          {reachedTarget && riddle && (
            <section className="w-full max-w-xl bg-green-900 bg-opacity-95 rounded-2xl p-8 mb-8 shadow-lg border-4 border-green-500 select-none">
              <h3 className="text-2xl font-bold mb-5 flex items-center gap-3">
                🧩 Solve the Riddle & Catch Your Pokémon!
              </h3>
              <p className="italic text-green-300 mb-6 text-xl tracking-wide select-text">"{riddle.riddle}"</p>
              <input
                type="text"
                placeholder="Type your answer here..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="w-full rounded-xl px-5 py-3 mb-5 text-black font-semibold focus:outline-none focus:ring-4 focus:ring-green-400 transition"
                autoFocus
              />
              <button
                onClick={checkAnswer}
                className="w-full bg-green-600 hover:bg-green-700 transition-colors rounded-xl py-3 font-semibold shadow-lg active:scale-95 transform"
              >
                Submit Answer
              </button>
              {isCorrect === true && (
                <p className="mt-6 text-green-400 font-bold text-center animate-pulse select-none">
                  🎉 Pokémon captured! You’re a legend!
                </p>
              )}
              {isCorrect === false && (
                <p className="mt-6 text-red-400 font-semibold text-center animate-shake select-none">
                  ❌ Wrong answer, try again!
                </p>
              )}
            </section>
          )}

        <PokemonFetch reachedTarget={reachedTarget} userLocation={userLocation} pokemon={pokemon} setPokemon={setPokemon}/>

          <section className="w-full max-w-xl bg-gray-900 bg-opacity-80 rounded-2xl p-6 shadow-inner mt-auto select-none">
            <h3 className="text-2xl font-semibold mb-5 border-b border-gray-700 pb-3">Poké Badges 🏅</h3>
            {pokeBadges.length === 0 && (
              <p className="text-gray-400 italic text-lg">No badges earned yet. Keep exploring!</p>
            )}
            <div className="flex flex-wrap gap-6 justify-center">
              {pokeBadges.map((p, i) => (
                <div
                  key={`${p.name}-${i}`}
                  className="flex flex-col items-center bg-indigo-700 rounded-2xl p-4 shadow-lg w-28 hover:scale-105 transition-transform duration-200"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-20 h-20 object-contain mb-3 border-4 border-indigo-400 rounded-xl"
                    draggable={false}
                  />
                  <p className="text-base font-semibold text-center">{p.name}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
