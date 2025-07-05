"use client";
import { useEffect, useRef } from "react";
import { Howl } from "howler";

export default function BackgroundMusic({ volume }) {
  const musicRef = useRef(null);

  // Sanitize volume
  const safeVolume = Number.isFinite(Number(volume)) ? Number(volume) / 100 : 0.25; // default to 25% if invalid

  useEffect(() => {
    musicRef.current = new Howl({
      src: ["/IChooseYou.mp3"],
      loop: true,
      volume: safeVolume, // use safe volume
    });

    musicRef.current.play();

    return () => {
      musicRef.current.stop();
      musicRef.current.unload();
    };
  }, []);

  useEffect(() => {
    if (musicRef.current) {
      const adjusted = Number.isFinite(Number(volume)) ? Number(volume) / 100 : 0.25;
      musicRef.current.volume(adjusted);
    }
  }, [volume]);

  return null;
}
