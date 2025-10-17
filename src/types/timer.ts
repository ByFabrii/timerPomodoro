export interface Lap {
  id: string;
  time: number;
  lapTime: number;
  timestamp: Date;
}

// Tipos para Pomodoro
export type TimerMode = 'stopwatch' | 'pomodoro';
export type PomodoroPhase = 'work' | 'shortBreak' | 'longBreak';

export interface PomodoroConfig {
  workDuration: number; // en milisegundos
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number; // cada cuántas sesiones de trabajo
}

export interface PomodoroSession {
  id: string;
  phase: PomodoroPhase;
  duration: number;
  completedAt: Date;
}

export interface TimerState {
  // Estado común
  time: number;
  isRunning: boolean;
  startTime: number | null;
  laps: Lap[];
  lastLapTime: number;
  isFullscreen: boolean;
  
  // Estado específico de Pomodoro
  mode: TimerMode;
  pomodoroConfig: PomodoroConfig;
  currentPhase: PomodoroPhase;
  sessionCount: number; // contador de sesiones de trabajo completadas
  targetTime: number; // tiempo objetivo para el temporizador descendente
  pomodoroSessions: PomodoroSession[];
}

export interface TimerActions {
  // Acciones comunes
  start: () => void;
  pause: () => void;
  reset: () => void;
  addLap: () => void;
  tick: () => void;
  toggleFullscreen: () => void;
  
  // Acciones específicas de Pomodoro
  setMode: (mode: TimerMode) => void;
  setPomodoroConfig: (config: Partial<PomodoroConfig>) => void;
  nextPomodoroPhase: () => void;
  resetPomodoro: () => void;
}

export type TimerStore = TimerState & TimerActions;