import React from 'react';
import type { Lap } from '../types/timer';
import { formatTime, formatLapTime } from '../utils/timeFormatter';
import './LapsList.css';

interface LapsListProps {
  laps: Lap[];
}

export const LapsList: React.FC<LapsListProps> = ({ laps }) => {
  if (laps.length === 0) {
    return (
      <div className="laps-empty">
        <p>No hay vueltas registradas</p>
        <p className="hint">Presiona "Vuelta" o la tecla L para registrar una vuelta</p>
      </div>
    );
  }

  const fastestLap = laps.reduce((fastest, lap) => 
    lap.lapTime < fastest.lapTime ? lap : fastest
  );
  
  const slowestLap = laps.reduce((slowest, lap) => 
    lap.lapTime > slowest.lapTime ? lap : slowest
  );

  return (
    <div className="laps-container">
      <h3 className="laps-title">
        Vueltas Registradas ({laps.length})
      </h3>
      
      <div className="laps-list">
        {laps.map((lap, index) => {
          const lapNumber = laps.length - index;
          const isFastest = lap.id === fastestLap.id && laps.length > 1;
          const isSlowest = lap.id === slowestLap.id && laps.length > 1;
          
          return (
            <div 
              key={lap.id} 
              className={`lap-item ${isFastest ? 'fastest' : ''} ${isSlowest ? 'slowest' : ''}`}
            >
              <div className="lap-number">
                #{lapNumber}
                {isFastest && <span className="badge fastest">Más rápida</span>}
                {isSlowest && <span className="badge slowest">Más lenta</span>}
              </div>
              
              <div className="lap-times">
                <div className="lap-time">
                  <span className="label">Vuelta:</span>
                  <span className="time">{formatLapTime(lap.lapTime)}</span>
                </div>
                <div className="total-time">
                  <span className="label">Total:</span>
                  <span className="time">{formatTime(lap.time)}</span>
                </div>
              </div>
              
              <div className="lap-timestamp">
                {lap.timestamp.toLocaleTimeString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};