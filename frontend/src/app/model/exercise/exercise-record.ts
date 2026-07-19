export interface ExerciseRecord {
  exerciseId: number;
  exerciseName: string;
  category: string;
  maxWeight: number;
  maxWeightDate?: string;
  maxReps: number;
  estimatedOneRepMax: number;
  lastPerformed?: string;
}
