import React, { useState, useEffect } from 'react';
import { X, Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, CheckCircle, Flame, Clock, Award } from 'lucide-react';
import { Workout, WorkoutLogEntry } from '../types/fitness';
import { sound } from './AudioChime';

interface WorkoutPlayerModalProps {
  workout: Workout | null;
  onClose: () => void;
  onFinishWorkout: (log: Omit<WorkoutLogEntry, 'id'>) => void;
}

export const WorkoutPlayerModal: React.FC<WorkoutPlayerModalProps> = ({
  workout,
  onClose,
  onFinishWorkout,
}) => {
  if (!workout) return null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(() => {
    return workout.exercises[0]?.durationSeconds || 45;
  });
  const [isActive, setIsActive] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [totalSecondsElapsed, setTotalSecondsElapsed] = useState(0);
  const [feeling, setFeeling] = useState<'Easy' | 'Just Right' | 'Challenging'>('Just Right');
  const [soundEnabled, setSoundEnabled] = useState(true);

  const currentExercise = workout.exercises[currentIndex];
  const nextExercise = workout.exercises[currentIndex + 1];

  // Sync sound service toggle
  useEffect(() => {
    sound.enabled = soundEnabled;
  }, [soundEnabled]);

  // Exercise interval timer
  useEffect(() => {
    if (!isActive || isCompleted) return;

    const timer = setInterval(() => {
      setTotalSecondsElapsed((prev) => prev + 1);

      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          // Play transition beep
          sound.playBeep(784, 250);
          // Advance exercise or finish
          if (currentIndex < workout.exercises.length - 1) {
            const nextIdx = currentIndex + 1;
            setCurrentIndex(nextIdx);
            return workout.exercises[nextIdx]?.durationSeconds || 45;
          } else {
            setIsCompleted(true);
            sound.playSuccessFanfare();
            return 0;
          }
        }

        // 3, 2, 1 countdown audio cue
        if (prev <= 4 && prev > 1) {
          sound.playBeep(523.25, 100);
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, isCompleted, currentIndex, workout.exercises]);

  const handleNext = () => {
    if (currentIndex < workout.exercises.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setSecondsRemaining(workout.exercises[nextIdx]?.durationSeconds || 45);
    } else {
      setIsCompleted(true);
      sound.playSuccessFanfare();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      setSecondsRemaining(workout.exercises[prevIdx]?.durationSeconds || 45);
    }
  };

  const handleFinishEarly = () => {
    setIsCompleted(true);
    sound.playSuccessFanfare();
  };

  const handleSaveAndExit = () => {
    const elapsedMinutes = Math.max(1, Math.round(totalSecondsElapsed / 60));
    const proportionalCalories = Math.round(
      (workout.caloriesEstimate * (currentIndex + 1)) / workout.exercises.length
    );

    onFinishWorkout({
      workoutId: workout.id,
      workoutTitle: workout.title,
      durationMinutes: elapsedMinutes,
      caloriesBurned: Math.max(proportionalCalories, 60),
      completedAt: 'Today, Just now',
      feeling,
    });
    onClose();
  };

  // Completion Screen
  if (isCompleted) {
    const elapsedMinutes = Math.max(1, Math.round(totalSecondsElapsed / 60));
    const earnedCalories = Math.max(
      Math.round((workout.caloriesEstimate * (currentIndex + 1)) / workout.exercises.length),
      60
    );

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 p-4 sm:p-6 overflow-y-auto">
        <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-700/80 p-6 sm:p-8 space-y-6 text-center shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center ring-8 ring-emerald-500/10">
            <CheckCircle className="w-9 h-9" />
          </div>

          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-bold text-emerald-400">
              Workout Completed!
            </span>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Great Session, Athlete
            </h2>
            <p className="text-xs text-slate-400">
              {workout.title} · Logged to your weekly progress
            </p>
          </div>

          {/* Results Summary */}
          <div className="grid grid-cols-2 gap-3 py-3">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60">
              <Clock className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
              <span className="text-xs text-slate-400 block">Total Duration</span>
              <strong className="text-xl font-bold text-white tabular-nums">
                {elapsedMinutes} min
              </strong>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60">
              <Flame className="w-4 h-4 text-amber-400 mx-auto mb-1" />
              <span className="text-xs text-slate-400 block">Calories Burned</span>
              <strong className="text-xl font-bold text-white tabular-nums">
                ~{earnedCalories} kcal
              </strong>
            </div>
          </div>

          {/* Perceived Exertion Feedback */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-semibold text-slate-300">
              How did this session feel?
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Easy', 'Just Right', 'Challenging'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setFeeling(lvl)}
                  className={`min-h-[44px] py-2 px-1 rounded-xl text-xs font-semibold border transition-all ${
                    feeling === lvl
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Save & Done Button */}
          <button
            onClick={handleSaveAndExit}
            className="w-full min-h-[48px] py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all"
          >
            Save Workout & Return
          </button>
        </div>
      </div>
    );
  }

  // Active Session Player View
  const progressPercent = Math.round(
    ((currentIndex + 1) / workout.exercises.length) * 100
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 text-white select-none">
      {/* Top Session Bar */}
      <header className="flex items-center justify-between px-5 h-16 border-b border-slate-800/80 shrink-0">
        <button
          onClick={handleFinishEarly}
          className="text-xs font-semibold text-slate-400 hover:text-slate-200 min-h-[44px] px-2 flex items-center"
        >
          End Session
        </button>

        <div className="text-center">
          <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
            Exercise {currentIndex + 1} of {workout.exercises.length}
          </span>
          <span className="text-xs text-slate-400 truncate max-w-[180px] inline-block">
            {workout.title}
          </span>
        </div>

        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          aria-label="Toggle workout audio"
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-white"
        >
          {soundEnabled ? (
            <Volume2 className="w-5 h-5 text-emerald-400" />
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </button>
      </header>

      {/* Progress Track */}
      <div className="h-1.5 w-full bg-slate-900 shrink-0">
        <div
          className="h-full bg-emerald-400 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Center Stage: Current Exercise & Large Timer */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-lg mx-auto w-full space-y-6">
        {/* Target muscle badge */}
        <span className="text-xs font-semibold text-slate-400 tracking-wide uppercase">
          Target: {currentExercise.targetMuscle}
        </span>

        {/* Large Exercise Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white max-w-sm">
          {currentExercise.name}
        </h1>

        {/* Big Circular Countdown Display */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center my-2">
          {/* Subtle Outer Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
          
          <div className="space-y-1">
            <span className="text-5xl sm:text-6xl font-black tracking-tight tabular-nums text-white">
              {secondsRemaining}
            </span>
            <span className="text-xs uppercase tracking-widest text-slate-400 block font-semibold">
              Seconds
            </span>
          </div>
        </div>

        {/* Form Coaching Cue */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 max-w-sm leading-relaxed">
          <strong className="text-emerald-400 block mb-0.5">Coach Tip:</strong>
          "{currentExercise.tip}"
        </div>

        {/* Next Up Sneak Peek */}
        {nextExercise && (
          <div className="text-xs text-slate-400 pt-2">
            Next Up: <strong className="text-slate-200">{nextExercise.name}</strong>
          </div>
        )}
      </main>

      {/* Bottom Controls Bar */}
      <footer className="p-6 border-t border-slate-800/80 bg-slate-900/90 shrink-0">
        <div className="flex items-center justify-center gap-6 max-w-xs mx-auto">
          {/* Previous Exercise */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous exercise"
            className="min-h-[48px] min-w-[48px] rounded-full bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 flex items-center justify-center text-slate-300 transition-colors"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          {/* Pause / Play */}
          <button
            onClick={() => setIsActive(!isActive)}
            aria-label={isActive ? 'Pause workout' : 'Resume workout'}
            className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/25 active:scale-95 transition-all"
          >
            {isActive ? (
              <Pause className="w-7 h-7 fill-slate-950" />
            ) : (
              <Play className="w-7 h-7 fill-slate-950 ml-1" />
            )}
          </button>

          {/* Next Exercise */}
          <button
            onClick={handleNext}
            aria-label="Next exercise"
            className="min-h-[48px] min-w-[48px] rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition-colors"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </div>
  );
};
