import { useEffect, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import usePokeStore from "@/store/pokeStore";

export default function GetRiddle({ reachedTarget, setRiddle, setUserAnswer, setIsCorrect }) {
  const [riddleData, setRiddleData] = useState(null);
  const [answer, setAnswer] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showFailPopup, setShowFailPopup] = useState(false);
  const {pokemon, setPokemon} = usePokeStore();

  useEffect(() => {
    if (reachedTarget) {
      fetch("https://riddles-api.vercel.app/random")
        .then((res) => res.json())
        .then((data) => {
          setRiddle({ riddle: data.riddle, answer: data.answer });
          setRiddleData(data);
          setUserAnswer("");
          setIsCorrect(null);

          console.log(data.answer);
        })
        .catch((err) => console.error("Failed to fetch riddle:", err));
    }
  }, [reachedTarget]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const correct =
      answer.trim().toLowerCase() === riddleData?.answer.trim().toLowerCase();
    setIsCorrect(correct);
    setUserAnswer(answer);

    if (correct) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } else {
      setShowFailPopup(true);
      setTimeout(() => setShowFailPopup(false), 3000);
    }
  };

  return (
    <div className="relative max-w-md w-full bg-gradient-to-br from-[#3a2d20] via-[#2a1c0d] to-[#1a1208] border-4 border-yellow-400 rounded-2xl p-6 font-mono text-yellow-100 shadow-[inset_0_0_30px_#00000080] mt-10 select-none">
      <h2 className="text-xl font-bold underline decoration-dotted decoration-yellow-300 mb-4">
        🧠 Riddle Challenge
      </h2>

      {riddleData ? (
        <>
          <p className="text-sm mb-4 text-yellow-100 italic">
            {riddleData.riddle}
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Type your answer..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="bg-yellow-100 text-yellow-900 text-sm px-3 py-2 rounded shadow-inner border border-yellow-300 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-yellow-400 text-yellow-900 font-semibold py-2 rounded hover:bg-yellow-300 transition-all"
            >
              ✅ Submit
            </button>
          </form>
        </>
      ) : (
        <p className="text-sm italic text-yellow-300">🌀 Fetching your riddle...</p>
      )}

     {showPopup && (
  <div className="absolute top-4 right-4 bg-green-700 text-white p-4 rounded-xl shadow-lg border-2 border-green-300 font-mono z-50 animate-bounce w-60 flex flex-col items-center">
    <p className="font-bold text-lg mb-2">🎉 You got it right!</p>
    
    {pokemon && (
      <>
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-16 h-16 object-contain mb-2"
          style={{ imageRendering: "pixelated" }}
        />
        <p className="text-yellow-200 text-sm italic">You’ve unlocked:</p>
        <p className="text-yellow-300 font-bold uppercase text-md">{pokemon.name}</p>
      </>
    )}
  </div>
)}


      {showFailPopup && (
        <div className="absolute top-4 right-4 bg-red-700 text-white p-4 rounded-xl shadow-lg border-2 border-red-300 font-mono z-50 animate-shake">
          😅 Nope! Try again.
        </div>
      )}
    </div>
  );
}
