import React from 'react';
import { Target, Award, Dumbbell, ShieldCheck, Settings, Volume2, Bell, ChevronRight } from 'lucide-react';
import { HealthGoal } from '../types/fitness';
import { sound } from './AudioChime';

interface ProfileTabProps {
  healthGoal: HealthGoal;
  onOpenGoalModal: () => void;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  healthGoal,
  onOpenGoalModal,
  isSoundEnabled,
  onToggleSound,
}) => {
  return (
    <div className="space-y-8 pb-12">
      {/* Profile Header */}
      <section className="flex items-center gap-4 pt-2">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-400 p-0.5">
          <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-xl font-bold text-white">
            AR
          </div>
        </div>
        <div className="space-y-0.5">
          <h1 className="text-xl xs:text-2xl font-extrabold tracking-tight text-white">
            Alex Rivera
          </h1>
          <p className="text-xs text-slate-400">
            FitTrack Athlete · Member since Jan 2026
          </p>
          <div className="flex items-center gap-2 pt-1 text-xs text-emerald-400 font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>{healthGoal.streakDays}-Day Consistency Badge</span>
          </div>
        </div>
      </section>

      {/* Health Goal Roadmap Card */}
      <section className="rounded-2xl p-5 bg-slate-800/80 border border-slate-700/60 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
              Active Strategy
            </span>
            <h2 className="text-base font-bold text-white mt-0.5">
              {healthGoal.goalTitle}
            </h2>
          </div>
          <button
            onClick={onOpenGoalModal}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 min-h-[44px] flex items-center gap-1"
          >
            Modify
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Roadmap guidelines */}
        <div className="space-y-2.5 pt-1 text-xs">
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 text-[11px]">
              1
            </span>
            <div className="space-y-0.5">
              <strong className="text-slate-200 font-semibold block">Weekly Frequency Target</strong>
              <p className="text-slate-400 leading-relaxed">
                Aim for {healthGoal.weeklyTargetSessions} workouts per week to stimulate adaptation without overtraining.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center shrink-0 text-[11px]">
              2
            </span>
            <div className="space-y-0.5">
              <strong className="text-slate-200 font-semibold block">Aerobic & Conditioning Minutes</strong>
              <p className="text-slate-400 leading-relaxed">
                Maintain at least {healthGoal.targetActiveMinutesPerWeek} minutes of elevated heart rate each week.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0 text-[11px]">
              3
            </span>
            <div className="space-y-0.5">
              <strong className="text-slate-200 font-semibold block">Target Bodyweight</strong>
              <p className="text-slate-400 leading-relaxed">
                Progressively targeting {healthGoal.targetWeightKg} kg (currently {healthGoal.currentWeightKg} kg).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fitness Specifications */}
      <section className="space-y-3">
        <h3 className="text-base font-bold text-white">
          Fitness Parameters
        </h3>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <span className="text-slate-400 block mb-1">Fitness Level</span>
            <span className="text-sm font-bold text-white">Intermediate</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <span className="text-slate-400 block mb-1">Default Duration</span>
            <span className="text-sm font-bold text-white">25 - 30 min</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <span className="text-slate-400 block mb-1">Equipment Access</span>
            <span className="text-sm font-bold text-white">Dumbbells & Mat</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <span className="text-slate-400 block mb-1">Focus Balance</span>
            <span className="text-sm font-bold text-emerald-400">Strength & Core</span>
          </div>
        </div>
      </section>

      {/* Preferences & Audio */}
      <section className="space-y-3">
        <h3 className="text-base font-bold text-white">
          Experience & Preferences
        </h3>

        <div className="divide-y divide-slate-700/60 rounded-2xl bg-slate-800/60 border border-slate-700/60 overflow-hidden">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-slate-400" />
              <div>
                <strong className="text-sm font-semibold text-white block">Workout Audio Cues</strong>
                <span className="text-xs text-slate-400">Sound beeps for 3-2-1 intervals</span>
              </div>
            </div>
            <button
              onClick={() => {
                onToggleSound();
                if (!isSoundEnabled) {
                  sound.playBeep(600, 150);
                }
              }}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                isSoundEnabled ? 'bg-emerald-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  isSoundEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-slate-400" />
              <div>
                <strong className="text-sm font-semibold text-white block">Daily Motivation Reminders</strong>
                <span className="text-xs text-slate-400">Notifications at 7:30 AM</span>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-400">Enabled</span>
          </div>
        </div>
      </section>
    </div>
  );
};
