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
        <div className="w-100 h-150 bg-[url(/redPix.png)] bg-cover image-rendering:pixelated bg-center">

        </div>
      </>
    ) : (
      <p>No Pokémon yet!</p>
    )}
  </div>
);

}