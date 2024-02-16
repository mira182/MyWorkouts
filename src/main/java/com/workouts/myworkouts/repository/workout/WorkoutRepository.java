package com.workouts.myworkouts.repository.workout;

import com.workouts.myworkouts.model.entity.workout.Workout;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {

    @Query("SELECT w from Workout w WHERE w.date BETWEEN :startDate AND :endDate ORDER BY w.date ")
    List<Workout> findWorkoutsBetweenDates(LocalDate startDate, LocalDate endDate);

    Optional<Workout> findByDate(LocalDate date);

    long countAllByDateBetween(LocalDate startDate, LocalDate endDate);

    @Query("""
            SELECT COALESCE(SUM(ws.weight * ws.reps), 0) FROM Workout w
            JOIN WorkoutExercise we ON we.workout = w
            JOIN WorkoutSet ws ON ws.workoutExercise = we
            WHERE w.date BETWEEN :startDate AND :endDate
            """)
    BigDecimal sumWorkoutsVolumeBetweenDates(@NonNull LocalDate startDate, @NonNull LocalDate endDate);
}
