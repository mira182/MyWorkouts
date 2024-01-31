package com.workouts.myworkouts.repository.workout;

import com.workouts.myworkouts.model.entity.workout.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {

    @Query("SELECT w from Workout w WHERE w.date BETWEEN :startDate AND :endDate")
    List<Workout> findWorkoutsBetweenDates(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    Optional<Workout> findByDate(LocalDate date);
}
