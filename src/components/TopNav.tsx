import React from 'react';
import { Target, Bell } from 'lucide-react';
import { HealthGoal } from '../types/fitness';

interface TopNavProps {
  healthGoal: HealthGoal;
  onOpenGoalModal: () => void;
  onOpenNotifications?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  healthGoal,
  onOpenGoalModal,
}) => {
  const remainingWorkouts = Math.max(
    0,
    healthGoal.weeklyTargetSessions - healthGoal.currentWeeklyCompleted
  );

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-5 border-b border-slate-700/50 bg-slate-900/90 backdrop-blur-md transition-colors">
      {/* Zone 1: Brand wordmark */}
      <div className="flex items-center gap-2">
        <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          FITTRACK
        </span>
      </div>

      {/* Zone 2: Date context */}
      <div className="hidden sm:flex items-center text-xs text-slate-400 font-medium">
        <span>Today · Week 4</span>
      </div>

      {/* Zone 3: Primary actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenGoalModal}
          className="min-h-[44px] px-3 flex items-center gap-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg border border-slate-700/80 transition-colors"
          title="Personal Health Goal"
        >
          <Target className="w-3.5 h-3.5 text-emerald-400" />
          <span className="tabular-nums">
            {healthGoal.currentWeeklyCompleted}/{healthGoal.weeklyTargetSessions}
          </span>
          <span className="text-slate-400 text-[10px] hidden xs:inline">
            {remainingWorkouts === 0 ? 'Goal met' : 'left'}
          </span>
        </button>

        <button
          onClick={onOpenGoalModal}
          aria-label="Daily notifications"
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-slate-200 rounded-lg transition-colors"
        >
          <Bell className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
