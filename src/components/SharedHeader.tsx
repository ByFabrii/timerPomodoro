import React from 'react';
import type { TimerMode } from '../types/timer';
import logo from '../assets/fabrizzioDev.png';
import './SharedHeader.css';

interface SharedHeaderProps {
  mode: TimerMode;
}

const modeLabel = (mode: TimerMode) =>
  mode === 'stopwatch' ? 'Cronómetro' : mode === 'pomodoro' ? 'Pomodoro' : 'Reloj';

export const SharedHeader: React.FC<SharedHeaderProps> = ({ mode }) => {
  return (
    <header className="shared-header" role="banner">
      <div className="brand">
        <img className="brand-logo" src={logo} alt="Logo Tiempo" />
        <span className="brand-name">Tiempo</span>
      </div>
    </header>
  );
};