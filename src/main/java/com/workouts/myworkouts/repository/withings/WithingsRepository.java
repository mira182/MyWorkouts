package com.workouts.myworkouts.repository.withings;

import com.workouts.myworkouts.model.entity.withings.WithingsMeasurement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WithingsRepository extends JpaRepository<WithingsMeasurement, Long> {
}
