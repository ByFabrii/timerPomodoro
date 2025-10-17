import React from 'react';
import type { PomodoroPhase } from '../types/timer';
import './TimerDisplay.css';
import { TimeDisplayBase } from './TimeDisplayBase';
import './PomodoroDisplay.css';

interface PomodoroDisplayProps {
  time: number;
  targetTime: number;
  isRunning: boolean;
  currentPhase: PomodoroPhase;
}

const PHASE_COLORS = {
  work: '#ffffff',
  shortBreak: '#ffffff',
  longBreak: '#ffffff',
};

export const PomodoroDisplay: React.FC<PomodoroDisplayProps> = ({
  time,
  isRunning,
  currentPhase,
}) => {
  const phaseColor = PHASE_COLORS[currentPhase];

  return (
    <>
      <TimeDisplayBase time={time} isRunning={isRunning} textColor={phaseColor} />
    </>
  );
};