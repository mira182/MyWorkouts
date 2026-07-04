package com.workouts.myworkouts.model.entity.training;

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

    @OneToMany(mappedBy = "trainingPlan", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TrainingExercise> trainingExercises = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private DayOfWeek trainingDay;

    private LocalTime trainingTime;

    private boolean scheduled;

    private LocalDate startDate;

    private boolean isApplied;

    public void addTrainingExercise(TrainingExercise trainingExercise) {
        trainingExercises.add(trainingExercise);
        trainingExercise.setTrainingPlan(this);
    }
}
