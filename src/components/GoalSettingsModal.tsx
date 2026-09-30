import React, { useState } from 'react';
import { X, Target, Check } from 'lucide-react';
import { HealthGoal, GoalType } from '../types/fitness';

interface GoalSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGoal: HealthGoal;
  onSaveGoal: (updatedGoal: HealthGoal) => void;
}

export const GoalSettingsModal: React.FC<GoalSettingsModalProps> = ({
  isOpen,
  onClose,
  currentGoal,
  onSaveGoal,
}) => {
  if (!isOpen) return null;

  const [primaryGoal, setPrimaryGoal] = useState<GoalType>(currentGoal.primaryGoal);
  const [weeklySessions, setWeeklySessions] = useState(currentGoal.weeklyTargetSessions);
  const [targetMinutes, setTargetMinutes] = useState(currentGoal.targetActiveMinutesPerWeek);
  const [targetWeight, setTargetWeight] = useState(currentGoal.targetWeightKg);
  const [currentWeight, setCurrentWeight] = useState(currentGoal.currentWeightKg);

  const goalOptions: { type: GoalType; label: string; desc: string }[] = [
    {
      type: 'build_muscle',
      label: 'Build Lean Strength & Core',
      desc: 'Compound resistance training with functional core ignition',
    },
    {
      type: 'lose_weight',
      label: 'Fat Loss & High Output',
      desc: 'Metabolic conditioning and progressive caloric burn',
    },
    {
      type: 'improve_endurance',
      label: 'Cardiovascular Endurance',
      desc: 'Sustained aerobic output and heart rate capacity',
    },
    {
      type: 'increase_mobility',
      label: 'Mobility & Joint Recovery',
      desc: 'Restorative flows, posture reset, and flexibility',
    },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedOption = goalOptions.find((o) => o.type === primaryGoal);

    onSaveGoal({
      ...currentGoal,
      primaryGoal,
      goalTitle: selectedOption?.label || currentGoal.goalTitle,
      weeklyTargetSessions: weeklySessions,
      targetActiveMinutesPerWeek: targetMinutes,
      targetWeightKg: Number(targetWeight),
      currentWeightKg: Number(currentWeight),
    });

    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/80 backdrop-blur-sm p-0 sm:p-4 overflow-y-auto animate-fadeIn"
    >
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 sm:p-7 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              Personal Health Goals
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close goal editor"
            className="min-h-[44px] min-w-[44px] rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          {/* Goal Type Selection */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider font-bold text-slate-400">
              Primary Objective
            </label>
            <div className="space-y-2">
              {goalOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.type}
                  onClick={() => setPrimaryGoal(opt.type)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                    primaryGoal === opt.type
                      ? 'bg-emerald-500/10 border-emerald-400 text-white'
                      : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div className="space-y-0.5">
                    <strong className="text-sm font-semibold text-white block">
                      {opt.label}
                    </strong>
                    <span className="text-xs text-slate-400">{opt.desc}</span>
                  </div>
                  {primaryGoal === opt.type && (
                    <div className="w-5 h-5 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Weekly Workouts Frequency */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider font-bold text-slate-400">
              Weekly Workout Frequency
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[3, 4, 5, 6].map((freq) => (
                <button
                  key={freq}
                  type="button"
                  onClick={() => setWeeklySessions(freq)}
                  className={`min-h-[44px] py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                    weeklySessions === freq
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                  }`}
                >
                  {freq}x / wk
                </button>
              ))}
            </div>
          </div>

          {/* Target Weight & Current Weight */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Current Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(Number(e.target.value))}
                className="w-full h-11 px-3.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Target Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={targetWeight}
                onChange={(e) => setTargetWeight(Number(e.target.value))}
                className="w-full h-11 px-3.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white"
                required
              />
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full min-h-[48px] py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all"
          >
            Apply Health Goal Changes
          </button>
        </form>
      </div>
    </div>
  );
};
