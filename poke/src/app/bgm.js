"use client";
import { useEffect, useRef } from "react";
import { Howl, Howler } from "howler";

export default function BackgroundMusic({ volume }) {
  const musicRef = useRef(null);
  useEffect(() => {
    musicRef.current = new Howl({
      src: ["/IChooseYou.mp3"], 
      loop: true,
    });

    musicRef.current.play();

    return () => {
      musicRef.current.stop();
      musicRef.current.unload();
    };
  }, []);

  useEffect(() => {
    Howler.volume(volume);
  }, [volume]);

  return null; 
} //To save
