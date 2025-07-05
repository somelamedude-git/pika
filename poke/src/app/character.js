import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Professor({ setCharacterState, pokemon }){
    const pathname = usePathname();

    if(pathname.includes('/getCurrentLoc')){
        setCharacterState({
            name: 'Professor',
            dialog: 'Good, now that we have tracked your location (I swear I am not stalking ;)), it is time to see young master where your path will lead'
        })
    }
    else if(pathname.includes('/pokeGenerate')){
        setCharacterState({
            name: 'Professor',
            dialog: `Woah! Best of luck catching your ${pokemon.name}`
        })
    }
    else if(pathname.includes('/getRiddle')){
        setCharacterState({
            name: 'Professor',
            dialog: 'Ah! It is time to make some good use of your wit rather than just lame jokes, time to answer and catch your pokemon'
        })
    }

    else if(pathname.includes('/start')){
        setCharacterState({
            name:'Professor',
            dialog: ['Welcome young soon to be pokemon master!', 'I am your guide and my wisdom will be showered upon you every second, bear with me',
                'Best of luck playing'
            ]
        })
    }
}