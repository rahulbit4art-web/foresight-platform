import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { GEM1Output, GEM2Output, GEM3Output, GEM4Output } from './types'

interface PlatformStore {
  // Navigation
  activeStep: number
  unlockedUntil: number

  // GEM outputs
  gem1: GEM1Output | null
  gem2: GEM2Output | null
  gem3: GEM3Output | null
  gem4: GEM4Output | null

  // Actions
  setActiveStep: (step: number) => void
  setGEM1: (data: GEM1Output) => void
  setGEM2: (data: GEM2Output) => void
  setGEM3: (data: GEM3Output) => void
  setGEM4: (data: GEM4Output) => void
  unlockStep: (step: number) => void
  resetAll: () => void
}

const initialState = {
  activeStep: 0,
  unlockedUntil: 0,
  gem1: null,
  gem2: null,
  gem3: null,
  gem4: null,
}

export const usePlatformStore = create<PlatformStore>()(
  persist(
    (set) => ({
      ...initialState,

      setActiveStep: (step) =>
        set((state) => ({
          activeStep: step <= state.unlockedUntil ? step : state.activeStep,
        })),

      setGEM1: (data) =>
        set({ gem1: data }),

      setGEM2: (data) =>
        set({ gem2: data }),

      setGEM3: (data) =>
        set({ gem3: data }),

      setGEM4: (data) =>
        set({ gem4: data }),

      unlockStep: (step) =>
        set((state) => ({
          unlockedUntil: Math.max(state.unlockedUntil, step),
          activeStep: step,
        })),

      resetAll: () => set(initialState),
    }),
    {
      name: 'foresight-platform-state',
      partialize: (state) => ({
        activeStep: state.activeStep,
        unlockedUntil: state.unlockedUntil,
        gem1: state.gem1,
        gem2: state.gem2,
        gem3: state.gem3,
        gem4: state.gem4,
      }),
    }
  )
)
