import React from 'react';
import './TimerDisplay.css';
import { TimeDisplayBase } from './TimeDisplayBase';

interface TimerDisplayProps {
  time: number;
  isRunning: boolean;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ time, isRunning }) => {
  return (
    <>
      <TimeDisplayBase time={time} isRunning={isRunning} />
      {/* <div className="status-indicator">
        {isRunning ? 'EJECUTÁNDOSE' : 'PAUSADO'}
      </div> */}
    </>
  );
};