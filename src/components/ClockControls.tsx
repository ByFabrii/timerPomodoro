import React from 'react';
import './ClockControls.css';
import { TIMEZONE_LABELS } from '../utils/clock';

interface ClockControlsProps {
  currentTimezone: string;
  onChange: (tz: string) => void;
}

const ZONES = [
  'America/Mexico_City',
  'America/New_York',
  'Europe/Madrid',
  'Europe/London',
  'Asia/Tokyo',
  'Australia/Sydney',
];

export const ClockControls: React.FC<ClockControlsProps> = ({ currentTimezone, onChange }) => {
  return (
    <div className="clock-controls">
      <div className="clock-zones">
        {ZONES.map((tz) => (
          <button
            key={tz}
            className={`clock-zone-btn ${currentTimezone === tz ? 'active' : ''}`}
            onClick={() => onChange(tz)}
            aria-label={`Cambiar a ${TIMEZONE_LABELS[tz] ?? tz}`}
          >
            {TIMEZONE_LABELS[tz] ?? tz}
          </button>
        ))}
      </div>
    </div>
  );
};