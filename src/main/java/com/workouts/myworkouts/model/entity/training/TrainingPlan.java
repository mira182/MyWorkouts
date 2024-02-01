package com.workouts.myworkouts.model.entity.training;

import com.workouts.myworkouts.model.entity.workout.Workout;
import com.workouts.myworkouts.model.entity.workout.WorkoutExercise;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "training_plan")
@Getter
@Setter
public class TrainingPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "workout_id", referencedColumnName = "id")
    private Workout workout;

    @Enumerated(EnumType.STRING)
    private DayOfWeek trainingDay;

    private LocalTime trainingTime;

    private boolean scheduled;

    private LocalDate startDate;

    private boolean isApplied;
}
