"use client";
import { useEffect } from "react";
import GetRandomPokemon from "./PokeGenerator";
import usePokeStore from "@/store/pokeStore";

export default function PokemonFetch() {
    const { pokemon, setPokemon } = usePokeStore();
 useEffect(() => {
  if (!pokemon) {
    GetRandomPokemon()
      .then((poke_data) => {
        setPokemon({
          name: poke_data.name,
          type: poke_data.type,
          image: poke_data.image,
        });
      })
      .catch(() => setPokemon(null));
  }
}, []);


  if (!pokemon) {
    return (
      <p className="text-center text-white/80 italic mt-6">
        📡 No Pokémon detected yet...
      </p>
    );
  }

  return (
   <div className="max-w-md mx-auto bg-red-900 border-[5px] border-yellow-300 rounded-xl p-5 font-mono mt-6 shadow-md bg-[url('/main_bg.jpeg')] transition-transform duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(255,255,0,0.5)] cursor-pointer">
  <h3 className="text-center text-2xl font-bold text-yellow-200 underline decoration-dotted mb-5">
    Pokédex Entry
  </h3>

  <div className="bg-black border-2 border-yellow-300 rounded-md p-2 mb-4 flex justify-center items-center">
    <img
      src={pokemon.image}
      alt={pokemon.name}
      className="w-32 h-32 object-contain"
      style={{ imageRendering: "pixelated" }}
      draggable={false}
    />
  </div>

  <div className="text-center text-base text-white space-y-1 mb-4">
    <p>
      <span className="text-yellow-100">Name:</span> {pokemon.name}
    </p>
    <p>
      <span className="text-yellow-100">Type:</span> {pokemon.type}
    </p>
  </div>

  <div className="grid grid-cols-3 gap-2 text-xs text-center text-yellow-100">
    <div className="bg-red-800 p-1 rounded border border-yellow-300">🩺 HP: ???</div>
    <div className="bg-red-800 p-1 rounded border border-yellow-300">⚔️ ATK: ???</div>
    <div className="bg-red-800 p-1 rounded border border-yellow-300">🛡️ DEF: ???</div>
  </div>

  <div className="mt-5 flex justify-center items-center gap-2 text-green-300 text-xs">
    <span className="w-2 h-2 bg-green-300 rounded-full" />
    <p>Data synced</p>
  </div>
</div>
  );
}