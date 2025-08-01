"use client";
import { useState, useEffect } from "react";
import ProfessorDialog from "../ProfessorComponent";
import BackgroundMusic from "../bgm";
import TargetLoc from "../RandomLocComponent";
import ThemeToggle from "../ThemeToggle";
import useThemeStore from "@/store/themeStore";


export default function getRandomLoc(){
    const [showProfessor, setShowProfessor] = useState(true);
const [volume, setVolume] = useState(25);
  const [characterState, setCharacterState] = useState({
    name: "Professor",
    dialog:
      "Get to the target location to get your pokemon!",
  });
const theme = useThemeStore((state)=>state.theme);
    return(
         <div className="bg-cover bg-center min-h-screen w-full px-4 py-8 flex flex-col items-center justify-start gap-8"
         style={{
            backgroundImage:
          theme === 0
            ? "url('/background.jpeg')"
            : "url('/evening.jpg')",
         }}
         >
             <ThemeToggle />
              
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
                  nextRoute="/getRiddle"
                />
              )}
        
              <TargetLoc />
            </div>
    )
}