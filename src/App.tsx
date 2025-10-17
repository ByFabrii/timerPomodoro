import { TimerDisplay } from './components/TimerDisplay';
import { TimerControls } from './components/TimerControls';
import { LapsList } from './components/LapsList';
import { FullscreenButton } from './components/FullscreenButton';
import { useTimer } from './hooks/useTimer';
import './App.css';

function App() {
  const {
    time,
    isRunning,
    laps,
    start,
    pause,
    reset,
    addLap,
    isFullscreen,
    toggleFullscreen,
  } = useTimer();

  return (
    <div className={`app ${isFullscreen ? 'fullscreen' : ''}`}>
      <FullscreenButton 
        isFullscreen={isFullscreen}
        onToggle={toggleFullscreen}
      />

      {!isFullscreen && (
        <header className="app-header">
          <h1 className="app-title">
            <span className="title-icon">⏱️</span>
            Cronómetro Pro
          </h1>
          <p className="app-subtitle">
            Cronómetro de alta precisión con registro de vueltas
          </p>
        </header>
      )}

      <main className="app-main">
        <TimerDisplay 
          time={time} 
          isRunning={isRunning} 
        />
        
        {!isFullscreen && (
          <>
            <TimerControls
              isRunning={isRunning}
              time={time}
              onStart={start}
              onPause={pause}
              onReset={reset}
              onLap={addLap}
            />
            
            <LapsList laps={laps} />
          </>
        )}
      </main>

      {!isFullscreen && (
        <footer className="app-footer">
          <p>
            Hecho con ❤️ por FabrizzioDev
          </p>
        </footer>
      )}
    </div>
  );
}

export default App;
