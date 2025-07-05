"use client";
import { useEffect } from "react";
import GetRandomPokemon from "./PokeGenerator";

export default function PokemonFetch({reachedTarget, userLocation, pokemon, setPokemon}){

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
            .catch(() => setPokemon(null));
        }
      }, [userLocation, reachedTarget, pokemon]);

       return (
  <div className="text-white p-2">
    {pokemon ? (
      <>
        <h2 className="text-xl font-bold">{pokemon.name}</h2>
        <p>Type: {pokemon.type}</p>
        <img src={pokemon.image} alt={pokemon.name} className="w-24 h-24" />
      </>
    ) : (
      <p>No Pokémon yet!</p>
    )}
  </div>
);

}