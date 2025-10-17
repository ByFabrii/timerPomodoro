export interface Lap {
  id: string;
  time: number;
  lapTime: number;
  timestamp: Date;
}

export interface TimerState {
  time: number;
  isRunning: boolean;
  startTime: number | null;
  laps: Lap[];
  lastLapTime: number;
  isFullscreen: boolean;
}

export interface TimerActions {
  start: () => void;
  pause: () => void;
  reset: () => void;
  addLap: () => void;
  tick: () => void;
  toggleFullscreen: () => void;
}

export type TimerStore = TimerState & TimerActions;