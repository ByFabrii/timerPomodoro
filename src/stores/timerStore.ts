import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TimerStore, Lap, PomodoroSession, PomodoroConfig, TimerMode, PomodoroPhase } from '../types/timer';

// Configuración por defecto del Pomodoro (en milisegundos)
const DEFAULT_POMODORO_CONFIG: PomodoroConfig = {
  workDuration: 25 * 60 * 1000, // 25 minutos
  shortBreakDuration: 5 * 60 * 1000, // 5 minutos
  longBreakDuration: 15 * 60 * 1000, // 15 minutos
  longBreakInterval: 4, // cada 4 sesiones de trabajo
};

const useTimerStore = create<TimerStore>()(
  persist(
    (set, get) => ({
      // Estado inicial común
      time: 0,
      isRunning: false,
      startTime: null,
      laps: [],
      lastLapTime: 0,
      isFullscreen: false,
      
      // Estado inicial específico de Pomodoro
      mode: 'stopwatch' as TimerMode,
      pomodoroConfig: DEFAULT_POMODORO_CONFIG,
      currentPhase: 'work' as PomodoroPhase,
      sessionCount: 0,
      targetTime: DEFAULT_POMODORO_CONFIG.workDuration,
      pomodoroSessions: [],

      // Zona horaria del reloj (persistente)
      clockTimezone: 'America/Mexico_City',

      // Acciones comunes
      start: () => {
        const state = get();
        const now = performance.now();
        if (state.mode === 'clock') {
          // No aplica start/pause/reset en modo reloj
          return;
        }
        if (state.mode === 'stopwatch') {
          // Lógica original del cronómetro (ascendente)
          set((state) => ({
            isRunning: true,
            startTime: state.startTime ? now - state.time : now,
          }));
        } else {
          // Lógica del Pomodoro (descendente)
          // Para el countdown: startTime debe ser ajustado para que elapsed = targetTime - currentTime
          const elapsedTime = state.targetTime - state.time;
          set((state) => ({
            isRunning: true,
            startTime: now - elapsedTime,
          }));
        }
      },

      pause: () => {
        const state = get();
        if (state.mode === 'clock') {
          return;
        }
        set({ isRunning: false });
      },

      reset: () => {
        const state = get();
        if (state.mode === 'clock') {
          set({
            isRunning: false,
            startTime: null,
            isFullscreen: false,
          });
          return;
        }
        if (state.mode === 'stopwatch') {
          // Reset del cronómetro
          set({
            time: 0,
            isRunning: false,
            startTime: null,
            laps: [],
            lastLapTime: 0,
            isFullscreen: false,
          });
        } else {
          // Reset del Pomodoro a la fase actual
          set({
            time: state.targetTime,
            isRunning: false,
            startTime: null,
            isFullscreen: false,
          });
        }
      },

      toggleFullscreen: () => {
        set((state) => ({
          isFullscreen: !state.isFullscreen,
        }));
      },

      addLap: () => {
        const state = get();
        if (state.mode !== 'stopwatch' || state.time === 0) return;

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
        
        if (state.mode === 'stopwatch') {
          // Cronómetro ascendente (lógica original)
          const newTime = now - state.startTime;
          set({ time: newTime });
        } else {
          // Pomodoro descendente
          const elapsed = now - state.startTime;
          const newTime = Math.max(0, state.targetTime - elapsed);
          
          set({ time: newTime });
          
          // Auto-avanzar a la siguiente fase cuando llegue a 0
          if (newTime === 0) {
            get().nextPomodoroPhase();
          }
        }
      },

      // Acciones específicas de Pomodoro
      setMode: (mode: TimerMode) => {
        const state = get();
        set({
          mode,
          time: mode === 'stopwatch' ? 0 : mode === 'pomodoro' ? state.targetTime : 0,
          isRunning: false,
          startTime: null,
          laps: mode === 'pomodoro' ? [] : state.laps,
          lastLapTime: 0,
        });
      },

      setPomodoroConfig: (config: Partial<PomodoroConfig>) => {
        const state = get();
        const newConfig = { ...state.pomodoroConfig, ...config };
        
        // Actualizar targetTime si estamos en modo Pomodoro
        let newTargetTime = state.targetTime;
        if (state.mode === 'pomodoro') {
          switch (state.currentPhase) {
            case 'work':
              newTargetTime = newConfig.workDuration;
              break;
            case 'shortBreak':
              newTargetTime = newConfig.shortBreakDuration;
              break;
            case 'longBreak':
              newTargetTime = newConfig.longBreakDuration;
              break;
          }
        }
        
        set({
          pomodoroConfig: newConfig,
          targetTime: newTargetTime,
          time: state.isRunning ? state.time : newTargetTime,
        });
      },

      nextPomodoroPhase: () => {
        const state = get();
        if (state.mode !== 'pomodoro') return;

        let nextPhase: PomodoroPhase;
        let newSessionCount = state.sessionCount;
        
        // Lógica para determinar la siguiente fase
        if (state.currentPhase === 'work') {
          newSessionCount += 1;
          // Determinar si es descanso corto o largo
          nextPhase = newSessionCount % state.pomodoroConfig.longBreakInterval === 0 
            ? 'longBreak' 
            : 'shortBreak';
        } else {
          // Después de cualquier descanso, volver al trabajo
          nextPhase = 'work';
        }

        // Calcular duración de la nueva fase
        let newTargetTime: number;
        switch (nextPhase) {
          case 'work':
            newTargetTime = state.pomodoroConfig.workDuration;
            break;
          case 'shortBreak':
            newTargetTime = state.pomodoroConfig.shortBreakDuration;
            break;
          case 'longBreak':
            newTargetTime = state.pomodoroConfig.longBreakDuration;
            break;
        }

        // Registrar la sesión completada
        const completedSession: PomodoroSession = {
          id: crypto.randomUUID(),
          phase: state.currentPhase,
          duration: state.targetTime,
          completedAt: new Date(),
        };

        set({
          currentPhase: nextPhase,
          sessionCount: newSessionCount,
          targetTime: newTargetTime,
          time: newTargetTime,
          isRunning: false,
          startTime: null,
          pomodoroSessions: [completedSession, ...state.pomodoroSessions],
        });
      },

      resetPomodoro: () => {
        const state = get();
        set({
          currentPhase: 'work',
          sessionCount: 0,
          targetTime: state.pomodoroConfig.workDuration,
          time: state.pomodoroConfig.workDuration,
          isRunning: false,
          startTime: null,
          pomodoroSessions: [],
        });
      },

      // Nueva acción: actualizar zona horaria del reloj
      setClockTimezone: (tz: string) => {
        set({ clockTimezone: tz });
      },
    }),
    {
      name: 'timer-storage',
      partialize: (state) => ({
        laps: state.laps,
        mode: state.mode,
        pomodoroConfig: state.pomodoroConfig,
        sessionCount: state.sessionCount,
        pomodoroSessions: state.pomodoroSessions,
        clockTimezone: state.clockTimezone,
      }),
    }
  )
);

export default useTimerStore;