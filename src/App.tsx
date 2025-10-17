import { useTimer } from './hooks/useTimer';
import { TimerDisplay } from './components/TimerDisplay';
import { TimerControls } from './components/TimerControls';
import { PomodoroControls } from './components/PomodoroControls';
import { PomodoroDisplay } from './components/PomodoroDisplay';
import { PomodoroConfigComponent } from './components/PomodoroConfig';
import { LapsList } from './components/LapsList';
import { FullscreenButton } from './components/FullscreenButton';
import { ModeSelector } from './components/ModeSelector';
import './App.css';

function App() {
  const {
    time,
    isRunning,
    laps,
    isFullscreen,
    mode,
    currentPhase,
    sessionCount,
    targetTime,
    pomodoroConfig,
    start,
    pause,
    reset,
    addLap,
    toggleFullscreen,
    setMode,
    nextPomodoroPhase,
    resetPomodoro,
    setPomodoroConfig,
  } = useTimer();

  return (
    <div className={`app ${isFullscreen ? 'fullscreen' : ''} ${mode}`}>
      <FullscreenButton 
        isFullscreen={isFullscreen}
        onToggle={toggleFullscreen}
      />

      {!isFullscreen && (
        <header className="app-header">
          <h1 className="app-title">
            <span className="title-icon">⏱️</span>
            {mode === 'stopwatch' ? 'Cronómetro Pro' : 'Pomodoro Timer'}
          </h1>
          <p className="app-subtitle">
            {mode === 'stopwatch' 
              ? 'Cronómetro de alta precisión con registro de vueltas'
              : 'Técnica Pomodoro para máxima productividad'
            }
          </p>
        </header>
      )}

      <main className="app-main">
        {!isFullscreen && (
          <ModeSelector
            currentMode={mode}
            onModeChange={setMode}
            disabled={isRunning}
          />
        )}

        {mode === 'stopwatch' ? (
          <TimerDisplay time={time} isRunning={isRunning} />
        ) : (
          <PomodoroDisplay
            time={time}
            targetTime={targetTime}
            isRunning={isRunning}
            currentPhase={currentPhase}
          />
        )}
        
        {!isFullscreen && (
          <>
            {mode === 'stopwatch' ? (
              <TimerControls
                isRunning={isRunning}
                time={time}
                onStart={start}
                onPause={pause}
                onReset={reset}
                onLap={addLap}
              />
            ) : (
              <>
                <PomodoroControls
                  isRunning={isRunning}
                  time={time}
                  currentPhase={currentPhase}
                  sessionCount={sessionCount}
                  onStart={start}
                  onPause={pause}
                  onReset={reset}
                  onNextPhase={nextPomodoroPhase}
                  onResetPomodoro={resetPomodoro}
                />
                
                {!isRunning && (
                  <PomodoroConfigComponent
                    config={pomodoroConfig}
                    onConfigChange={setPomodoroConfig}
                    disabled={isRunning}
                  />
                )}
              </>
            )}
            
            {mode === 'stopwatch' && <LapsList laps={laps} />}
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
