"use client";
import { useState, useEffect } from "react";
import PokemonFetch from "../pokeGenerate";
import ProfessorDialog from "../ProfessorComponent";
import BackgroundMusic from "../bgm";
import ThemeToggle from "../ThemeToggle";
import useThemeStore from "@/store/themeStore";
import usePokeStore from "@/store/pokeStore";

export default function PokePage() {
  const {pokemon, setPokemon} = usePokeStore();
  const [showProfessor, setShowProfessor] = useState(false);
  const [volume, setVolume] = useState(25);

  const [characterState, setCharacterState] = useState({
    name: "Professor",
    dialog: "",
  });

  // When Pokémon is fetched, update professor dialog and show it
  useEffect(() => {
    if (pokemon?.name) {
      setCharacterState({
        name: "Professor",
        dialog: `Woah, ${pokemon.name} is a great Pokémon! Best of luck, now it's time to reveal the location where you will find your Pokémon.`,
      });

      const timer = setTimeout(() => {
        setShowProfessor(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [pokemon]);
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

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start justify-center">
        {/* Professor Dialog */}
        {showProfessor && (
          <ProfessorDialog
            characterState={characterState}
            nextRoute="/getRandomLoc"
          />
        )}

        {/* Pokédex Display */}
        <div className="w-full max-w-md bg-red-600 border-4 border-yellow-400 rounded-xl shadow-[inset_0_0_30px_#00000080] p-4">
          <PokemonFetch
            reachedTarget={false}
            pokemon={pokemon}
            setPokemon={setPokemon}
          />
        </div>
      </div>
    </div>
  );
}
