import React from 'react';
import { formatTime } from '../utils/timeFormatter';
import './TimerDisplay.css';

interface TimerDisplayProps {
  time: number;
  isRunning: boolean;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ time, isRunning }) => {
  return (
    <div className={`timer-display ${isRunning ? 'running' : ''}`}>
      <div className="time-text">
        {formatTime(time)}
      </div>
      {/* <div className="status-indicator">
        {isRunning ? 'EJECUTÁNDOSE' : 'PAUSADO'}
      </div> */}
    </div>
  );
};