import { create } from 'zustand';

const useLocationStore = create((set) => ({
  userLocation: null,
  setUserLocation: (loc) => set({ userLocation: loc }),
  
  targetLocation: null,
  setTargetLocation: (loc) => set({ targetLocation: loc }),

  reachedTarget: false,
  setReachedTarget: (value) => set({ reachedTarget: value }),
}));

export default useLocationStore;
