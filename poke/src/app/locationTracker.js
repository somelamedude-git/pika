"use client";
import { useEffect, useState } from "react";
import { GetRandomLocation } from "./randomLoc.js";
import { GetDistanceInKm } from "./distInKM.js";
import { GetRandomPokemon } from "./PokeGenerator.js"

export default function LocationTracker() {
  const [userLocation, setUserLocation] = useState(null);
  const [reachedTarget, setReachedTarget] = useState(false);
  const [targetLocation, setTargetLocation] = useState(null);
  const [riddle, setRiddle] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [pokemon, setPokemon] = useState(null);


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

  useEffect(() => {
    if (!targetLocation && userLocation && !reachedTarget) {
      const randomTarget = GetRandomLocation(userLocation.lat, userLocation.lng, 5);
      setTargetLocation(randomTarget);
    }
  }, [userLocation, targetLocation]);



  useEffect(() => {
    if (userLocation && targetLocation) {
      const distance = GetDistanceInKm(
        targetLocation.lat,
        targetLocation.lng,
        userLocation.lat,
        userLocation.lng
      );

      if (distance <= 0.05) {
        console.log("🎯 Target reached!");
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
          setRiddle({
            riddle: data.riddle,
            answer: data.answer,
          });
          setUserAnswer(""); 
          setIsCorrect(null); 
        })
        .catch((err) => {
          console.error("Failed to fetch riddle:", err);
        });
    }
  }, [reachedTarget]);

useEffect(() => {
  if (!reachedTarget && userLocation && !pokemon) {
    GetRandomPokemon()
      .then((poke_data) => {
        setPokemon({
          name: poke_data.name,
          type: poke_data.type,
          image: poke_data.image,
        });
      })
      .catch((error) => {
        console.error("Failed to assign Pokémon:", error);
        setPokemon(null);
      });
  }
}, [userLocation, reachedTarget, pokemon]);

  const checkAnswer = () => {
    if (!riddle || !userAnswer.trim()) return;
    const user = userAnswer.trim().toLowerCase();
    const actual = riddle.answer.trim().toLowerCase();
    setIsCorrect(user === actual);
  };

  return (
    <div className="text-white p-4">
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

          {reachedTarget && riddle && (
            <div className="mt-6 p-4 border border-green-400 rounded">
              <h3 className="text-lg font-bold mb-2">🧩 Solve the riddle to catch your Pokémon!</h3>
              <p className="italic mb-4">{riddle.riddle}</p>
              <input
                className="text-black px-3 py-2 rounded w-full mb-2"
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Your answer here..."
              />
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                onClick={checkAnswer}
              >
                Submit
              </button>
              {isCorrect === true && <p className="text-green-300 mt-3"> Pokémon captured!</p>}
              {isCorrect === false && <p className="text-red-400 mt-3"> Nope! Try again.</p>}
            </div>
          )}
        </>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
}
