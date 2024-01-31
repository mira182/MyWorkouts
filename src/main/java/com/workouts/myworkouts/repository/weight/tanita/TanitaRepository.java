package com.workouts.myworkouts.repository.weight.tanita;

import com.workouts.myworkouts.model.entity.weight.TanitaMeasurement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.time.LocalDateTime;
import java.util.List;

public interface TanitaRepository extends JpaRepository<TanitaMeasurement, Long>, QuerydslPredicateExecutor<TanitaMeasurement> {

    List<TanitaMeasurement> findByDateBetween(LocalDateTime from, LocalDateTime to);
}
