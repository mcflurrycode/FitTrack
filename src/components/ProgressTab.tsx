import React, { useState } from 'react';
import { Flame, Target, TrendingDown, Clock, Dumbbell, Plus, Check } from 'lucide-react';
import { HealthGoal, WorkoutLogEntry } from '../types/fitness';
import { WEEKLY_CALENDAR } from '../data/mockData';

interface ProgressTabProps {
  healthGoal: HealthGoal;
  workoutLogs: WorkoutLogEntry[];
  onLogCustomWorkout: (entry: Omit<WorkoutLogEntry, 'id'>) => void;
  onOpenGoalModal: () => void;
}

export const ProgressTab: React.FC<ProgressTabProps> = ({
  healthGoal,
  workoutLogs,
  onLogCustomWorkout,
  onOpenGoalModal,
}) => {
  const [isLoggingCustom, setIsLoggingCustom] = useState(false);
  const [customTitle, setCustomTitle] = useState('Outdoor Run');
  const [customDuration, setCustomDuration] = useState(25);
  const [customCalories, setCustomCalories] = useState(240);
  const [customFeeling, setCustomFeeling] = useState<'Easy' | 'Just Right' | 'Challenging'>('Just Right');

  const totalLost = (healthGoal.startingWeightKg - healthGoal.currentWeightKg).toFixed(1);
  const remainingWeight = (healthGoal.currentWeightKg - healthGoal.targetWeightKg).toFixed(1);

  const handleSaveCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;

    onLogCustomWorkout({
      workoutId: 'custom-log-' + Date.now(),
      workoutTitle: customTitle,
      durationMinutes: Number(customDuration),
      caloriesBurned: Number(customCalories),
      completedAt: 'Just now',
      feeling: customFeeling,
    });

    setIsLoggingCustom(false);
    setCustomTitle('Outdoor Run');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Title & Motivator */}
      <div>
        <p className="text-xs uppercase tracking-wider font-semibold text-emerald-400">
          Weekly Performance & Metrics
        </p>
        <h1 className="text-2xl xs:text-3xl font-extrabold tracking-tight text-white mt-1">
          Activity & Progress
        </h1>
        <p className="text-sm text-slate-300 mt-1">
          Tracking your consistency toward <span className="text-white font-medium">{healthGoal.goalTitle}</span>.
        </p>
      </div>

      {/* 1. Weekly Consistency Calendar */}
      <section className="rounded-2xl p-5 bg-slate-800/80 border border-slate-700/60 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400 fill-amber-400/20" />
            <h2 className="text-base font-bold text-white tracking-tight">
              {healthGoal.streakDays}-Day Active Streak
            </h2>
          </div>
          <span className="text-xs text-emerald-400 font-semibold">
            On Track
          </span>
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1.5 text-center">
          {WEEKLY_CALENDAR.map((item) => (
            <div
              key={item.day}
              className={`p-2 rounded-xl flex flex-col items-center justify-center transition-all ${
                item.isToday
                  ? 'bg-slate-700/90 ring-1 ring-emerald-400'
                  : 'bg-slate-900/50'
              }`}
            >
              <span className="text-[10px] text-slate-400 font-medium">{item.day}</span>
              <span className="text-xs font-bold text-slate-200 mt-0.5 tabular-nums">
                {item.date}
              </span>
              <div className="mt-1.5">
                {item.completed ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                ) : item.isToday ? (
                  <div className="w-5 h-5 rounded-full border border-dashed border-emerald-400/60 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full bg-slate-800/60" />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Key Metrics Grid */}
      <section className="grid grid-cols-2 gap-4">
        {/* Active Minutes */}
        <div className="rounded-2xl p-4 bg-slate-800/80 border border-slate-700/60 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Active Minutes</span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-bold tracking-tight text-white tabular-nums">
            {healthGoal.currentActiveMinutes}{' '}
            <span className="text-xs font-normal text-slate-400">/ {healthGoal.targetActiveMinutesPerWeek}m</span>
          </p>
          <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-400 rounded-full"
              style={{
                width: `${Math.min(
                  100,
                  (healthGoal.currentActiveMinutes /
                    healthGoal.targetActiveMinutesPerWeek) *
                    100
                )}%`,
              }}
            />
          </div>
        </div>

        {/* Sessions Completed */}
        <div className="rounded-2xl p-4 bg-slate-800/80 border border-slate-700/60 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Weekly Workouts</span>
            <Dumbbell className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold tracking-tight text-white tabular-nums">
            {healthGoal.currentWeeklyCompleted}{' '}
            <span className="text-xs font-normal text-slate-400">/ {healthGoal.weeklyTargetSessions}</span>
          </p>
          <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-400 rounded-full"
              style={{
                width: `${Math.min(
                  100,
                  (healthGoal.currentWeeklyCompleted /
                    healthGoal.weeklyTargetSessions) *
                    100
                )}%`,
              }}
            />
          </div>
        </div>
      </section>

      {/* 3. Personal Health Goal Tracker */}
      <section className="rounded-2xl p-5 bg-slate-800/80 border border-slate-700/60 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-base font-bold text-white tracking-tight">
              Weight & Body Composition
            </h3>
            <p className="text-xs text-slate-400">
              Down {totalLost} kg since baseline · {remainingWeight} kg to goal
            </p>
          </div>
          <button
            onClick={onOpenGoalModal}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 min-h-[44px] flex items-center gap-1"
          >
            Edit Goal
          </button>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="space-y-0.5">
            <span className="text-[11px] text-slate-400 font-medium">Starting</span>
            <p className="text-sm font-bold text-slate-300 tabular-nums">
              {healthGoal.startingWeightKg} kg
            </p>
          </div>

          <div className="flex-1 mx-4">
            <div className="flex justify-between text-[11px] text-slate-400 mb-1">
              <span>Progress</span>
              <span className="text-emerald-400 font-semibold tabular-nums">
                Current: {healthGoal.currentWeightKg} kg
              </span>
            </div>
            <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full"
                style={{ width: '65%' }}
              />
            </div>
          </div>

          <div className="space-y-0.5 text-right">
            <span className="text-[11px] text-slate-400 font-medium">Target</span>
            <p className="text-sm font-bold text-emerald-400 tabular-nums">
              {healthGoal.targetWeightKg} kg
            </p>
          </div>
        </div>
      </section>

      {/* 4. Workout Activity History */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold tracking-tight text-white">
            Workout History
          </h3>
          <button
            onClick={() => setIsLoggingCustom(!isLoggingCustom)}
            className="min-h-[40px] px-3 py-1.5 rounded-lg bg-slate-700/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-600/60"
          >
            <Plus className="w-3.5 h-3.5" />
            {isLoggingCustom ? 'Cancel' : 'Log Activity'}
          </button>
        </div>

        {/* Custom manual logger form */}
        {isLoggingCustom && (
          <form
            onSubmit={handleSaveCustom}
            className="rounded-2xl p-4 bg-slate-850 bg-slate-900 border border-emerald-500/40 space-y-3"
          >
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Log Custom Training Session
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Activity Name</label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white"
                  placeholder="e.g. Cycling, Swimming"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Duration (min)</label>
                <input
                  type="number"
                  min="5"
                  max="180"
                  value={customDuration}
                  onChange={(e) => setCustomDuration(Number(e.target.value))}
                  className="w-full h-9 px-3 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Est. Calories (kcal)</label>
                <input
                  type="number"
                  min="10"
                  max="1500"
                  value={customCalories}
                  onChange={(e) => setCustomCalories(Number(e.target.value))}
                  className="w-full h-9 px-3 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400">Felt like:</span>
                {(['Easy', 'Just Right', 'Challenging'] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setCustomFeeling(level)}
                    className={`text-[11px] px-2.5 py-1 rounded-md transition-colors ${
                      customFeeling === level
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                className="min-h-[36px] px-4 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400"
              >
                Save Log
              </button>
            </div>
          </form>
        )}

        {/* History Log List */}
        <div className="space-y-2.5">
          {workoutLogs.map((log) => (
            <div
              key={log.id}
              className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between"
            >
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-white">
                  {log.workoutTitle}
                </h4>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>{log.completedAt}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{log.durationMinutes} min</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{log.caloriesBurned} kcal</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-medium text-emerald-400">
                  {log.feeling}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
