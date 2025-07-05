import { useEffect } from "react";

export default function RiddleCheck({isCorrect, riddle, setRiddle}){

     useEffect(() => {
    if (isCorrect && riddle) {
      setPokeBadges((prev) => [...prev, pokemon]);
      setReachedTarget(false);
      setPokemon(null);
      setRiddle(null);
    }
  }, [isCorrect, pokemon, riddle]);
}