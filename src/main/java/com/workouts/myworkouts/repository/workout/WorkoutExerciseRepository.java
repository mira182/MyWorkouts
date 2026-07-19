package com.workouts.myworkouts.repository.workout;

import com.workouts.myworkouts.model.dto.workout.projections.ExerciseRecordRowDto;
import com.workouts.myworkouts.model.dto.workout.projections.WorkoutExerciseDateDto;
import com.workouts.myworkouts.model.entity.workout.WorkoutExercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface WorkoutExerciseRepository extends JpaRepository<WorkoutExercise, Long> {

    @Query("""
            SELECT new com.workouts.myworkouts.model.dto.workout.projections.WorkoutExerciseDateDto(w.date, we) FROM WorkoutExercise we
            JOIN Workout w ON we.workout = w
            WHERE w.date BETWEEN :startDate AND :endDate
            AND we.exercise.name = :exerciseName
            """)
    List<WorkoutExerciseDateDto> findByExerciseBetweenWorkoutDate(String exerciseName, LocalDate startDate, LocalDate endDate);

    @Query("""
            SELECT new com.workouts.myworkouts.model.dto.workout.projections.WorkoutExerciseDateDto(w.date, we) FROM WorkoutExercise we
            JOIN Workout w ON we.workout = w
            WHERE we.exercise.id = :exerciseId
            ORDER BY w.date DESC
            """)
    List<WorkoutExerciseDateDto> findByExerciseIdOrderByWorkoutDateDesc(Long exerciseId);

    @Query("""
            SELECT new com.workouts.myworkouts.model.dto.workout.projections.ExerciseRecordRowDto(
              e.id, e.name, e.category, w.date, ws.weight, ws.reps)
            FROM WorkoutSet ws
            JOIN ws.workoutExercise we
            JOIN we.workout w
            JOIN we.exercise e
            """)
    List<ExerciseRecordRowDto> findAllRecordRows();
}
