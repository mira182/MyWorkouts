package com.workouts.myworkouts.repository.weight;

import com.workouts.myworkouts.model.entity.weight.TanitaMeasurement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TanitaRepository extends JpaRepository<TanitaMeasurement, Long> {
}
