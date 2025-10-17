import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TimerStore, Lap } from '../types/timer';

const useTimerStore = create<TimerStore>()(
  persist(
    (set, get) => ({
      // Estado inicial
      time: 0,
      isRunning: false,
      startTime: null,
      laps: [],
      lastLapTime: 0,
      isFullscreen: false,

      // Acciones
      start: () => {
        const now = performance.now();
        set((state) => ({
          isRunning: true,
          startTime: state.startTime ? now - state.time : now,
        }));
      },

      pause: () => {
        set({ isRunning: false });
      },

      reset: () => {
        set({
          time: 0,
          isRunning: false,
          startTime: null,
          laps: [],
          lastLapTime: 0,
          isFullscreen: false,
        });
      },

      toggleFullscreen: () => {
        set((state) => ({
          isFullscreen: !state.isFullscreen,
        }));
      },

      addLap: () => {
        const state = get();
        if (state.time === 0) return;

        const lapTime = state.time - state.lastLapTime;
        const newLap: Lap = {
          id: crypto.randomUUID(),
          time: state.time,
          lapTime,
          timestamp: new Date(),
        };

        set((prevState) => ({
          laps: [newLap, ...prevState.laps],
          lastLapTime: state.time,
        }));
      },

      tick: () => {
        const state = get();
        if (!state.isRunning || !state.startTime) return;

        const now = performance.now();
        const newTime = now - state.startTime;
        
        set({ time: newTime });
      },
    }),
    {
      name: 'timer-storage',
      partialize: (state) => ({
        laps: state.laps,
        // No persistimos el estado de ejecución para evitar bugs
      }),
    }
  )
);

export default useTimerStore;