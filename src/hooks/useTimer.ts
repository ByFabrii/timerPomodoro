import { useEffect } from 'react';
import useTimerStore from '../stores/timerStore';

export const useTimer = () => {
  const store = useTimerStore();

  // Efecto para el tick del cronómetro/temporizador
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
      // Atajos comunes para ambos modos
      if (event.code === 'Space') {
        event.preventDefault();
        if (store.isRunning) {
          store.pause();
        } else {
          store.start();
        }
      } else if (event.code === 'KeyR') {
        event.preventDefault();
        store.reset();
      } else if (event.code === 'KeyF') {
        event.preventDefault();
        store.toggleFullscreen();
      }
      
      // Atajos específicos por modo
      if (store.mode === 'stopwatch') {
        // Solo en modo cronómetro: agregar vuelta
        if (event.code === 'KeyL' && store.isRunning) {
          event.preventDefault();
          store.addLap();
        }
      } else if (store.mode === 'pomodoro') {
        // Atajos específicos de Pomodoro
        if (event.code === 'KeyN' && event.ctrlKey) {
          event.preventDefault();
          store.nextPomodoroPhase();
        } else if (event.code === 'KeyP' && event.ctrlKey) {
          event.preventDefault();
          store.resetPomodoro();
        } else if (event.code === 'KeyM' && event.ctrlKey) {
          event.preventDefault();
          store.setMode('stopwatch');
        }
      }
      
      // Atajo para cambiar de modo (disponible en ambos)
      if (event.code === 'KeyT' && event.ctrlKey) {
        event.preventDefault();
        store.setMode(store.mode === 'stopwatch' ? 'pomodoro' : 'stopwatch');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [
    store.isRunning, 
    store.mode,
    store.start, 
    store.pause, 
    store.reset, 
    store.addLap, 
    store.toggleFullscreen,
    store.nextPomodoroPhase,
    store.resetPomodoro,
    store.setMode
  ]);

  return store;
};