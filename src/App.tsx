/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DeviceFrame } from './components/DeviceFrame';
import { TopNav } from './components/TopNav';
import { BottomTabBar, TabKey } from './components/BottomTabBar';
import { TodayTab } from './components/TodayTab';
import { ExploreTab } from './components/ExploreTab';
import { ProgressTab } from './components/ProgressTab';
import { ProfileTab } from './components/ProfileTab';
import { WorkoutDetailModal } from './components/WorkoutDetailModal';
import { WorkoutPlayerModal } from './components/WorkoutPlayerModal';
import { GoalSettingsModal } from './components/GoalSettingsModal';
import {
  WORKOUT_DATABASE,
  INITIAL_HEALTH_GOAL,
  INITIAL_LOG_HISTORY,
} from './data/mockData';
import { Workout, HealthGoal, WorkoutLogEntry } from './types/fitness';
import { sound } from './components/AudioChime';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('today');
  const [healthGoal, setHealthGoal] = useState<HealthGoal>(INITIAL_HEALTH_GOAL);
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLogEntry[]>(INITIAL_LOG_HISTORY);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [activePlayerWorkout, setActivePlayerWorkout] = useState<Workout | null>(null);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  // Today's primary workout & alternatives
  const heroWorkout = WORKOUT_DATABASE[0];
  const expressWorkout = WORKOUT_DATABASE[1];
  const recoveryWorkout = WORKOUT_DATABASE[3];

  const handleStartWorkout = (workout: Workout) => {
    setSelectedWorkout(null);
    setActivePlayerWorkout(workout);
  };

  const handleFinishWorkout = (newLog: Omit<WorkoutLogEntry, 'id'>) => {
    const entry: WorkoutLogEntry = {
      ...newLog,
      id: 'log-' + Date.now(),
    };

    setWorkoutLogs((prev) => [entry, ...prev]);

    // Update goals & metrics
    setHealthGoal((prev) => ({
      ...prev,
      currentWeeklyCompleted: prev.currentWeeklyCompleted + 1,
      currentActiveMinutes: prev.currentActiveMinutes + entry.durationMinutes,
      streakDays: prev.streakDays + 1,
    }));
  };

  const handleLogCustomWorkout = (entryData: Omit<WorkoutLogEntry, 'id'>) => {
    const entry: WorkoutLogEntry = {
      ...entryData,
      id: 'log-custom-' + Date.now(),
    };
    setWorkoutLogs((prev) => [entry, ...prev]);
    setHealthGoal((prev) => ({
      ...prev,
      currentWeeklyCompleted: prev.currentWeeklyCompleted + 1,
      currentActiveMinutes: prev.currentActiveMinutes + entry.durationMinutes,
    }));
  };

  const handleSaveGoal = (updatedGoal: HealthGoal) => {
    setHealthGoal(updatedGoal);
  };

  const handleToggleSound = () => {
    const nextState = !isSoundEnabled;
    setIsSoundEnabled(nextState);
    sound.enabled = nextState;
  };

  const handleResetData = () => {
    setHealthGoal(INITIAL_HEALTH_GOAL);
    setWorkoutLogs(INITIAL_LOG_HISTORY);
    setActiveTab('today');
    setSelectedWorkout(null);
    setActivePlayerWorkout(null);
  };

  return (
    <DeviceFrame onResetData={handleResetData}>
      {/* Mobile Top Navigation Bar */}
      <TopNav
        healthGoal={healthGoal}
        onOpenGoalModal={() => setIsGoalModalOpen(true)}
      />

      {/* Main Tab Screen View */}
      <main className="flex-1 px-5 pt-4">
        {activeTab === 'today' && (
          <TodayTab
            heroWorkout={heroWorkout}
            expressWorkout={expressWorkout}
            recoveryWorkout={recoveryWorkout}
            healthGoal={healthGoal}
            onSelectWorkout={(w) => setSelectedWorkout(w)}
            onStartWorkout={handleStartWorkout}
            onOpenGoalModal={() => setIsGoalModalOpen(true)}
          />
        )}

        {activeTab === 'workouts' && (
          <ExploreTab
            workouts={WORKOUT_DATABASE}
            onSelectWorkout={(w) => setSelectedWorkout(w)}
            onStartWorkout={handleStartWorkout}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressTab
            healthGoal={healthGoal}
            workoutLogs={workoutLogs}
            onLogCustomWorkout={handleLogCustomWorkout}
            onOpenGoalModal={() => setIsGoalModalOpen(true)}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileTab
            healthGoal={healthGoal}
            onOpenGoalModal={() => setIsGoalModalOpen(true)}
            isSoundEnabled={isSoundEnabled}
            onToggleSound={handleToggleSound}
          />
        )}
      </main>

      {/* Ergonomic Bottom Navigation Bar */}
      <BottomTabBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        streakCount={healthGoal.streakDays}
      />

      {/* Workout Detail Sheet / Modal */}
      <WorkoutDetailModal
        workout={selectedWorkout}
        onClose={() => setSelectedWorkout(null)}
        onStart={handleStartWorkout}
      />

      {/* Interactive Active Workout Player Session */}
      <WorkoutPlayerModal
        workout={activePlayerWorkout}
        onClose={() => setActivePlayerWorkout(null)}
        onFinishWorkout={handleFinishWorkout}
      />

      {/* Health Goal Customization Drawer */}
      <GoalSettingsModal
        isOpen={isGoalModalOpen}
        onClose={() => setIsGoalModalOpen(false)}
        currentGoal={healthGoal}
        onSaveGoal={handleSaveGoal}
      />
    </DeviceFrame>
  );
}
