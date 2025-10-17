import { useEffect } from 'react';
import useTimerStore from '../stores/timerStore';

export const useTimer = () => {
  const store = useTimerStore();

  // Efecto para el tick del cronómetro
  useEffect(() => {
    if (!store.isRunning) return;

    const interval = setInterval(() => {
      store.tick();
    }, 10); // 10ms para precisión de centésimas

    return () => clearInterval(interval);
  }, [store.isRunning, store.tick]);

  // Efecto para atajos de teclado
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        if (store.isRunning) {
          store.pause();
        } else {
          store.start();
        }
      } else if (event.code === 'KeyR' && event.ctrlKey) {
        event.preventDefault();
        store.reset();
      } else if (event.code === 'KeyL' && store.isRunning) {
        event.preventDefault();
        store.addLap();
      } else if (event.code === 'KeyF') {
        event.preventDefault();
        store.toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [store.isRunning, store.start, store.pause, store.reset, store.addLap, store.toggleFullscreen]);

  return store;
};