import { describe, it, expect, beforeEach } from 'vitest';
import useTimerStore from '../stores/timerStore';

describe('Fullscreen functionality', () => {
  beforeEach(() => {
    // Reset store before each test
    useTimerStore.getState().reset();
  });

  it('should initialize with fullscreen disabled', () => {
    const state = useTimerStore.getState();
    expect(state.isFullscreen).toBe(false);
  });

  it('should toggle fullscreen mode', () => {
    const { toggleFullscreen } = useTimerStore.getState();
    
    // Initially false
    expect(useTimerStore.getState().isFullscreen).toBe(false);
    
    // Toggle to true
    toggleFullscreen();
    expect(useTimerStore.getState().isFullscreen).toBe(true);
    
    // Toggle back to false
    toggleFullscreen();
    expect(useTimerStore.getState().isFullscreen).toBe(false);
  });

  it('should reset fullscreen mode when resetting timer', () => {
    const { toggleFullscreen, reset } = useTimerStore.getState();
    
    // Enable fullscreen
    toggleFullscreen();
    expect(useTimerStore.getState().isFullscreen).toBe(true);
    
    // Reset should disable fullscreen
    reset();
    expect(useTimerStore.getState().isFullscreen).toBe(false);
  });

  it('should maintain timer state when toggling fullscreen', () => {
    const { start, toggleFullscreen } = useTimerStore.getState();
    
    // Start timer
    start();
    const initialState = useTimerStore.getState();
    
    // Toggle fullscreen
    toggleFullscreen();
    const afterToggle = useTimerStore.getState();
    
    // Timer state should be preserved
    expect(afterToggle.isRunning).toBe(initialState.isRunning);
    expect(afterToggle.startTime).toBe(initialState.startTime);
    expect(afterToggle.isFullscreen).toBe(true);
  });
});