import React, { useState } from 'react';
import type { PomodoroConfig } from '../types/timer';
import './PomodoroConfig.css';

interface PomodoroConfigProps {
  config: PomodoroConfig;
  onConfigChange: (config: Partial<PomodoroConfig>) => void;
  disabled?: boolean;
}

export const PomodoroConfigComponent: React.FC<PomodoroConfigProps> = ({
  config,
  onConfigChange,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDurationChange = (key: keyof PomodoroConfig, minutes: number) => {
    const milliseconds = minutes * 60 * 1000;
    onConfigChange({ [key]: milliseconds });
  };

  const handleIntervalChange = (interval: number) => {
    onConfigChange({ longBreakInterval: interval });
  };

  return (
    <div className="pomodoro-config">
      <button
        className="config-toggle"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        aria-label="Configuración del Pomodoro"
      >
        <span className="config-icon">⚙️</span>
        Configuración
        <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="config-panel">
          <div className="config-section">
            <h3>Duración de Fases</h3>
            
            <div className="config-item">
              <label htmlFor="work-duration">Trabajo (minutos):</label>
              <input
                id="work-duration"
                type="number"
                min="1"
                max="60"
                value={config.workDuration / (60 * 1000)}
                onChange={(e) => handleDurationChange('workDuration', parseInt(e.target.value))}
                disabled={disabled}
              />
            </div>

            <div className="config-item">
              <label htmlFor="short-break-duration">Descanso Corto (minutos):</label>
              <input
                id="short-break-duration"
                type="number"
                min="1"
                max="30"
                value={config.shortBreakDuration / (60 * 1000)}
                onChange={(e) => handleDurationChange('shortBreakDuration', parseInt(e.target.value))}
                disabled={disabled}
              />
            </div>

            <div className="config-item">
              <label htmlFor="long-break-duration">Descanso Largo (minutos):</label>
              <input
                id="long-break-duration"
                type="number"
                min="1"
                max="60"
                value={config.longBreakDuration / (60 * 1000)}
                onChange={(e) => handleDurationChange('longBreakDuration', parseInt(e.target.value))}
                disabled={disabled}
              />
            </div>

            <div className="config-item">
              <label htmlFor="long-break-interval">Descanso Largo cada (sesiones):</label>
              <input
                id="long-break-interval"
                type="number"
                min="2"
                max="10"
                value={config.longBreakInterval}
                onChange={(e) => handleIntervalChange(parseInt(e.target.value))}
                disabled={disabled}
              />
            </div>
          </div>

          <div className="config-presets">
            <h4>Presets Populares</h4>
            <div className="preset-buttons">
              <button
                className="preset-btn"
                onClick={() => onConfigChange({
                  workDuration: 25 * 60 * 1000,
                  shortBreakDuration: 5 * 60 * 1000,
                  longBreakDuration: 15 * 60 * 1000,
                  longBreakInterval: 4,
                })}
                disabled={disabled}
              >
                Clásico (25/5/15)
              </button>
              
              <button
                className="preset-btn"
                onClick={() => onConfigChange({
                  workDuration: 50 * 60 * 1000,
                  shortBreakDuration: 10 * 60 * 1000,
                  longBreakDuration: 30 * 60 * 1000,
                  longBreakInterval: 3,
                })}
                disabled={disabled}
              >
                Extendido (50/10/30)
              </button>
              
              <button
                className="preset-btn"
                onClick={() => onConfigChange({
                  workDuration: 15 * 60 * 1000,
                  shortBreakDuration: 3 * 60 * 1000,
                  longBreakDuration: 10 * 60 * 1000,
                  longBreakInterval: 4,
                })}
                disabled={disabled}
              >
                Corto (15/3/10)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};