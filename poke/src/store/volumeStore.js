import { create } from "zustand";

const useVolumeStore = create((set)=>({
    volume:25,
    setVolume: (val)=>set({volume:val}),
}))

export default useVolumeStore