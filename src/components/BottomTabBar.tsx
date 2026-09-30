import React from 'react';
import { Flame, Compass, LineChart, User } from 'lucide-react';

export type TabKey = 'today' | 'workouts' | 'progress' | 'profile';

interface BottomTabBarProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  streakCount: number;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onTabChange,
  streakCount,
}) => {
  const tabs = [
    {
      key: 'today' as TabKey,
      label: 'Today',
      icon: Flame,
      badge: `${streakCount}d`,
    },
    {
      key: 'workouts' as TabKey,
      label: 'Workouts',
      icon: Compass,
    },
    {
      key: 'progress' as TabKey,
      label: 'Progress',
      icon: LineChart,
    },
    {
      key: 'profile' as TabKey,
      label: 'Profile',
      icon: User,
    },
  ];

  return (
    <nav
      aria-label="Primary mobile navigation"
      className="sticky bottom-0 z-40 w-full border-t border-slate-700/60 bg-slate-900/95 backdrop-blur-md transition-colors"
    >
      <div className="grid grid-cols-4 h-16 max-w-lg mx-auto px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          const Icon = tab.icon;

          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center relative transition-all duration-150 active:scale-95 ${
                isActive
                  ? 'text-emerald-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 font-medium'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-150 ${
                    isActive ? 'scale-110 stroke-[2.4px]' : 'stroke-[1.8px]'
                  }`}
                />
                {tab.badge && (
                  <span className="absolute -top-1.5 -right-3 text-[9px] font-bold px-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] tracking-tight mt-1 truncate">
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-emerald-400" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
