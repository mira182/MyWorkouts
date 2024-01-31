package com.workouts.myworkouts.repository.weight.withings;

import com.workouts.myworkouts.model.entity.weight.TanitaMeasurement;
import com.workouts.myworkouts.model.entity.withings.WithingsMeasurement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.time.LocalDate;
import java.util.List;

public interface WithingsRepository extends JpaRepository<WithingsMeasurement, Long>, QuerydslPredicateExecutor<TanitaMeasurement> {

    List<WithingsMeasurement> findAllByDate(LocalDate date);
}
