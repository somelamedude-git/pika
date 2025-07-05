"use client";
import { useEffect, useState } from "react";
import BackgroundMusic from "./bgm.js";
import ProfessorDialog from "./ProfessorComponent.js"; 
import ThemeToggle from "./ThemeToggle.js";
import useThemeStore from "@/store/themeStore.js";

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
   const theme = useThemeStore((state) => state.theme);

  return (
    <div className="bg-cover bg-center min-h-screen w-full px-4 py-6"
    style={{
       backgroundImage:
            theme === 0
              ? "url('/background.jpeg')"
              : "url('/evening.jpg')",
    }}
    >
      <ThemeToggle/>
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

    
      <BackgroundMusic volume={volume} />

      <h1 className="text-4xl font-extrabold mb-8 drop-shadow-xl text-center text-yellow-300 select-none">
        PokéCool Adventure 🌍⚡
      </h1>

      
      <ProfessorDialog characterState={characterState} nextRoute="/getCurrentLoc-util" />
    </div>
  );
}
