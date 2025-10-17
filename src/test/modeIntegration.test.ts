import { describe, it, expect, beforeEach, vi } from 'vitest';
import useTimerStore from '../stores/timerStore';

// Mock de performance.now y crypto.randomUUID
const mockPerformanceNow = vi.fn();
const mockCryptoRandomUUID = vi.fn();

Object.defineProperty(global, 'performance', {
  value: { now: mockPerformanceNow },
});

Object.defineProperty(global, 'crypto', {
  value: { randomUUID: mockCryptoRandomUUID },
});

describe('Integración de Modos', () => {
  beforeEach(() => {
    // Reset del store antes de cada test
    useTimerStore.getState().reset();
    mockPerformanceNow.mockReturnValue(0);
    mockCryptoRandomUUID.mockReturnValue('test-uuid');
  });

  describe('Cambio entre modos', () => {
    it('debería mantener funcionalidad del cronómetro intacta', () => {
      const store = useTimerStore.getState();
      
      // Verificar modo inicial
      expect(store.mode).toBe('stopwatch');
      expect(store.time).toBe(0);
      
      // Simular uso del cronómetro
      mockPerformanceNow.mockReturnValue(1000);
      store.start();
      
      mockPerformanceNow.mockReturnValue(6000);
      store.tick();
      
      expect(store.time).toBe(5000); // 5 segundos
      expect(store.isRunning).toBe(true);
      
      // Agregar vuelta
      store.addLap();
      expect(store.laps).toHaveLength(1);
      expect(store.laps[0].time).toBe(5000);
    });

    it('debería cambiar a Pomodoro sin afectar el cronómetro', () => {
      const store = useTimerStore.getState();
      
      // Usar cronómetro primero
      mockPerformanceNow.mockReturnValue(1000);
      store.start();
      mockPerformanceNow.mockReturnValue(6000);
      store.tick();
      store.addLap();
      
      const originalLaps = store.laps;
      
      // Cambiar a Pomodoro
      store.setMode('pomodoro');
      
      expect(store.mode).toBe('pomodoro');
      expect(store.time).toBe(25 * 60 * 1000); // 25 minutos
      expect(store.currentPhase).toBe('work');
      expect(store.isRunning).toBe(false);
      
      // Volver a cronómetro
      store.setMode('stopwatch');
      
      expect(store.mode).toBe('stopwatch');
      expect(store.time).toBe(0); // Reset al cambiar
      expect(store.laps).toEqual(originalLaps); // Vueltas preservadas
    });

    it('debería funcionar el temporizador descendente en Pomodoro', () => {
      const store = useTimerStore.getState();
      store.setMode('pomodoro');
      
      // Configurar tiempo pequeño para testing
      store.setPomodoroConfig({ workDuration: 10000 }); // 10 segundos
      
      expect(store.time).toBe(10000);
      expect(store.targetTime).toBe(10000);
      
      // Iniciar temporizador
      mockPerformanceNow.mockReturnValue(1000);
      store.start();
      
      // Simular 3 segundos transcurridos
      mockPerformanceNow.mockReturnValue(4000);
      store.tick();
      
      expect(store.time).toBe(7000); // 10000 - 3000 = 7000
      expect(store.isRunning).toBe(true);
    });

    it('debería auto-avanzar fases en Pomodoro', () => {
      const store = useTimerStore.getState();
      store.setMode('pomodoro');
      
      // Configurar tiempo muy pequeño
      store.setPomodoroConfig({ 
        workDuration: 1000,
        shortBreakDuration: 500 
      });
      
      expect(store.currentPhase).toBe('work');
      expect(store.sessionCount).toBe(0);
      
      // Simular completar fase de trabajo
      mockPerformanceNow.mockReturnValue(1000);
      store.start();
      mockPerformanceNow.mockReturnValue(2000);
      store.tick();
      
      // Debería haber avanzado automáticamente
      expect(store.currentPhase).toBe('shortBreak');
      expect(store.sessionCount).toBe(1);
      expect(store.time).toBe(500); // Tiempo del descanso corto
      expect(store.isRunning).toBe(false);
    });
  });

  describe('Persistencia entre modos', () => {
    it('debería mantener configuración de Pomodoro al cambiar modos', () => {
      const store = useTimerStore.getState();
      store.setMode('pomodoro');
      
      // Cambiar configuración
      const customConfig = {
        workDuration: 30 * 60 * 1000,
        shortBreakDuration: 10 * 60 * 1000,
      };
      store.setPomodoroConfig(customConfig);
      
      // Cambiar a cronómetro y volver
      store.setMode('stopwatch');
      store.setMode('pomodoro');
      
      expect(store.pomodoroConfig.workDuration).toBe(30 * 60 * 1000);
      expect(store.pomodoroConfig.shortBreakDuration).toBe(10 * 60 * 1000);
    });

    it('debería mantener sesiones de Pomodoro al cambiar modos', () => {
      const store = useTimerStore.getState();
      store.setMode('pomodoro');
      
      // Completar una sesión
      store.nextPomodoroPhase();
      expect(store.pomodoroSessions).toHaveLength(1);
      
      // Cambiar a cronómetro y volver
      store.setMode('stopwatch');
      store.setMode('pomodoro');
      
      expect(store.pomodoroSessions).toHaveLength(1);
    });
  });

  describe('Estados de error y edge cases', () => {
    it('debería manejar tiempo negativo en Pomodoro', () => {
      const store = useTimerStore.getState();
      store.setMode('pomodoro');
      
      store.setPomodoroConfig({ workDuration: 1000 });
      
      mockPerformanceNow.mockReturnValue(1000);
      store.start();
      
      // Simular más tiempo del disponible
      mockPerformanceNow.mockReturnValue(5000);
      store.tick();
      
      expect(store.time).toBe(0); // No debe ser negativo
    });

    it('debería prevenir agregar vueltas en modo Pomodoro', () => {
      const store = useTimerStore.getState();
      store.setMode('pomodoro');
      
      mockPerformanceNow.mockReturnValue(1000);
      store.start();
      
      const initialLaps = store.laps.length;
      store.addLap();
      
      expect(store.laps).toHaveLength(initialLaps); // No debe agregar vueltas
    });
  });
});