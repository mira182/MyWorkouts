package com.workouts.myworkouts.model.entity.training;

import com.workouts.myworkouts.model.entity.exercise.Exercise;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "training_exercise")
public class TrainingExercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Exercise exercise;

    @OneToMany(mappedBy = "trainingExercise", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TrainingSet> trainingSets = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "training_plan_id")
    private TrainingPlan trainingPlan;

    private Integer position;

    public void addTrainingSet(TrainingSet trainingSet) {
        trainingSets.add(trainingSet);
        trainingSet.setTrainingExercise(this);
    }
}
