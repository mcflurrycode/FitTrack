import React from 'react';
import { X, Play, Clock, Flame, Dumbbell, Shield, Info, CheckCircle2 } from 'lucide-react';
import { Workout } from '../types/fitness';

interface WorkoutDetailModalProps {
  workout: Workout | null;
  onClose: () => void;
  onStart: (workout: Workout) => void;
}

export const WorkoutDetailModal: React.FC<WorkoutDetailModalProps> = ({
  workout,
  onClose,
  onStart,
}) => {
  if (!workout) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/80 backdrop-blur-sm p-0 sm:p-4 overflow-y-auto animate-fadeIn"
    >
      <div className="relative w-full max-w-xl max-h-[92vh] sm:max-h-[85vh] bg-slate-900 border border-slate-750 border-slate-700/80 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Drag handle affordance on mobile */}
        <div className="sm:hidden w-10 h-1 bg-slate-700 rounded-full mx-auto my-2.5 shrink-0" />

        {/* Top Header with Close Button */}
        <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-slate-950">
          <img
            src={workout.imageUrl}
            alt={workout.title}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close workout details"
            className="absolute top-3 right-3 min-h-[44px] min-w-[44px] rounded-full bg-slate-900/80 hover:bg-slate-900 text-slate-300 hover:text-white flex items-center justify-center backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title overlay */}
          <div className="absolute bottom-3 left-4 right-4 space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <span>{workout.category}</span>
              <span aria-hidden="true">·</span>
              <span>{workout.primaryMuscle}</span>
              <span aria-hidden="true">·</span>
              <span>{workout.intensity} Intensity</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {workout.title}
            </h2>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-300">
          {/* Trainer and Key Parameters */}
          <div className="grid grid-cols-3 gap-2 py-3 px-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center text-xs">
            <div>
              <span className="text-slate-400 block mb-0.5">Duration</span>
              <strong className="text-white font-bold text-sm tabular-nums">
                {workout.durationMinutes} min
              </strong>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Burn</span>
              <strong className="text-white font-bold text-sm tabular-nums">
                ~{workout.caloriesEstimate} kcal
              </strong>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Equipment</span>
              <strong className="text-white font-bold text-xs truncate block">
                {workout.equipment}
              </strong>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <h3 className="text-xs uppercase tracking-wider font-bold text-slate-400">
              Overview & Focus
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {workout.description}
            </p>
          </div>

          {/* Trainer note */}
          <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs text-white shrink-0">
              {workout.trainer.split(' ').map((n) => n[0]).join('')}
            </div>
            <div className="text-xs">
              <span className="text-slate-400 block">Lead Coach</span>
              <strong className="text-white font-semibold">{workout.trainer}</strong>
            </div>
          </div>

          {/* Exercise Circuit Breakdown */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white tracking-tight">
                Movement Breakdown ({workout.exercises.length} Exercises)
              </h3>
              <span className="text-xs text-slate-400">Step by Step</span>
            </div>

            <div className="space-y-2.5">
              {workout.exercises.map((exercise, idx) => (
                <div
                  key={exercise.id}
                  className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-start gap-3"
                >
                  <span className="w-6 h-6 rounded-full bg-slate-700/80 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 tabular-nums">
                    {idx + 1}
                  </span>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-white">
                        {exercise.name}
                      </h4>
                      <span className="text-xs font-semibold text-slate-400 tabular-nums">
                        {exercise.durationSeconds ? `${exercise.durationSeconds}s` : `${exercise.reps} reps`}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Target: <span className="text-slate-300 font-medium">{exercise.targetMuscle}</span>
                    </p>
                    <p className="text-xs text-slate-300 italic pt-0.5">
                      "{exercise.tip}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/95 shrink-0 flex items-center gap-3">
          <button
            onClick={() => onStart(workout)}
            className="flex-1 min-h-[48px] px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition-all"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            Start Session Now
          </button>
        </div>
      </div>
    </div>
  );
};
