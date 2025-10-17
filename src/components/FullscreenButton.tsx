import React from 'react';
import './FullscreenButton.css';

interface FullscreenButtonProps {
  isFullscreen: boolean;
  onToggle: () => void;
}

export const FullscreenButton: React.FC<FullscreenButtonProps> = ({
  isFullscreen,
  onToggle,
}) => {
  return (
    <button
      className={`fullscreen-btn ${isFullscreen ? 'active' : ''}`}
      onClick={onToggle}
      aria-label={isFullscreen ? 'Salir de pantalla completa' : 'Entrar en pantalla completa'}
      title={isFullscreen ? 'Salir de pantalla completa (F)' : 'Pantalla completa (F)'}
    >
      <span className="btn-icon">
        {isFullscreen ? '⛶' : '⛶'}
      </span>
      {/* <span className="btn-text">
        {isFullscreen ? 'Salir' : 'Pantalla Completa'}
      </span> */}
    </button>
  );
};