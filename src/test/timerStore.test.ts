import { describe, it, expect, beforeEach } from 'vitest';
import useTimerStore from '../stores/timerStore';

describe('TimerStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useTimerStore.getState().reset();
  });

  it('should initialize with default values', () => {
    const state = useTimerStore.getState();
    
    expect(state.time).toBe(0);
    expect(state.isRunning).toBe(false);
    expect(state.startTime).toBe(null);
    expect(state.laps).toEqual([]);
    expect(state.lastLapTime).toBe(0);
  });

  it('should start the timer', () => {
    const { start } = useTimerStore.getState();
    
    start();
    
    const state = useTimerStore.getState();
    expect(state.isRunning).toBe(true);
    expect(state.startTime).not.toBe(null);
  });

  it('should pause the timer', () => {
    const { start, pause } = useTimerStore.getState();
    
    start();
    pause();
    
    const state = useTimerStore.getState();
    expect(state.isRunning).toBe(false);
  });

  it('should reset the timer', () => {
    const { start, addLap, reset } = useTimerStore.getState();
    
    start();
    // Simulate some time passing
    useTimerStore.setState({ time: 5000 });
    addLap();
    reset();
    
    const state = useTimerStore.getState();
    expect(state.time).toBe(0);
    expect(state.isRunning).toBe(false);
    expect(state.startTime).toBe(null);
    expect(state.laps).toEqual([]);
    expect(state.lastLapTime).toBe(0);
  });

  it('should add a lap', () => {
    const { start, addLap } = useTimerStore.getState();
    
    start();
    // Simulate some time passing
    useTimerStore.setState({ time: 5000 });
    addLap();
    
    const state = useTimerStore.getState();
    expect(state.laps).toHaveLength(1);
    expect(state.laps[0].time).toBe(5000);
    expect(state.laps[0].lapTime).toBe(5000);
    expect(state.lastLapTime).toBe(5000);
  });

  it('should not add lap when time is 0', () => {
    const { addLap } = useTimerStore.getState();
    
    addLap();
    
    const state = useTimerStore.getState();
    expect(state.laps).toHaveLength(0);
  });
});