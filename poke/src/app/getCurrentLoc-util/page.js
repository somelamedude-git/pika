"use client";
import { useEffect, useState } from "react";
import CurrentLocation from "../getCurrentLoc";
import ProfessorDialog from "../ProfessorComponent";
import BackgroundMusic from "../bgm";
import useLocationStore from "@/store/locationStore";

export default function GetCurrentLocPage() {
  const { userLocation } = useLocationStore();
  const [showProfessor, setShowProfessor] = useState(false);
 const [volume, setVolume] = useState(25);
  const [characterState, setCharacterState] = useState({
    name: "Professor",
    dialog:
      "Now that we have acquired your current location (I am not stalking, pinky promise), let us go ahead and find the mystery destination",
  });

  useEffect(() => {
    if (userLocation) {
      setShowProfessor(true);
    }
  }, [userLocation]);

  return (
    <div className="bg-[url('/background.jpeg')] bg-cover bg-center min-h-screen w-full px-4 py-8 flex flex-col items-center justify-start gap-8">
      
      {/* 🔉 Volume Control */}
      <div className="flex items-center gap-4 w-full max-w-md">
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

      {showProfessor && (
        <ProfessorDialog
          characterState={characterState}
          nextRoute="/pokeGenerate"
        />
      )}

      <CurrentLocation setCharacterState={setCharacterState} />
    </div>
  );
}
