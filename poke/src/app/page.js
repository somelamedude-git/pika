"use client";
import { useEffect, useState } from "react";
import BackgroundMusic from "./bgm.js";
import ProfessorDialog from "./ProfessorComponent.js"; // import the dialog box

export default function Home() {
  const [volume, setVolume] = useState(25);
  const [characterState, setCharacterState] = useState({
    name: "Professor",
    dialog: [
      "Welcome, young traveler!",
      "The world of PokéCool awaits you.",
      "Gather your courage and let's begin your journey."
    ]
  });

  return (
    <div className="bg-[url('/background.jpeg')] bg-cover bg-center min-h-screen w-full px-4 py-6">
      {/* Volume Control */}
      <div className="flex items-center gap-4 mb-6 w-full max-w-md mx-auto">
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

      {/* BGM */}
      <BackgroundMusic volume={volume} />

      {/* Title */}
      <h1 className="text-4xl font-extrabold mb-8 drop-shadow-xl text-center text-yellow-300 select-none">
        PokéCool Adventure 🌍⚡
      </h1>

      {/* Professor Dialog Box */}
      <ProfessorDialog characterState={characterState} nextRoute="/getCurrentLoc-util" />
    </div>
  );
}
