"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfessorDialog({ characterState, nextRoute }) {
  const router = useRouter();
  const [lineIndex, setLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  const dialogArray = Array.isArray(characterState.dialog)
    ? characterState.dialog
    : [characterState.dialog];

  const currentLine = dialogArray[lineIndex] || "";

  useEffect(() => {
    setDisplayedText("");
    setCharIndex(0);
  }, [lineIndex]);

  useEffect(() => {
    if (charIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentLine.charAt(charIndex));
        setCharIndex((prev) => prev + 1);
      }, 30); // Typewriter speed
      return () => clearTimeout(timeout);
    }
  }, [charIndex, currentLine]);

  useEffect(() => {
    setLineIndex(0);
  }, [characterState]);

  const handleClick = () => {
    if (charIndex < currentLine.length) {
      // Instantly show full line if typewriter not done
      setDisplayedText(currentLine);
      setCharIndex(currentLine.length);
    } else if (lineIndex < dialogArray.length - 1) {
      setLineIndex((prev) => prev + 1);
    } else {
      router.push(nextRoute);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 flex gap-4 items-start bg-gradient-to-br from-[#2e1d10] via-[#1f1309] to-[#0d0703] border-4 border-yellow-400 rounded-xl p-4 shadow-inner font-mono text-yellow-100 transition-all">
      
      {/* Sprite */}
      <div className="min-w-[96px] w-24 h-24 bg-yellow-200 border-2 border-yellow-300 rounded-md overflow-hidden shadow-lg">
        <img
          src="/professor.png"
          alt="Professor"
          className="w-full h-full object-cover grayscale contrast-150"
        />
      </div>

      {/* Dialog Box */}
      <div className="flex-1">
        <div className="text-sm mb-2 text-yellow-300 font-bold underline decoration-dotted">
          {characterState.name}
        </div>

        <div className="bg-black/80 border border-yellow-600 p-3 rounded shadow-inner min-h-[72px] text-green-300 text-sm leading-relaxed whitespace-pre-wrap">
          {displayedText || "..."}
        </div>

        <div className="flex justify-end mt-3">
          <button
            onClick={handleClick}
            className="bg-yellow-300 text-black px-4 py-1 rounded shadow hover:bg-yellow-400 active:scale-95 transition-all text-sm"
          >
            {charIndex < currentLine.length
              ? "..."
              : lineIndex === dialogArray.length - 1
              ? "OK"
              : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
