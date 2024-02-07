type WorkoutSetUnit = 'kg' | 'reps' | 'min' | 'sec';

interface WorkoutSetFormField {
  name: string;
  step: number;
  unit: WorkoutSetUnit;
}

export interface WorkoutSetComponentConfigurationModel {
  formControls: WorkoutSetFormField[];
}
