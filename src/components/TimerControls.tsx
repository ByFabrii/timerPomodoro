import React from 'react';
import clsx from 'clsx';
import './TimerControls.css';

interface TimerControlsProps {
  isRunning: boolean;
  time: number;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onLap: () => void;
}

export const TimerControls: React.FC<TimerControlsProps> = ({
  isRunning,
  time,
  onStart,
  onPause,
  onReset,
  onLap,
}) => {
  return (
    <div className="timer-controls">
      <div className="primary-controls">
        <button
          className={clsx('control-btn', 'primary', {
            'start': !isRunning,
            'pause': isRunning,
          })}
          onClick={isRunning ? onPause : onStart}
          aria-label={isRunning ? 'Pausar cronómetro' : 'Iniciar cronómetro'}
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
          aria-label="Reiniciar cronómetro"
        >
          <span className="btn-icon">⏹</span>
          Reiniciar
        </button>
      </div>

      <div className="secondary-controls">
        <button
          className="control-btn lap"
          onClick={onLap}
          disabled={time === 0}
          aria-label="Registrar vuelta"
        >
          <span className="btn-icon">🏁</span>
          Vuelta
        </button>
      </div>

      <div className="keyboard-hints">
        <span>Espacio: Iniciar/Pausar</span>
        <span>Ctrl+R: Reiniciar</span>
        <span>L: Vuelta</span>
        <span>F: Pantalla Completa</span>
      </div>
    </div>
  );
};