import React, { useState } from 'react';
import { Search, SlidersHorizontal, Play, Sparkles } from 'lucide-react';
import { Workout, MuscleGroup } from '../types/fitness';

interface ExploreTabProps {
  workouts: Workout[];
  onSelectWorkout: (workout: Workout) => void;
  onStartWorkout: (workout: Workout) => void;
}

export const ExploreTab: React.FC<ExploreTabProps> = ({
  workouts,
  onSelectWorkout,
  onStartWorkout,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedMuscle, setSelectedMuscle] = useState<string>('All');

  const categories = ['All', 'Strength', 'HIIT', 'Cardio', 'Recovery'];
  const muscleGroups: string[] = ['All', 'Full Body', 'Upper Body', 'Core & Abs', 'Mobility & Back'];

  const filteredWorkouts = workouts.filter((workout) => {
    const matchesSearch =
      workout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workout.trainer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workout.primaryMuscle.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory =
      selectedCategory === 'All' || workout.category === selectedCategory;

    const matchesMuscle =
      selectedMuscle === 'All' || workout.primaryMuscle === selectedMuscle;

    return matchesSearch && matchesCategory && matchesMuscle;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div>
        <p className="text-xs uppercase tracking-wider font-semibold text-emerald-400">
          Curated Workout Library
        </p>
        <h1 className="text-2xl xs:text-3xl font-extrabold tracking-tight text-white mt-1">
          Explore Workouts
        </h1>
        <p className="text-sm text-slate-300 mt-1">
          Target specific muscle groups, durations, or equipment setups.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title, muscle focus, or trainer..."
          className="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2 py-1"
          >
            Clear
          </button>
        )}
      </div>

      {/* Interactive Category Filter Pills (Functional buttons) */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`min-h-[40px] px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700/80 border border-slate-700/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Muscle group secondary filter */}
        <div className="flex items-center gap-2 text-xs text-slate-400 overflow-x-auto no-scrollbar">
          <span className="shrink-0 font-medium text-slate-400 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Focus:
          </span>
          {muscleGroups.map((muscle) => (
            <button
              key={muscle}
              onClick={() => setSelectedMuscle(muscle)}
              className={`min-h-[36px] px-3 py-1 rounded-lg text-xs whitespace-nowrap transition-colors ${
                selectedMuscle === muscle
                  ? 'text-white bg-slate-700 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {muscle}
            </button>
          ))}
        </div>
      </div>

      {/* Workout Grid / List */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-medium">
            Showing {filteredWorkouts.length} workout{filteredWorkouts.length !== 1 ? 's' : ''}
          </span>
        </div>

        {filteredWorkouts.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 space-y-2">
            <Sparkles className="w-8 h-8 text-slate-500 mx-auto" />
            <p className="text-sm font-semibold text-white">No matching workouts found</p>
            <p className="text-xs text-slate-400">Try adjusting your search terms or filter selections.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedMuscle('All');
                setSearchQuery('');
              }}
              className="mt-2 text-xs text-emerald-400 font-semibold hover:underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          filteredWorkouts.map((workout) => (
            <div
              key={workout.id}
              onClick={() => onSelectWorkout(workout)}
              className="group cursor-pointer rounded-2xl bg-slate-800/80 border border-slate-700/60 overflow-hidden hover:border-slate-500 transition-all shadow-md"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Thumbnail image with subtle zoom on hover */}
                <div className="relative sm:w-48 h-40 sm:h-auto shrink-0 overflow-hidden bg-slate-900">
                  <img
                    src={workout.imageUrl}
                    alt={workout.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-slate-950/80 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-3 text-[11px] font-semibold text-slate-200">
                    {workout.durationMinutes} min
                  </span>
                </div>

                {/* Details */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    {/* Clean unboxed metadata with dot separators */}
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>{workout.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{workout.primaryMuscle}</span>
                      <span aria-hidden="true">·</span>
                      <span>{workout.equipment}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {workout.title}
                    </h3>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {workout.tagline}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
                    <span className="text-xs text-slate-400">
                      Trainer: <strong className="text-slate-300 font-semibold">{workout.trainer}</strong>
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onStartWorkout(workout);
                      }}
                      className="min-h-[40px] px-3.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      Start
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
