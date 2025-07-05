"use client";
import { useEffect, useState } from "react";
import GetDistanceInKm from "./distInKM.js";
import PokemonFetch from "./pokeGenerate.js";
import BackgroundMusic from "./bgm.js";
import GetRiddle from "./getRiddle.js";
import TargetLoc from "./RandomLocComponent.js";
import CurrentLocation from "./getCurrentLoc.js";
import RiddleCheck from "./AnswerCheck.js";
import TargetCheck from "./reachedLoc.js";

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


  return (
    <div className="bg-[url('/background.jpeg')] bg-cover bg-center min-h-screen w-full">
      <div className="flex items-center gap-4 mb-6 w-full max-w-md">
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
      <h1 className="text-4xl font-extrabold mb-8 drop-shadow-xl select-none">
        PokéCool Adventure 🌍⚡
      </h1>
      {/* <RiddleCheck isCorrect={isCorrect} riddle={riddle} setRiddle={setRiddle} /> */}
        <CurrentLocation setUserLocation={setUserLocation} location={location}/>
        {/* <GetRiddle reachedTarget={reachedTarget} setIsCorrect={setIsCorrect} setUserAnswer={setUserAnswer} setRiddle={setRiddle}/> */}
        {/* <PokemonFetch reachedTarget={reachedTarget} userLocation={userLocation} pokemon={pokemon} setPokemon={setPokemon}/> */}
        {/* <TargetLoc targetLocation={targetLocation} userLocation={userLocation} reachedTarget={reachedTarget} setTargetLocation={setTargetLocation}/>
        <TargetCheck userLocation={userLocation} targetLocation={targetLocation} setReachedTarget={setReachedTarget} setTargetLocation={setTargetLocation}/> */}

      
    </div>
  );
}
