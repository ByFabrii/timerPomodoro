import React, { useEffect, useState } from 'react';
import './TimerDisplay.css';
import { getTimeParts, getTimezoneLabel, type ClockParts } from '../utils/clock';

interface ClockDisplayProps {
  timezone: string;
}

export const ClockDisplay: React.FC<ClockDisplayProps> = ({ timezone }) => {
  const [parts, setParts] = useState<ClockParts>(getTimeParts(timezone));

  useEffect(() => {
    let timeoutId: number | undefined;
    let cancelled = false;

    const schedule = () => {
      const now = Date.now();
      const next = 1000 - (now % 1000);
      timeoutId = window.setTimeout(() => {
        setParts(getTimeParts(timezone));
        if (!cancelled) schedule();
      }, next);
    };

    schedule();
    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timezone]);

  return (
    <div className="timer-display">
      <div className="day">{parts.weekday}</div>
      <div className="time-text clock-text">
        <span className="hours">{parts.hours}</span>
        <span className="colon">:</span>
        <span className="minutes">{parts.minutes}</span>
        <span className="seconds">{parts.seconds}</span>
      </div>
      <div className="ampm">{parts.period}</div>
      <div className="tz-label">{getTimezoneLabel(timezone)}</div>
    </div>
  );
};