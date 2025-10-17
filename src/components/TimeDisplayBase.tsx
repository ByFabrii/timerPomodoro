import React from 'react';
import { formatTime } from '../utils/timeFormatter';

interface TimeDisplayBaseProps {
  time: number;
  isRunning: boolean;
  textColor?: string;
}

export const TimeDisplayBase: React.FC<TimeDisplayBaseProps> = ({ time, isRunning, textColor }) => {
  return (
    <div className={`timer-display ${isRunning ? 'running' : ''}`}>
      <div className="time-text" style={{ color: textColor }}>
        {formatTime(time)}
      </div>
    </div>
  );
};