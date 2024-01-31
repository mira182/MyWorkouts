package com.workouts.myworkouts.model.entity.workout;

import com.workouts.myworkouts.model.entity.audit.AuditableTime;
import com.workouts.myworkouts.model.entity.training.TrainingPlan;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "workout")
public class Workout extends AuditableTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    private String note;

    @OneToMany(mappedBy = "workout", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<WorkoutExercise> exercises;

    @OneToOne(mappedBy = "workout")
    private TrainingPlan trainingPlan;
}