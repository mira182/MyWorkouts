package com.workouts.myworkouts.model.dto.training;

import com.workouts.myworkouts.model.dto.workout.WorkoutDto;
import com.workouts.myworkouts.model.dto.workout.WorkoutExerciseDto;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
public class TrainingPlanDto {

    private Long id;

    private String name;

    private WorkoutDto workout;

    private DayOfWeek trainingDay;

    private LocalTime trainingTime;

    private boolean scheduled;

    private LocalDate startDate;

    private boolean applied;
}
