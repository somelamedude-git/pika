"use client";
import { useEffect, useRef } from "react";
import { Howl } from "howler";

export default function BackgroundMusic({ volume }) {
  const musicRef = useRef(null);

  useEffect(() => {
    musicRef.current = new Howl({
      src: ["/IChooseYou.mp3"],
      loop: true,
      volume: volume / 100, 
    });

    musicRef.current.play();

    return () => {
      musicRef.current.stop();
      musicRef.current.unload();
    };
  }, []);

  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume(volume / 100); 
    }
  }, [volume]);

  return null;
}
