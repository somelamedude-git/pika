import { useEffect } from "react";

export default function GetRiddle({ reachedTarget, setRiddle, setUserAnswer, setIsCorrect}){
      useEffect(() => {
    if (reachedTarget) {
      fetch("https://riddles-api.vercel.app/random")
        .then((res) => res.json())
        .then((data) => {
          setRiddle({ riddle: data.riddle, answer: data.answer });
          setUserAnswer("");
          setIsCorrect(null);
        })
        .catch((err) => console.error("Failed to fetch riddle:", err));
    }
  }, [reachedTarget]);

  return(
    <div>

    </div>
  )
}