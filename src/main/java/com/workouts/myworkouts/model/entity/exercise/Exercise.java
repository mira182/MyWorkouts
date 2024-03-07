package com.workouts.myworkouts.model.entity.exercise;

import com.workouts.myworkouts.model.entity.audit.AuditableTime;
import com.workouts.myworkouts.model.entity.picture.ExercisePicture;
import com.workouts.myworkouts.model.entity.workout.WorkoutExercise;
import com.workouts.myworkouts.model.enums.ExerciseCategory;
import com.workouts.myworkouts.model.enums.ExerciseType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "exercise")
public class Exercise extends AuditableTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ExerciseType type;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ExerciseCategory category;

    @OneToMany(mappedBy = "exercise")
    private List<WorkoutExercise> workoutExercises;

    @OneToMany(mappedBy = "exercise", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ExercisePicture> pictures = new ArrayList<>();

    public void addPicture(ExercisePicture exercisePicture) {
        pictures.add(exercisePicture);
        exercisePicture.setExercise(this);
    }

}
