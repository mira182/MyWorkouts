import {WorkoutSet} from "./workoutSet";

export interface PersonalRecords {
  maxWeight: number;
  maxReps: number;
  bestSetVolume: number;
  estimatedOneRepMax: number;
}

export interface ExerciseStats {
  lastSessionDate: string | null;
  lastSessionSets: WorkoutSet[];
  personalRecords: PersonalRecords;
}
