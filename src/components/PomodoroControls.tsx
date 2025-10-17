import React from 'react';
import clsx from 'clsx';
import type { PomodoroPhase } from '../types/timer';
import './PomodoroControls.css';

interface PomodoroControlsProps {
  isRunning: boolean;
  time: number;
  currentPhase: PomodoroPhase;
  sessionCount: number;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onNextPhase: () => void;
  onResetPomodoro: () => void;
}

const PHASE_LABELS = {
  work: 'Trabajo',
  shortBreak: 'Descanso Corto',
  longBreak: 'Descanso Largo',
};

const PHASE_ICONS = {
  work: '💼',
  shortBreak: '☕',
  longBreak: '🛋️',
};

export const PomodoroControls: React.FC<PomodoroControlsProps> = ({
  isRunning,
  time,
  currentPhase,
  sessionCount,
  onStart,
  onPause,
  onReset,
  onNextPhase,
  onResetPomodoro,
}) => {
  return (
    <div className="pomodoro-controls">
      {/* Indicador de fase actual */}
      <div className="phase-indicator">
        <div className={clsx('phase-badge', currentPhase)}>
          <span className="phase-icon">{PHASE_ICONS[currentPhase]}</span>
          <span className="phase-label">{PHASE_LABELS[currentPhase]}</span>
        </div>
        <div className="session-counter">
          Sesión {sessionCount + 1}
        </div>
      </div>

      {/* Controles principales */}
      <div className="primary-controls">
        <button
          className={clsx('control-btn', 'primary', {
            'start': !isRunning,
            'pause': isRunning,
          })}
          onClick={isRunning ? onPause : onStart}
          aria-label={isRunning ? 'Pausar temporizador' : 'Iniciar temporizador'}
        >
          {isRunning ? (
            <>
              <span className="btn-icon">⏸</span>
              Pausar
            </>
          ) : (
            <>
              <span className="btn-icon">▶</span>
              Iniciar
            </>
          )}
        </button>

        <button
          className="control-btn secondary"
          onClick={onReset}
          disabled={time === 0 && !isRunning}
          aria-label="Reiniciar fase actual"
        >
          <span className="btn-icon">⏹</span>
          Reiniciar
        </button>
      </div>

      {/* Controles secundarios */}
      <div className="secondary-controls">
        <button
          className="control-btn next-phase"
          onClick={onNextPhase}
          disabled={isRunning}
          aria-label="Siguiente fase"
        >
          <span className="btn-icon">⏭</span>
          Siguiente Fase
        </button>

        <button
          className="control-btn reset-pomodoro"
          onClick={onResetPomodoro}
          disabled={isRunning}
          aria-label="Reiniciar Pomodoro completo"
        >
          <span className="btn-icon">🔄</span>
          Reiniciar Todo
        </button>
      </div>

      {/* Atajos de teclado */}
      <div className="keyboard-hints">
        <span>Espacio: Iniciar/Pausar</span>
        <span>R: Reiniciar Fase</span>
        <span>Ctrl+N: Siguiente Fase</span>
        <span>Ctrl+P: Reiniciar Todo</span>
        <span>Ctrl+T: Cambiar Modo</span>
        <span>F: Pantalla Completa</span>
      </div>
    </div>
  );
};