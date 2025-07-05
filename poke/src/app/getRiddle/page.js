"use client";
import { useState } from "react";
import ProfessorDialog from "../ProfessorComponent";
import BackgroundMusic from "../bgm";
import GetRiddle from "../getRiddle";
import ThemeToggle from "../ThemeToggle";
import useThemeStore from "@/store/themeStore";

export default function RiddleUI() {
  const [correct, setIsCorrect] = useState(false);
  const [volume, setVolume] = useState(25);
  const [userAnswer, setUserAnswer] = useState("");
  const [riddle, setRiddle] = useState(null);

  const [characterState, setCharacterState] = useState({
    name: "Professor",
    dialog: "Solve the riddle and get to your Pokémon 🙂",
  });

  const [reachedTarget, setReachedTarget] = useState(true); // you can toggle this based on game state later
  const theme = useThemeStore((state)=>state.theme);;

  return (
    <div className="min-h-screen w-full bg-cover bg-center px-6 py-8 font-mono text-yellow-100"
    style={{
         backgroundImage:
          theme === 0
            ? "url('/background.jpeg')"
            : "url('/evening.jpg')",
    }}
    >
        <ThemeToggle/>
      
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
