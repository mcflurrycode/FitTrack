import React from 'react';
import { Play, Clock, Flame, ChevronRight, Zap, CheckCircle2, RotateCw } from 'lucide-react';
import { Workout, HealthGoal } from '../types/fitness';

interface TodayTabProps {
  heroWorkout: Workout;
  expressWorkout: Workout;
  recoveryWorkout: Workout;
  healthGoal: HealthGoal;
  onSelectWorkout: (workout: Workout) => void;
  onStartWorkout: (workout: Workout) => void;
  onOpenGoalModal: () => void;
}

export const TodayTab: React.FC<TodayTabProps> = ({
  heroWorkout,
  expressWorkout,
  recoveryWorkout,
  healthGoal,
  onSelectWorkout,
  onStartWorkout,
  onOpenGoalModal,
}) => {
  const percentComplete = Math.min(
    100,
    Math.round((healthGoal.currentWeeklyCompleted / healthGoal.weeklyTargetSessions) * 100)
  );

  const workoutsNeeded = Math.max(
    0,
    healthGoal.weeklyTargetSessions - healthGoal.currentWeeklyCompleted
  );

  return (
    <div className="space-y-8 pb-10">
      {/* 1. Header with clear hierarchy and generous whitespace */}
      <section className="pt-2">
        <div className="flex items-baseline justify-between mb-1">
          <p className="text-xs uppercase tracking-wider font-semibold text-emerald-400">
            Personalized Daily Routine
          </p>
          <span className="text-xs text-slate-400 font-medium">
            Week 4 · Day 4
          </span>
        </div>
        <h1 className="text-2xl xs:text-3xl font-extrabold tracking-tight text-white">
          Today's Workout
        </h1>
        <p className="text-sm text-slate-300 mt-1 max-w-md leading-relaxed">
          Curated for your <span className="text-white font-medium">{healthGoal.goalTitle}</span> goal.
        </p>
      </section>

      {/* 2. Dominant Hero Card (Prioritizing today's workout) */}
      <section aria-labelledby="today-hero-title">
        <div className="group relative rounded-3xl overflow-hidden bg-slate-800/90 border border-slate-700/70 shadow-xl shadow-slate-950/40 transition-all duration-200 hover:border-slate-600">
          {/* Workout Image with measured gradient scrim */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-slate-900">
            <img
              src={heroWorkout.imageUrl}
              alt={heroWorkout.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              referrerPolicy="no-referrer"
            />
            {/* Scrim ensuring legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
            
            {/* Top metadata kicker (NO static pills - clean unboxed typography) */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs text-slate-200 drop-shadow">
              <span className="font-semibold tracking-wide text-emerald-300">
                DAILY PICK
              </span>
              <span className="text-slate-300">
                {heroWorkout.trainer}
              </span>
            </div>

            {/* Bottom image overlay details */}
            <div className="absolute bottom-4 left-4 right-4 space-y-1">
              {/* Clean metadata line with dot separators */}
              <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                <span>{heroWorkout.durationMinutes} min</span>
                <span aria-hidden="true">·</span>
                <span>{heroWorkout.intensity} Intensity</span>
                <span aria-hidden="true">·</span>
                <span>{heroWorkout.equipment}</span>
              </div>
              <h2
                id="today-hero-title"
                className="text-xl sm:text-2xl font-bold tracking-tight text-white"
              >
                {heroWorkout.title}
              </h2>
            </div>
          </div>

          {/* Card Body - Clear context and CTA */}
          <div className="p-5 sm:p-6 space-y-4">
            {/* Recommendation rationale */}
            {heroWorkout.recommendationReason && (
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed border-l-2 border-emerald-400 pl-3">
                {heroWorkout.recommendationReason}
              </p>
            )}

            {/* Target Exercises Breakdown Preview */}
            <div className="pt-1 flex items-center justify-between text-xs text-slate-400 border-t border-slate-700/50">
              <span>{heroWorkout.exercises.length} focused movements</span>
              <span className="tabular-nums">~{heroWorkout.caloriesEstimate} kcal burn</span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 pt-1">
              <button
                onClick={() => onStartWorkout(heroWorkout)}
                className="min-h-[48px] px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                Start Workout
              </button>

              <button
                onClick={() => onSelectWorkout(heroWorkout)}
                className="min-h-[48px] px-4 py-3 rounded-xl bg-slate-700/70 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-sm flex items-center justify-center gap-1.5 transition-colors border border-slate-600/60"
              >
                View Plan & Form
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Goal Efficiency Progress Card (What the user needs to reach goals) */}
      <section className="rounded-2xl p-5 bg-slate-850/80 bg-slate-800/60 border border-slate-700/60 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Weekly Target Pace
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {workoutsNeeded === 0
                ? 'Weekly goal achieved! Keep pushing your active minutes.'
                : `${workoutsNeeded} more session needed to hit your weekly target.`}
            </p>
          </div>
          <button
            onClick={onOpenGoalModal}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 min-h-[44px] flex items-center gap-1"
          >
            Adjust Goal
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Progress Bars */}
        <div className="space-y-3 pt-1">
          <div>
            <div className="flex justify-between text-xs mb-1.5 font-medium">
              <span className="text-slate-300">Weekly Sessions</span>
              <span className="text-white tabular-nums font-semibold">
                {healthGoal.currentWeeklyCompleted} of {healthGoal.weeklyTargetSessions} completed
              </span>
            </div>
            <div className="h-2.5 w-full bg-slate-700/70 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${percentComplete}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1.5 font-medium">
              <span className="text-slate-300">Active Cardio & Training Mins</span>
              <span className="text-white tabular-nums font-semibold">
                {healthGoal.currentActiveMinutes} / {healthGoal.targetActiveMinutesPerWeek} mins
              </span>
            </div>
            <div className="h-2.5 w-full bg-slate-700/70 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-400 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${Math.min(
                    100,
                    Math.round(
                      (healthGoal.currentActiveMinutes /
                        healthGoal.targetActiveMinutesPerWeek) *
                        100
                    )
                  )}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1 text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            {workoutsNeeded === 0
              ? 'Outstanding consistency! Your streak is active at ' + healthGoal.streakDays + ' days.'
              : `Completing today's session will advance you to 4/4 and fulfill your weekly goal!`}
          </span>
        </div>
      </section>

      {/* 4. Alternative Workouts: Express Option (Short on time) & Mobility */}
      <section className="space-y-4">
        <div className="flex items-baseline justify-between">
          <div>
            <h3 className="text-lg font-bold tracking-tight text-white">
              Alternative Options Today
            </h3>
            <p className="text-xs text-slate-400">
              Swap if your schedule or energy level changes
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Express Option */}
          <div
            onClick={() => onSelectWorkout(expressWorkout)}
            className="cursor-pointer group rounded-2xl bg-slate-800/70 border border-slate-700/60 p-4 hover:border-slate-500 transition-all space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" />
                  SHORT ON TIME
                </span>
                <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {expressWorkout.title}
                </h4>
              </div>
              <span className="text-xs font-semibold tabular-nums text-slate-300 bg-slate-700/50 px-2 py-1 rounded-md">
                {expressWorkout.durationMinutes}m
              </span>
            </div>

            <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
              {expressWorkout.tagline}
            </p>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-700/50">
              <span>{expressWorkout.equipment}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onStartWorkout(expressWorkout);
                }}
                className="text-emerald-400 font-semibold flex items-center gap-1 hover:underline min-h-[36px]"
              >
                Quick Start
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Active Recovery Option */}
          <div
            onClick={() => onSelectWorkout(recoveryWorkout)}
            className="cursor-pointer group rounded-2xl bg-slate-800/70 border border-slate-700/60 p-4 hover:border-slate-500 transition-all space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-cyan-400 flex items-center gap-1">
                  <RotateCw className="w-3.5 h-3.5" />
                  REST & MOBILITY
                </span>
                <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {recoveryWorkout.title}
                </h4>
              </div>
              <span className="text-xs font-semibold tabular-nums text-slate-300 bg-slate-700/50 px-2 py-1 rounded-md">
                {recoveryWorkout.durationMinutes}m
              </span>
            </div>

            <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
              {recoveryWorkout.tagline}
            </p>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-700/50">
              <span>{recoveryWorkout.equipment}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onStartWorkout(recoveryWorkout);
                }}
                className="text-cyan-400 font-semibold flex items-center gap-1 hover:underline min-h-[36px]"
              >
                Quick Start
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
