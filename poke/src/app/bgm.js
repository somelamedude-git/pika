"use client";
import { Howl, Howler } from 'howler';
import { useRef, useEffect } from "react";

export default function BackgroundMusic(vol){
    const musicRef = useRef(null);

    useEffect(()=>{
        const music = new Howl({
            src: '/pokeMusic.mp3',
            loop:true,
            volume: vol
        })
        music.play();
        return()=>music.unload();
    }, []);

    useEffect(()=>{
        Howler.volume(vol);
    }, [vol]) //We don't want to recreate the instances
}