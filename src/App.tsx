import { useTimer } from './hooks/useTimer';
import { TimerDisplay } from './components/TimerDisplay';
import { TimerControls } from './components/TimerControls';
import { PomodoroControls } from './components/PomodoroControls';
import { PomodoroDisplay } from './components/PomodoroDisplay';
import { PomodoroConfigComponent } from './components/PomodoroConfig';
import { LapsList } from './components/LapsList';
import { FullscreenButton } from './components/FullscreenButton';
import { ModeSelector } from './components/ModeSelector';
import { ClockDisplay } from './components/ClockDisplay';
import { ClockControls } from './components/ClockControls';
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
    clockTimezone,
    setClockTimezone,
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
            {mode === 'stopwatch' ? 'Cronómetro Pro' : mode === 'pomodoro' ? 'Pomodoro Timer' : 'Reloj'}
          </h1>
          <p className="app-subtitle">
            {mode === 'stopwatch' 
              ? 'Cronómetro de alta precisión con registro de vueltas'
              : mode === 'pomodoro'
                ? 'Técnica Pomodoro para máxima productividad'
                : 'Reloj en tiempo real (12 h) zona Ciudad de México'
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
        ) : mode === 'pomodoro' ? (
          <PomodoroDisplay
            time={time}
            targetTime={targetTime}
            isRunning={isRunning}
            currentPhase={currentPhase}
          />
        ) : (
          <ClockDisplay timezone={clockTimezone} />
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
            ) : mode === 'pomodoro' ? (
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
            ) : (
              <ClockControls
                currentTimezone={clockTimezone}
                onChange={setClockTimezone}
              />
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
