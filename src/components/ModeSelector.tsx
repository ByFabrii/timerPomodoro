import React from 'react';
import clsx from 'clsx';
import type { TimerMode } from '../types/timer';
import './ModeSelector.css';

interface ModeSelectorProps {
  currentMode: TimerMode;
  onModeChange: (mode: TimerMode) => void;
  disabled?: boolean;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  currentMode,
  onModeChange,
  disabled = false,
}) => {
  return (
    <div className="mode-selector">
      <div className="mode-tabs">
        <button
          className={clsx('mode-tab', {
            'active': currentMode === 'stopwatch',
            'disabled': disabled,
          })}
          onClick={() => onModeChange('stopwatch')}
          disabled={disabled}
          aria-label="Modo Cronómetro"
        >
          <span className="mode-icon">⏱️</span>
          <span className="mode-label">Cronómetro</span>
        </button>
        
        <button
          className={clsx('mode-tab', {
            'active': currentMode === 'pomodoro',
            'disabled': disabled,
          })}
          onClick={() => onModeChange('pomodoro')}
          disabled={disabled}
          aria-label="Modo Pomodoro"
        >
          <span className="mode-icon">🍅</span>
          <span className="mode-label">Pomodoro</span>
        </button>
      </div>
      
      {disabled && (
        <div className="mode-disabled-hint">
          Pausa el timer para cambiar de modo
        </div>
      )}
    </div>
  );
};