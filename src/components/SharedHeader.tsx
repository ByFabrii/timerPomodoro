import React from 'react';
import type { TimerMode } from '../types/timer';
import logo from '../assets/fabrizzioDev.png';
import './SharedHeader.css';

interface SharedHeaderProps {
  mode: TimerMode;
}

export const SharedHeader: React.FC<SharedHeaderProps> = ({ mode }) => {
    const label = mode === 'stopwatch' ? 'Cronómetro' : mode === 'pomodoro' ? 'Pomodoro' : 'Reloj';

    return (
        <header
            className="shared-header"
            role="banner"
            aria-label={`Modo actual: ${label}`}
        >
            <div className="brand">
                <img className="brand-logo" src={logo} alt="Logo Tiempo" />
                <span className="brand-name">Tiempo</span>
            </div>
        </header>
    );
};