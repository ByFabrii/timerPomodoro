import { describe, it, expect, beforeEach, vi } from 'vitest';
import useTimerStore from '../stores/timerStore';
import type { PomodoroPhase } from '../types/timer';

// Mock de performance.now y crypto.randomUUID
const mockPerformanceNow = vi.fn();
const mockCryptoRandomUUID = vi.fn();

Object.defineProperty(global, 'performance', {
  value: { now: mockPerformanceNow },
});

Object.defineProperty(global, 'crypto', {
  value: { randomUUID: mockCryptoRandomUUID },
});

describe('Pomodoro Store', () => {
  beforeEach(() => {
    // Reset del store antes de cada test
    useTimerStore.getState().reset();
    useTimerStore.getState().setMode('pomodoro');
    
    // Reset de mocks
    mockPerformanceNow.mockReturnValue(0);
    mockCryptoRandomUUID.mockReturnValue('test-uuid');
  });

  describe('Inicialización', () => {
    it('debería inicializar en modo Pomodoro correctamente', () => {
      const store = useTimerStore.getState();
      store.setMode('pomodoro');
      
      expect(store.mode).toBe('pomodoro');
      expect(store.currentPhase).toBe('work');
      expect(store.sessionCount).toBe(0);
      expect(store.time).toBe(25 * 60 * 1000); // 25 minutos
      expect(store.targetTime).toBe(25 * 60 * 1000);
    });

    it('debería tener la configuración por defecto correcta', () => {
      const store = useTimerStore.getState();
      store.setMode('pomodoro');
      
      expect(store.pomodoroConfig.workDuration).toBe(25 * 60 * 1000);
      expect(store.pomodoroConfig.shortBreakDuration).toBe(5 * 60 * 1000);
      expect(store.pomodoroConfig.longBreakDuration).toBe(15 * 60 * 1000);
      expect(store.pomodoroConfig.longBreakInterval).toBe(4);
    });
  });

  describe('Temporizador descendente', () => {
    it('debería contar hacia atrás desde el tiempo objetivo', () => {
      const store = useTimerStore.getState();
      store.setMode('pomodoro');
      
      // Simular inicio
      mockPerformanceNow.mockReturnValue(1000);
      store.start();
      
      // Simular tick después de 5 segundos
      mockPerformanceNow.mockReturnValue(6000);
      store.tick();
      
      const expectedTime = 25 * 60 * 1000 - 5000; // 25 min - 5 seg
      expect(store.time).toBe(expectedTime);
    });

    it('debería detenerse en 0 y no ir a números negativos', () => {
      const store = useTimerStore.getState();
      store.setMode('pomodoro');
      
      // Configurar tiempo muy pequeño para testing
      store.setPomodoroConfig({ workDuration: 1000 }); // 1 segundo
      
      mockPerformanceNow.mockReturnValue(1000);
      store.start();
      
      // Simular tick después de 2 segundos (más que la duración)
      mockPerformanceNow.mockReturnValue(3000);
      store.tick();
      
      expect(store.time).toBe(0);
    });
  });

  describe('Fases del Pomodoro', () => {
    it('debería avanzar de trabajo a descanso corto', () => {
      const store = useTimerStore.getState();
      store.setMode('pomodoro');
      
      expect(store.currentPhase).toBe('work');
      expect(store.sessionCount).toBe(0);
      
      store.nextPomodoroPhase();
      
      expect(store.currentPhase).toBe('shortBreak');
      expect(store.sessionCount).toBe(1);
      expect(store.time).toBe(5 * 60 * 1000); // 5 minutos
    });

    it('debería avanzar de descanso corto a trabajo', () => {
      const store = useTimerStore.getState();
      store.setMode('pomodoro');
      
      // Ir a descanso corto primero
      store.nextPomodoroPhase();
      expect(store.currentPhase).toBe('shortBreak');
      
      // Luego volver a trabajo
      store.nextPomodoroPhase();
      expect(store.currentPhase).toBe('work');
      expect(store.time).toBe(25 * 60 * 1000);
    });

    it('debería ir a descanso largo después de 4 sesiones', () => {
      const store = useTimerStore.getState();
      store.setMode('pomodoro');
      
      // Simular 4 ciclos de trabajo
      for (let i = 0; i < 4; i++) {
        store.nextPomodoroPhase(); // trabajo -> descanso
        if (i < 3) {
          store.nextPomodoroPhase(); // descanso -> trabajo
        }
      }
      
      expect(store.currentPhase).toBe('longBreak');
      expect(store.sessionCount).toBe(4);
      expect(store.time).toBe(15 * 60 * 1000); // 15 minutos
    });
  });

  describe('Configuración del Pomodoro', () => {
    it('debería actualizar la configuración correctamente', () => {
      const store = useTimerStore.getState();
      store.setMode('pomodoro');
      
      const newConfig = {
        workDuration: 30 * 60 * 1000, // 30 minutos
        shortBreakDuration: 10 * 60 * 1000, // 10 minutos
      };
      
      store.setPomodoroConfig(newConfig);
      
      expect(store.pomodoroConfig.workDuration).toBe(30 * 60 * 1000);
      expect(store.pomodoroConfig.shortBreakDuration).toBe(10 * 60 * 1000);
      expect(store.time).toBe(30 * 60 * 1000); // Tiempo actualizado
    });
  });

  describe('Reset del Pomodoro', () => {
    it('debería resetear solo la fase actual con reset()', () => {
      const store = useTimerStore.getState();
      store.setMode('pomodoro');
      
      // Avanzar a descanso corto
      store.nextPomodoroPhase();
      expect(store.currentPhase).toBe('shortBreak');
      
      // Simular algo de tiempo transcurrido
      mockPerformanceNow.mockReturnValue(1000);
      store.start();
      mockPerformanceNow.mockReturnValue(3000);
      store.tick();
      
      // Reset debería mantener la fase pero resetear el tiempo
      store.reset();
      expect(store.currentPhase).toBe('shortBreak');
      expect(store.time).toBe(5 * 60 * 1000); // Tiempo de descanso corto
      expect(store.isRunning).toBe(false);
    });

    it('debería resetear todo el Pomodoro con resetPomodoro()', () => {
      const store = useTimerStore.getState();
      store.setMode('pomodoro');
      
      // Avanzar varias fases
      store.nextPomodoroPhase(); // trabajo -> descanso corto
      store.nextPomodoroPhase(); // descanso corto -> trabajo
      
      expect(store.sessionCount).toBe(2);
      
      store.resetPomodoro();
      
      expect(store.currentPhase).toBe('work');
      expect(store.sessionCount).toBe(0);
      expect(store.time).toBe(25 * 60 * 1000);
      expect(store.pomodoroSessions).toHaveLength(0);
    });
  });

  describe('Sesiones completadas', () => {
    it('debería registrar sesiones completadas', () => {
      const store = useTimerStore.getState();
      store.setMode('pomodoro');
      
      expect(store.pomodoroSessions).toHaveLength(0);
      
      store.nextPomodoroPhase();
      
      expect(store.pomodoroSessions).toHaveLength(1);
      expect(store.pomodoroSessions[0].phase).toBe('work');
      expect(store.pomodoroSessions[0].duration).toBe(25 * 60 * 1000);
    });
  });

  describe('Cambio de modo', () => {
    it('debería cambiar de cronómetro a Pomodoro', () => {
      const store = useTimerStore.getState();
      
      // Iniciar en modo cronómetro
      expect(store.mode).toBe('stopwatch');
      expect(store.time).toBe(0);
      
      // Cambiar a Pomodoro
      store.setMode('pomodoro');
      
      expect(store.mode).toBe('pomodoro');
      expect(store.time).toBe(25 * 60 * 1000);
      expect(store.currentPhase).toBe('work');
    });

    it('debería cambiar de Pomodoro a cronómetro', () => {
      const store = useTimerStore.getState();
      store.setMode('pomodoro');
      
      // Avanzar en Pomodoro
      store.nextPomodoroPhase();
      expect(store.currentPhase).toBe('shortBreak');
      
      // Cambiar a cronómetro
      store.setMode('stopwatch');
      
      expect(store.mode).toBe('stopwatch');
      expect(store.time).toBe(0);
      expect(store.laps).toHaveLength(0);
    });
  });

  describe('Auto-avance de fases', () => {
    it('debería auto-avanzar cuando el tiempo llegue a 0', () => {
      const store = useTimerStore.getState();
      store.setMode('pomodoro');
      
      // Configurar tiempo muy pequeño
      store.setPomodoroConfig({ workDuration: 1000 });
      
      mockPerformanceNow.mockReturnValue(1000);
      store.start();
      
      // Simular que el tiempo llegó a 0
      mockPerformanceNow.mockReturnValue(2000);
      store.tick();
      
      // Debería haber avanzado automáticamente a la siguiente fase
      expect(store.currentPhase).toBe('shortBreak');
      expect(store.sessionCount).toBe(1);
    });
  });
});