import { describe, it, expect } from 'vitest';
import useTimerStore from '../stores/timerStore';

describe('Fullscreen en modo Reloj', () => {
  it('toggle fullscreen preserva estado en modo clock', () => {
    const store = useTimerStore.getState();

    store.setMode('clock');

    store.toggleFullscreen();
    const after = useTimerStore.getState();

    expect(after.isFullscreen).toBe(true);
    expect(after.mode).toBe('clock');
    expect(after.isRunning).toBe(false);
  });
});