import { create } from "zustand";

const usePokeStore = create((set)=>({
    pokemon:null,
    setPokemon:(value)=>set({pokemon:value})
}))

export default usePokeStore;