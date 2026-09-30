export type GoalType = 'build_muscle' | 'lose_weight' | 'improve_endurance' | 'increase_mobility' | 'stay_active';
export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';
export type MuscleGroup = 'Full Body' | 'Upper Body' | 'Lower Body' | 'Core & Abs' | 'Mobility & Back';
export type EquipmentType = 'No Equipment' | 'Dumbbells' | 'Kettlebell' | 'Resistance Band' | 'Yoga Mat';

export interface ExerciseItem {
  id: string;
  name: string;
  durationSeconds?: number;
  reps?: number;
  sets?: number;
  targetMuscle: string;
  tip: string;
}

export interface Workout {
  id: string;
  title: string;
  tagline: string;
  trainer: string;
  category: 'Strength' | 'HIIT' | 'Conditioning' | 'Recovery' | 'Cardio';
  durationMinutes: number;
  intensity: 'Low' | 'Moderate' | 'High';
  level: FitnessLevel;
  primaryMuscle: MuscleGroup;
  equipment: EquipmentType;
  caloriesEstimate: number;
  imageUrl: string;
  description: string;
  recommendationReason?: string;
  exercises: ExerciseItem[];
}

export interface HealthGoal {
  primaryGoal: GoalType;
  goalTitle: string;
  weeklyTargetSessions: number;
  currentWeeklyCompleted: number;
  targetActiveMinutesPerWeek: number;
  currentActiveMinutes: number;
  targetWeightKg: number;
  currentWeightKg: number;
  startingWeightKg: number;
  streakDays: number;
}

export interface WorkoutLogEntry {
  id: string;
  workoutId: string;
  workoutTitle: string;
  durationMinutes: number;
  caloriesBurned: number;
  completedAt: string;
  feeling: 'Easy' | 'Just Right' | 'Challenging';
}
